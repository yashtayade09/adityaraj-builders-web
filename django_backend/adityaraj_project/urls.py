from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve as serve_media

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
]

# Uploaded photos are served from the local "media" folder
# (not needed when Cloudinary is used - it gives its own links).
if not settings.USE_CLOUDINARY:
    urlpatterns += [
        re_path(r'^media/(?P<path>.*)$', serve_media, {'document_root': settings.MEDIA_ROOT}),
    ]
