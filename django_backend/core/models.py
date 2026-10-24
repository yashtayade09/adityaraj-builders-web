from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class CompanyProfile(models.Model):
    """Company details and proprietor credentials."""
    company_name = models.CharField(max_length=200, default='Adityaraj Builders & Developers')
    tagline = models.CharField(max_length=200, default='प्रगत बांधकाम तंत्रज्ञान')
    phone_display = models.CharField(max_length=50, default='+91 724 245 8899')
    phone_link = models.CharField(max_length=50, default='+917242458899')
    whatsapp_number = models.CharField(max_length=50, default='919822012345')
    email = models.EmailField(default='contact@adityarajbuilders.in')
    address = models.TextField(default='Adityaraj House, Near Civil Lines Square, Murtizapur Road, Akola, Maharashtra 444001')
    
    # Proprietor Details
    proprietor_name = models.CharField(max_length=150, default='Er. Rameshwarji Tayade')
    proprietor_role = models.CharField(max_length=150, default='Founder & Proprietor · Civil Engineer')
    proprietor_vision = models.TextField(default="Every building carries a family's trust. I make sure it is built the way I would build my own: strong, honest and on time.")
    proprietor_experience = models.CharField(max_length=100, default='15+ years in civil construction')
    proprietor_focus = models.CharField(max_length=200, default='Structural quality, site discipline, transparent costing')
    proprietor_achievements = models.CharField(max_length=255, default='MahaRERA Registered Developer, Over 12,000 residents housed')
    proprietor_photo = models.ImageField(upload_to='proprietor/', null=True, blank=True)
    proprietor_photo_url = models.TextField(blank=True, default='', help_text='Photo link (used if no file is uploaded)')
    map_label = models.CharField(max_length=150, default='AKOLA · CIVIL LINES HEADQUARTERS')
    
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Company & Proprietor Profile'
        verbose_name_plural = 'Company & Proprietor Profile'

    def __str__(self):
        return self.company_name


class WebsiteContent(models.Model):
    """Dynamic statistics, trust points, comparisons, and why-choose-us USPs."""
    years_experience = models.IntegerField(default=15)
    completed_projects_count = models.IntegerField(default=86)
    active_projects_count = models.IntegerField(default=7)
    happy_customers_count = models.IntegerField(default=250)
    
    # JSON structured or serialized arrays
    trust_points = models.JSONField(default=list, help_text='List of trust highlights')
    problem_solutions = models.JSONField(default=list, help_text='List of [problem, solutionTitle, solutionDesc]')
    usps = models.JSONField(default=list, help_text='List of [title, description, iconPath]')
    specialization_rows = models.JSONField(default=list, help_text='List of [key, value]')

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Website Content (Updated: {self.updated_at.strftime('%Y-%m-%d')})"


class Service(models.Model):
    """Civil engineering and construction services."""
    title = models.CharField(max_length=150)
    description = models.TextField()
    tag = models.CharField(max_length=100, help_text='e.g. Villas · Bungalows · Buildings')
    icon_path = models.TextField(blank=True, default='M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6')
    display_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', 'id']

    def __str__(self):
        return self.title


class Project(models.Model):
    """Completed, Active, and Upcoming real estate developments."""
    CATEGORY_CHOICES = (
        ('Residential', 'Residential'),
        ('Commercial', 'Commercial'),
    )
    STATUS_CHOICES = (
        ('Completed', 'Completed (Handed Over)'),
        ('Active', 'Active (Under Construction)'),
        ('Upcoming', 'Upcoming (Pre-Launch)'),
    )
    STAGE_CHOICES = (
        ('Foundation', 'Foundation'),
        ('Structure', 'Structure'),
        ('Brickwork', 'Brickwork'),
        ('Finishing', 'Finishing'),
        ('Completed', 'Completed'),
    )

    name = models.CharField(max_length=200)
    location = models.CharField(max_length=150, default='Akola')
    project_type = models.CharField(max_length=100, default='Residential Tower')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='Residential')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    description = models.TextField(blank=True)
    cover_photo = models.ImageField(upload_to='projects/', null=True, blank=True)
    cover_image_url = models.TextField(blank=True, default='', help_text='Cover image link (used if no file is uploaded)')
    
    # Completed specific
    completion_year = models.CharField(max_length=20, blank=True, null=True, default='2024')
    
    # Active specific
    progress_percentage = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(100)])
    current_stage = models.CharField(max_length=30, choices=STAGE_CHOICES, default='Foundation')
    expected_completion = models.CharField(max_length=50, blank=True, null=True, default='Mar 2027')
    
    # Upcoming specific
    launch_when = models.CharField(max_length=50, blank=True, null=True, default='Q1 2027')
    
    art_index = models.PositiveIntegerField(default=0)
    display_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return f"{self.name} ({self.status})"


class ProjectImage(models.Model):
    """Multiple gallery photos for a specific project."""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='project_gallery/')
    caption = models.CharField(max_length=200, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class ProjectInterest(models.Model):
    """Upcoming project lead registrations from visitors."""
    STATUS_CHOICES = (
        ('New', 'New'),
        ('Contacted', 'Contacted'),
        ('Closed', 'Closed'),
    )
    project = models.ForeignKey(Project, on_delete=models.SET_NULL, null=True, blank=True, related_name='interests')
    project_name = models.CharField(max_length=200, default='Upcoming Project')
    phone_number = models.CharField(max_length=30)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.project_name} - {self.phone_number}"


class Enquiry(models.Model):
    """Customer enquiries submitted from the contact form."""
    STATUS_CHOICES = (
        ('New', 'New'),
        ('Replied', 'Replied'),
        ('Closed', 'Closed'),
    )

    name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=30)
    email = models.EmailField(blank=True, null=True)
    project_type = models.CharField(max_length=100, default='Residential construction')
    budget_range = models.CharField(max_length=100, default='Not decided yet')
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')
    created_at = models.DateTimeField(auto_now_add=True)
    replied_at = models.DateTimeField(null=True, blank=True)
    reply_notes = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.phone_number}) - {self.status}"


class EnquiryCommunication(models.Model):
    """Audit trail of WhatsApp, phone, or manual replies to customer enquiries."""
    COMM_TYPE_CHOICES = (
        ('whatsapp', 'WhatsApp Click-to-Chat'),
        ('phone', 'Phone Call'),
        ('note', 'Internal Note'),
    )
    enquiry = models.ForeignKey(Enquiry, on_delete=models.CASCADE, related_name='communications')
    comm_type = models.CharField(max_length=20, choices=COMM_TYPE_CHOICES, default='whatsapp')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class CustomerReview(models.Model):
    """Customer reviews with moderation workflow."""
    STATUS_CHOICES = (
        ('Pending', 'Pending Approval'),
        ('Approved', 'Approved (Public)'),
        ('Rejected', 'Rejected'),
        ('Hidden', 'Hidden'),
    )

    name = models.CharField(max_length=150)
    project_type = models.CharField(max_length=150, default='Verified Customer')
    rating = models.PositiveSmallIntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.rating}★ ({self.status})"


class GalleryPhoto(models.Model):
    """Scrolling site and proprietor photo gallery."""
    title = models.CharField(max_length=150)
    image = models.ImageField(upload_to='gallery/', null=True, blank=True)
    image_url = models.TextField(blank=True, default='', help_text='Image link (used if no file is uploaded)')
    art_index = models.PositiveIntegerField(default=0)
    display_order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return self.title
