import random
import base64
import binascii
import html
import io
import json
import uuid
import re
from functools import wraps
from pathlib import Path

from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.contrib.auth import authenticate, login, logout
from django.http import FileResponse, Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.middleware.csrf import get_token
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods

from . import serializers as ser
from .models import (
    CustomerReview, Enquiry, EnquiryCommunication, GalleryPhoto,
    Project, ProjectInterest, Service,
)

PAGES_DIR = Path(__file__).resolve().parent / 'owner_pages'
PHONE_RE = re.compile(r'^[+\d][\d\s-]{7,}$')

# Added to the owner dashboard page so every save/delete button sends the
# CSRF token that Django requires (the dashboard JS itself stays unchanged).
CSRF_FETCH_PATCH = """<script>
(function () {
  var realFetch = window.fetch;
  window.fetch = function (url, opts) {
    opts = opts || {};
    var method = (opts.method || 'GET').toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') {
      var m = document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);
      opts.headers = Object.assign({}, opts.headers, { 'X-CSRFToken': m ? decodeURIComponent(m[1]) : '' });
    }
    opts.credentials = 'same-origin';
    return realFetch.call(this, url, opts);
  };
})();
</script>"""


def _read_page(name):
    return (PAGES_DIR / name).read_text(encoding='utf-8')


def _json_body(request):
    try:
        data = json.loads(request.body.decode('utf-8') or '{}')
        return data if isinstance(data, dict) else {}
    except (ValueError, UnicodeDecodeError):
        return request.POST.dict()


def _is_owner(user):
    return user.is_authenticated and user.is_staff


def owner_api(view):
    """Owner-only JSON endpoint: returns 401 JSON (not a login redirect)."""
    @wraps(view)
    def wrapper(request, *args, **kwargs):
        if not _is_owner(request.user):
            return JsonResponse({'error': 'Unauthorized. Please login.'}, status=401)
        return view(request, *args, **kwargs)
    return wrapper


# ==========================================================================
# 1. FRONTEND (the built React website)
# ==========================================================================

def home_view(request, path=''):
    index = Path(settings.FRONTEND_DIST) / 'index.html'
    if index.exists():
        return FileResponse(open(index, 'rb'), content_type='text/html')
    return HttpResponse(
        '<h2 style="font-family:sans-serif">Website files not found.</h2>'
        '<p style="font-family:sans-serif">Run <code>npm install --legacy-peer-deps</code> and '
        '<code>npm run build</code> in the main project folder, then refresh. '
        'Owner login: <a href="/owner/login/">/owner/login/</a></p>',
        status=503,
    )


# ==========================================================================
# 2. OWNER LOGIN / DASHBOARD
# ==========================================================================

@ensure_csrf_cookie
def owner_login_view(request):
    if _is_owner(request.user):
        return HttpResponseRedirect('/owner/dashboard/')

    error = ''
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '')
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_staff:
            login(request, user)
            return HttpResponseRedirect('/owner/dashboard/')
        error = 'Incorrect username or password. Please try again.'

    page = _read_page('login.html')
    if error:
        page = page.replace('__ERROR_MESSAGE__', html.escape(error))
    else:
        page = re.sub(r'\s*<div class="err">__ERROR_MESSAGE__</div>', '', page)
    csrf = '<input type="hidden" name="csrfmiddlewaretoken" value="%s">' % get_token(request)
    page = page.replace('<!--CSRF_FIELD-->', csrf)
    return HttpResponse(page)


@ensure_csrf_cookie
def owner_dashboard_view(request):
    if not _is_owner(request.user):
        return HttpResponseRedirect('/owner/login/')
    page = _read_page('dashboard.html')
    page = page.replace('<head>', '<head>' + CSRF_FETCH_PATCH, 1)
    return HttpResponse(page)


def owner_logout_view(request):
    logout(request)
    return HttpResponseRedirect('/owner/login/')


# ==========================================================================
# 3. PUBLIC API (used by the website)
# ==========================================================================

def public_data_api(request):
    projects = Project.objects.filter(is_published=True)
    data = {
        'company': ser.company_to_json(ser.get_company()),
        'content': ser.content_to_json(ser.get_content()),
        'services': [ser.service_to_json(s) for s in Service.objects.filter(is_published=True)],
        'projects': {
            'done': [ser.project_to_json(p) for p in projects.filter(status='Completed')],
            'active': [ser.project_to_json(p) for p in projects.filter(status='Active')],
            'soon': [ser.project_to_json(p) for p in projects.filter(status='Upcoming')],
        },
        'reviews': [ser.review_to_json(r) for r in CustomerReview.objects.filter(status='Approved')],
        'gallery': [ser.gallery_to_json(g) for g in GalleryPhoto.objects.filter(is_published=True)],
    }
    return JsonResponse(data)


@csrf_exempt
@require_http_methods(['POST'])
def submit_enquiry_api(request):
    d = _json_body(request)
    name = str(d.get('name', '')).strip()
    phone = str(d.get('phone', '')).strip()
    if len(name) < 2:
        return JsonResponse({'error': 'Please enter your full name.'}, status=400)
    if not PHONE_RE.match(phone):
        return JsonResponse({'error': 'Please enter a valid phone number.'}, status=400)
    email = str(d.get('email', '')).strip()
    enq = Enquiry.objects.create(
        name=name[:150], phone_number=phone[:30],
        email=email[:254] or None,
        project_type=(str(d.get('projectType', '')).strip() or 'Residential construction')[:100],
        budget_range=(str(d.get('budget', '')).strip() or 'Not decided yet')[:100],
        message=str(d.get('message', '')).strip(), status='New',
    )
    return JsonResponse({'success': True, 'id': str(enq.pk)})


@csrf_exempt
@require_http_methods(['POST'])
def submit_review_api(request):
    d = _json_body(request)
    name = str(d.get('name', '')).strip()
    message = str(d.get('message', '')).strip()
    if len(name) < 2:
        return JsonResponse({'error': 'Please enter your name.'}, status=400)
    if len(message) < 5:
        return JsonResponse({'error': 'Please write a short review.'}, status=400)
    rating = ser._int(d.get('rating'), 5, 1, 5)
    review = CustomerReview.objects.create(
        name=name[:150], project_type='Verified Customer',
        rating=rating, message=message, status='Pending',
    )
    return JsonResponse({'success': True, 'id': str(review.pk)})


@csrf_exempt
@require_http_methods(['POST'])
def register_interest_api(request):
    d = _json_body(request)
    phone = str(d.get('phone', '')).strip()
    if not PHONE_RE.match(phone):
        return JsonResponse({'error': 'Please enter a valid phone number.'}, status=400)
    project_name = (str(d.get('projectName', '')).strip() or 'Upcoming Project')[:200]
    if ProjectInterest.objects.filter(phone_number=phone, project_name=project_name).exists():
        return JsonResponse({'success': True, 'message': 'Already registered'})
    project = None
    pid = str(d.get('projectId', '')).strip()
    if pid.isdigit():
        project = Project.objects.filter(pk=int(pid)).first()
    reg = ProjectInterest.objects.create(
        project=project, project_name=project_name, phone_number=phone[:30], status='New')
    return JsonResponse({'success': True, 'id': str(reg.pk)})


# ==========================================================================
# 4. OWNER API (used by the dashboard)
# ==========================================================================

def _get_or_404(model, pk):
    if not str(pk).isdigit():
        raise Http404
    try:
        return model.objects.get(pk=int(pk))
    except model.DoesNotExist:
        raise Http404


def _not_found(label):
    return JsonResponse({'error': '%s not found' % label}, status=404)


@owner_api
def owner_data_api(request):
    return JsonResponse({
        'company': ser.company_to_json(ser.get_company()),
        'content': ser.content_to_json(ser.get_content()),
        'services': [ser.service_to_json(s) for s in Service.objects.all()],
        'projects': [ser.project_to_json(p) for p in Project.objects.all()],
        'enquiries': [ser.enquiry_to_json(e) for e in Enquiry.objects.all()],
        'registrations': [ser.registration_to_json(r) for r in ProjectInterest.objects.all()],
        'reviews': [ser.review_to_json(r) for r in CustomerReview.objects.all()],
        'gallery': [ser.gallery_to_json(g) for g in GalleryPhoto.objects.all()],
    })


@owner_api
@require_http_methods(['PATCH'])
def owner_enquiry_api(request, pk):
    try:
        enq = _get_or_404(Enquiry, pk)
    except Http404:
        return _not_found('Enquiry')
    d = _json_body(request)
    if d.get('status') in dict(Enquiry.STATUS_CHOICES):
        enq.status = d['status']
    if d.get('replyNotes'):
        enq.reply_notes = str(d['replyNotes'])
    enq.save()
    return JsonResponse({'success': True, 'enquiry': ser.enquiry_to_json(enq)})


@owner_api
@require_http_methods(['POST'])
def owner_enquiry_reply_api(request, pk):
    try:
        enq = _get_or_404(Enquiry, pk)
    except Http404:
        return _not_found('Enquiry')
    d = _json_body(request)
    message = str(d.get('message', ''))
    EnquiryCommunication.objects.create(enquiry=enq, comm_type='whatsapp', message=message)
    enq.status = 'Replied'
    enq.replied_at = timezone.now()
    enq.reply_notes = str(d.get('notes') or 'Replied via WhatsApp Click-to-Chat')
    enq.save()
    return JsonResponse({'success': True, 'enquiry': ser.enquiry_to_json(enq)})


@owner_api
@require_http_methods(['POST'])
def owner_projects_api(request):
    d = _json_body(request)
    p = Project(name='New Project', status='Active')
    p.art_index = random.randint(0, 3)
    p.display_order = Project.objects.count() + 1
    ser.apply_project(p, d)
    return JsonResponse({'success': True, 'project': ser.project_to_json(p)})


@owner_api
@require_http_methods(['PUT', 'PATCH', 'DELETE'])
def owner_project_api(request, pk):
    try:
        p = _get_or_404(Project, pk)
    except Http404:
        return _not_found('Project')
    if request.method == 'DELETE':
        p.delete()
        return JsonResponse({'success': True})
    ser.apply_project(p, _json_body(request))
    return JsonResponse({'success': True, 'project': ser.project_to_json(p)})


@owner_api
@require_http_methods(['PATCH'])
def owner_registration_api(request, pk):
    try:
        r = _get_or_404(ProjectInterest, pk)
    except Http404:
        return _not_found('Registration')
    d = _json_body(request)
    if d.get('status') in dict(ProjectInterest.STATUS_CHOICES):
        r.status = d['status']
        r.save()
    return JsonResponse({'success': True, 'registration': ser.registration_to_json(r)})


@owner_api
@require_http_methods(['PATCH', 'DELETE'])
def owner_review_api(request, pk):
    try:
        r = _get_or_404(CustomerReview, pk)
    except Http404:
        return _not_found('Review')
    if request.method == 'DELETE':
        r.delete()
        return JsonResponse({'success': True})
    d = _json_body(request)
    if d.get('status') in dict(CustomerReview.STATUS_CHOICES):
        r.status = d['status']
        r.save()
    return JsonResponse({'success': True, 'review': ser.review_to_json(r)})


@owner_api
@require_http_methods(['POST'])
def owner_gallery_api(request):
    d = _json_body(request)
    g = GalleryPhoto.objects.create(
        title=(str(d.get('title', '')).strip() or 'Site photo')[:150],
        image_url=str(d.get('image') or ''),
        art_index=random.randint(0, 3),
        display_order=GalleryPhoto.objects.count() + 1,
    )
    return JsonResponse({'success': True, 'item': ser.gallery_to_json(g)})


@owner_api
@require_http_methods(['DELETE'])
def owner_gallery_item_api(request, pk):
    try:
        _get_or_404(GalleryPhoto, pk).delete()
    except Http404:
        return _not_found('Photo')
    return JsonResponse({'success': True})


@owner_api
@require_http_methods(['POST'])
def owner_services_api(request):
    s = Service(title='New Service', description='', display_order=Service.objects.count() + 1)
    ser.apply_service(s, _json_body(request))
    return JsonResponse({'success': True, 'service': ser.service_to_json(s)})


@owner_api
@require_http_methods(['PUT', 'PATCH', 'DELETE'])
def owner_service_api(request, pk):
    try:
        s = _get_or_404(Service, pk)
    except Http404:
        return _not_found('Service')
    if request.method == 'DELETE':
        s.delete()
        return JsonResponse({'success': True})
    ser.apply_service(s, _json_body(request))
    return JsonResponse({'success': True, 'service': ser.service_to_json(s)})


@owner_api
@require_http_methods(['PUT', 'PATCH'])
def owner_company_api(request):
    c = ser.apply_company(ser.get_company(), _json_body(request))
    return JsonResponse({'success': True, 'company': ser.company_to_json(c)})


MAX_UPLOAD_BYTES = 8 * 1024 * 1024
ALLOWED_IMAGE_TYPES = {'PNG': 'png', 'JPEG': 'jpg', 'WEBP': 'webp', 'GIF': 'gif'}


@owner_api
@require_http_methods(['POST'])
def owner_upload_api(request):
    """Receives a photo from the dashboard (as a data URL) and stores it."""
    d = _json_body(request)
    data = str(d.get('data', ''))
    if not data.startswith('data:image/') or ',' not in data:
        return JsonResponse({'error': 'Please choose a PNG, JPG, WEBP or GIF image.'}, status=400)
    try:
        raw = base64.b64decode(data.split(',', 1)[1], validate=False)
    except (binascii.Error, ValueError):
        return JsonResponse({'error': 'The image could not be read.'}, status=400)
    if len(raw) > MAX_UPLOAD_BYTES:
        return JsonResponse({'error': 'Image is too big (max 8 MB).'}, status=400)
    try:
        from PIL import Image
        img = Image.open(io.BytesIO(raw))
        img.verify()
        ext = ALLOWED_IMAGE_TYPES.get(img.format)
    except Exception:
        ext = None
    if not ext:
        return JsonResponse({'error': 'This file is not a valid PNG, JPG, WEBP or GIF image.'}, status=400)
    name = default_storage.save('uploads/%s.%s' % (uuid.uuid4().hex[:16], ext), ContentFile(raw))
    return JsonResponse({'success': True, 'url': default_storage.url(name)})
