from django.urls import path, re_path
from . import views

# Every API path works with OR without a trailing slash (the website calls
# them without one; the old version only allowed the slash and crashed).
urlpatterns = [
    # Owner login / dashboard
    re_path(r'^owner/login/?$', views.owner_login_view, name='owner_login'),
    re_path(r'^owner/dashboard/?$', views.owner_dashboard_view, name='owner_dashboard'),
    re_path(r'^owner/logout/?$', views.owner_logout_view, name='owner_logout'),

    # Public API
    re_path(r'^api/public/data/?$', views.public_data_api, name='public_data_api'),
    re_path(r'^api/enquiries/?$', views.submit_enquiry_api, name='submit_enquiry_api'),
    re_path(r'^api/reviews/?$', views.submit_review_api, name='submit_review_api'),
    re_path(r'^api/registrations/?$', views.register_interest_api, name='register_interest_api'),

    # Owner API
    re_path(r'^api/owner/data/?$', views.owner_data_api),
    re_path(r'^api/owner/enquiries/(?P<pk>[^/]+)/reply/?$', views.owner_enquiry_reply_api),
    re_path(r'^api/owner/enquiries/(?P<pk>[^/]+)/?$', views.owner_enquiry_api),
    re_path(r'^api/owner/projects/?$', views.owner_projects_api),
    re_path(r'^api/owner/projects/(?P<pk>[^/]+)/?$', views.owner_project_api),
    re_path(r'^api/owner/registrations/(?P<pk>[^/]+)/?$', views.owner_registration_api),
    re_path(r'^api/owner/reviews/(?P<pk>[^/]+)/?$', views.owner_review_api),
    re_path(r'^api/owner/gallery/?$', views.owner_gallery_api),
    re_path(r'^api/owner/gallery/(?P<pk>[^/]+)/?$', views.owner_gallery_item_api),
    re_path(r'^api/owner/services/?$', views.owner_services_api),
    re_path(r'^api/owner/services/(?P<pk>[^/]+)/?$', views.owner_service_api),
    re_path(r'^api/owner/company/?$', views.owner_company_api),
    re_path(r'^api/owner/upload/?$', views.owner_upload_api),

    # Website home
    path('', views.home_view, name='home'),
]
