from django.contrib import admin
from .models import (
    CompanyProfile, WebsiteContent, Service, Project,
    ProjectInterest, CustomerReview, GalleryPhoto, Enquiry, EnquiryCommunication
)

@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'project_type', 'budget_range', 'status', 'created_at')
    list_filter = ('status', 'project_type', 'created_at')
    search_fields = ('name', 'phone_number', 'email', 'message')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'location', 'category', 'status', 'progress_percentage', 'is_published')
    list_filter = ('status', 'category', 'is_published')
    search_fields = ('name', 'location', 'description')

@admin.register(CustomerReview)
class CustomerReviewAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'status', 'created_at')
    list_filter = ('status', 'rating')
    search_fields = ('name', 'message')

admin.site.register(CompanyProfile)
admin.site.register(WebsiteContent)
admin.site.register(Service)
admin.site.register(ProjectInterest)
admin.site.register(GalleryPhoto)
admin.site.register(EnquiryCommunication)
