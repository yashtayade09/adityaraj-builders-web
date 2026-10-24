from django.db import migrations, models
import django.db.models.deletion
import django.core.validators

class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CompanyProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(default='Adityaraj Builders & Developers', max_length=200)),
                ('tagline', models.CharField(default='प्रगत बांधकाम तंत्रज्ञान', max_length=200)),
                ('phone_display', models.CharField(default='+91 724 245 8899', max_length=50)),
                ('phone_link', models.CharField(default='+917242458899', max_length=50)),
                ('whatsapp_number', models.CharField(default='919822012345', max_length=50)),
                ('email', models.EmailField(default='contact@adityarajbuilders.in', max_length=254)),
                ('address', models.TextField(default='Adityaraj House, Near Civil Lines Square, Murtizapur Road, Akola, Maharashtra 444001')),
                ('proprietor_name', models.CharField(default='Er. Rameshwarji Tayade', max_length=150)),
                ('proprietor_role', models.CharField(default='Founder & Proprietor · Civil Engineer', max_length=150)),
                ('proprietor_vision', models.TextField(default="Every building carries a family's trust. I make sure it is built the way I would build my own: strong, honest and on time.")),
                ('proprietor_experience', models.CharField(default='15+ years in civil construction', max_length=100)),
                ('proprietor_focus', models.CharField(default='Structural quality, site discipline, transparent costing', max_length=200)),
                ('proprietor_achievements', models.CharField(default='MahaRERA Registered Developer, Over 12,000 residents housed', max_length=255)),
                ('proprietor_photo', models.ImageField(blank=True, null=True, upload_to='proprietor/')),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Company & Proprietor Profile',
                'verbose_name_plural': 'Company & Proprietor Profile',
            },
        ),
        migrations.CreateModel(
            name='CustomerReview',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('project_type', models.CharField(default='Verified Customer', max_length=150)),
                ('rating', models.PositiveSmallIntegerField(default=5, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(5)])),
                ('message', models.TextField()),
                ('status', models.CharField(choices=[('Pending', 'Pending Approval'), ('Approved', 'Approved (Public)'), ('Rejected', 'Rejected'), ('Hidden', 'Hidden')], default='Pending', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Enquiry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('phone_number', models.CharField(max_length=30)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('project_type', models.CharField(default='Residential construction', max_length=100)),
                ('budget_range', models.CharField(default='Not decided yet', max_length=100)),
                ('message', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('New', 'New'), ('Replied', 'Replied'), ('Closed', 'Closed')], default='New', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('replied_at', models.DateTimeField(blank=True, null=True)),
                ('reply_notes', models.TextField(blank=True, null=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='GalleryPhoto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('image', models.ImageField(blank=True, null=True, upload_to='gallery/')),
                ('art_index', models.PositiveIntegerField(default=0)),
                ('display_order', models.PositiveIntegerField(default=0)),
                ('is_published', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['display_order', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('location', models.CharField(default='Akola', max_length=150)),
                ('project_type', models.CharField(default='Residential Tower', max_length=100)),
                ('category', models.CharField(choices=[('Residential', 'Residential'), ('Commercial', 'Commercial')], default='Residential', max_length=20)),
                ('status', models.CharField(choices=[('Completed', 'Completed (Handed Over)'), ('Active', 'Active (Under Construction)'), ('Upcoming', 'Upcoming (Pre-Launch)')], default='Active', max_length=20)),
                ('description', models.TextField(blank=True)),
                ('cover_photo', models.ImageField(blank=True, null=True, upload_to='projects/')),
                ('completion_year', models.CharField(blank=True, default='2024', max_length=20, null=True)),
                ('progress_percentage', models.PositiveIntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)])),
                ('current_stage', models.CharField(choices=[('Foundation', 'Foundation'), ('Structure', 'Structure'), ('Brickwork', 'Brickwork'), ('Finishing', 'Finishing'), ('Completed', 'Completed')], default='Foundation', max_length=30)),
                ('expected_completion', models.CharField(blank=True, default='Mar 2027', max_length=50, null=True)),
                ('launch_when', models.CharField(blank=True, default='Q1 2027', max_length=50, null=True)),
                ('art_index', models.PositiveIntegerField(default=0)),
                ('display_order', models.PositiveIntegerField(default=0)),
                ('is_published', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['display_order', '-created_at'],
            },
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('tag', models.CharField(help_text='e.g. Villas · Bungalows · Buildings', max_length=100)),
                ('icon_path', models.TextField(blank=True, default='M3 11l9-7 9 7 M5 10v10h14V10 M10 20v-6h4v6')),
                ('display_order', models.PositiveIntegerField(default=0)),
                ('is_published', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['display_order', 'id'],
            },
        ),
        migrations.CreateModel(
            name='WebsiteContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('years_experience', models.IntegerField(default=15)),
                ('completed_projects_count', models.IntegerField(default=86)),
                ('active_projects_count', models.IntegerField(default=7)),
                ('happy_customers_count', models.IntegerField(default=250)),
                ('trust_points', models.JSONField(default=list, help_text='List of trust highlights')),
                ('problem_solutions', models.JSONField(default=list, help_text='List of [problem, solutionTitle, solutionDesc]')),
                ('usps', models.JSONField(default=list, help_text='List of [title, description, iconPath]')),
                ('specialization_rows', models.JSONField(default=list, help_text='List of [key, value]')),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='EnquiryCommunication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comm_type', models.CharField(choices=[('whatsapp', 'WhatsApp Click-to-Chat'), ('phone', 'Phone Call'), ('note', 'Internal Note')], default='whatsapp', max_length=20)),
                ('message', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('enquiry', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='communications', to='core.enquiry')),
            ],
        ),
        migrations.CreateModel(
            name='ProjectInterest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(default='Upcoming Project', max_length=200)),
                ('phone_number', models.CharField(max_length=30)),
                ('status', models.CharField(choices=[('New', 'New'), ('Contacted', 'Contacted'), ('Closed', 'Closed')], default='New', max_length=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('project', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='interests', to='core.project')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='ProjectImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='project_gallery/')),
                ('caption', models.CharField(blank=True, max_length=200)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='core.project')),
            ],
        ),
    ]
