"""
Converts Django model rows <-> the JSON shape used by the website and the
owner dashboard (camelCase, string ids). Keeping this in one file means the
frontend never needs to know about Django field names.
"""
from .models import (
    CompanyProfile, WebsiteContent, Service, Project,
    ProjectInterest, CustomerReview, GalleryPhoto, Enquiry,
)


def _iso(dt):
    return dt.isoformat() if dt else None


def _file_url(f):
    try:
        return f.url if f else ''
    except Exception:
        return ''


# ----------------------------- company / content -----------------------------

def get_company():
    company = CompanyProfile.objects.first()
    if company is None:
        company = CompanyProfile.objects.create()
    return company


def get_content():
    content = WebsiteContent.objects.first()
    if content is None:
        content = WebsiteContent.objects.create()
    return content


def company_to_json(c):
    return {
        'companyName': c.company_name,
        'tagline': c.tagline,
        'phoneDisplay': c.phone_display,
        'phoneLink': c.phone_link,
        'whatsapp': c.whatsapp_number,
        'email': c.email,
        'address': c.address,
        'mapLabel': c.map_label,
        'proprietorName': c.proprietor_name,
        'proprietorRole': c.proprietor_role,
        'proprietorVision': c.proprietor_vision,
        'proprietorExp': c.proprietor_experience,
        'proprietorFocus': c.proprietor_focus,
        'proprietorAchieve': c.proprietor_achievements,
        'proprietorPhoto': _file_url(c.proprietor_photo) or c.proprietor_photo_url,
    }


COMPANY_FIELDS = {
    'companyName': 'company_name', 'tagline': 'tagline',
    'phoneDisplay': 'phone_display', 'phoneLink': 'phone_link',
    'whatsapp': 'whatsapp_number', 'email': 'email', 'address': 'address',
    'mapLabel': 'map_label',
    'proprietorName': 'proprietor_name', 'proprietorRole': 'proprietor_role',
    'proprietorVision': 'proprietor_vision', 'proprietorExp': 'proprietor_experience',
    'proprietorFocus': 'proprietor_focus', 'proprietorAchieve': 'proprietor_achievements',
    'proprietorPhoto': 'proprietor_photo_url',
}


def apply_company(c, data):
    for key, field in COMPANY_FIELDS.items():
        if key in data and data[key] is not None:
            setattr(c, field, str(data[key]))
    c.save()
    return c


def content_to_json(w):
    return {
        'stats': [
            {'v': w.years_experience, 's': '+', 'l': 'Years of experience'},
            {'v': w.completed_projects_count, 's': '+', 'l': 'Completed projects'},
            {'v': w.active_projects_count, 's': '', 'l': 'Active projects'},
            {'v': w.happy_customers_count, 's': '+', 'l': 'Happy customers'},
        ],
        'trust': w.trust_points,
        'pairs': w.problem_solutions,
        'usps': w.usps,
        'spec': w.specialization_rows,
    }


# --------------------------------- services ----------------------------------

def service_to_json(s):
    return {
        'id': str(s.pk), 'title': s.title, 'description': s.description,
        'tag': s.tag, 'icon': s.icon_path, 'order': s.display_order,
        'published': s.is_published,
    }


def apply_service(s, data):
    if 'title' in data: s.title = str(data['title'])[:150]
    if 'description' in data: s.description = str(data['description'])
    if 'tag' in data: s.tag = str(data['tag'])[:100]
    if data.get('icon'): s.icon_path = str(data['icon'])
    if 'order' in data:
        try: s.display_order = max(0, int(data['order']))
        except (TypeError, ValueError): pass
    if 'published' in data: s.is_published = bool(data['published'])
    s.save()
    return s


# --------------------------------- projects ----------------------------------

def project_to_json(p):
    return {
        'id': str(p.pk), 'name': p.name, 'location': p.location,
        'type': p.project_type, 'category': p.category, 'status': p.status,
        'year': p.completion_year or '', 'progress': p.progress_percentage,
        'due': p.expected_completion or '', 'stage': p.current_stage,
        'launchWhen': p.launch_when or '', 'description': p.description,
        'coverImage': _file_url(p.cover_photo) or p.cover_image_url,
        'artIndex': p.art_index, 'order': p.display_order,
        'published': p.is_published,
    }


def _int(value, default=0, lo=None, hi=None):
    try:
        n = int(float(value))
    except (TypeError, ValueError):
        n = default
    if lo is not None: n = max(lo, n)
    if hi is not None: n = min(hi, n)
    return n


def apply_project(p, data):
    if 'name' in data: p.name = str(data['name'])[:200] or 'New Project'
    if 'location' in data: p.location = str(data['location'])[:150]
    if 'type' in data: p.project_type = str(data['type'])[:100]
    if data.get('category') in ('Residential', 'Commercial'): p.category = data['category']
    if data.get('status') in ('Completed', 'Active', 'Upcoming'): p.status = data['status']
    if 'year' in data: p.completion_year = str(data['year'])[:20]
    if 'progress' in data: p.progress_percentage = _int(data['progress'], 0, 0, 100)
    if 'due' in data: p.expected_completion = str(data['due'])[:50]
    if data.get('stage') in dict(Project.STAGE_CHOICES): p.current_stage = data['stage']
    if 'launchWhen' in data: p.launch_when = str(data['launchWhen'])[:50]
    if 'description' in data: p.description = str(data['description'])
    if 'coverImage' in data: p.cover_image_url = str(data['coverImage'] or '')
    if 'artIndex' in data: p.art_index = _int(data['artIndex'], 0, 0, 3)
    if 'order' in data: p.display_order = _int(data['order'], 0, 0)
    if 'published' in data: p.is_published = bool(data['published'])
    p.save()
    return p


# ---------------------------------- gallery ----------------------------------

def gallery_to_json(g):
    return {
        'id': str(g.pk), 'title': g.title,
        'image': _file_url(g.image) or g.image_url,
        'artIndex': g.art_index, 'order': g.display_order,
        'published': g.is_published,
    }


# -------------------------------- enquiries etc ------------------------------

def enquiry_to_json(e):
    last = e.communications.order_by('-created_at').first()
    return {
        'id': str(e.pk), 'name': e.name, 'phone': e.phone_number,
        'email': e.email or '', 'projectType': e.project_type,
        'budget': e.budget_range, 'message': e.message or '',
        'createdAt': _iso(e.created_at), 'status': e.status,
        'replyNotes': e.reply_notes or '', 'repliedAt': _iso(e.replied_at),
        'lastReplyMessage': last.message if last else '',
    }


def registration_to_json(r):
    return {
        'id': str(r.pk), 'projectId': str(r.project_id or ''),
        'projectName': r.project_name, 'phone': r.phone_number,
        'createdAt': _iso(r.created_at), 'status': r.status,
    }


def review_to_json(r):
    return {
        'id': str(r.pk), 'name': r.name, 'projectType': r.project_type,
        'rating': r.rating, 'message': r.message,
        'createdAt': _iso(r.created_at), 'status': r.status,
    }
