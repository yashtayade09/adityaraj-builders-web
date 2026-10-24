"""Loads the website's starting content (services, projects, gallery, text)."""
import json
from pathlib import Path

from .models import (
    CompanyProfile, CustomerReview, GalleryPhoto, Project, Service, WebsiteContent,
)

FIXTURE = Path(__file__).resolve().parent / 'fixtures' / 'initial_site_data.json'


def load_initial_data():
    """Idempotent: only fills tables that are still empty. Returns a summary."""
    data = json.loads(FIXTURE.read_text(encoding='utf-8'))
    done = []

    if not CompanyProfile.objects.exists():
        c = data['company']
        CompanyProfile.objects.create(
            company_name=c['companyName'], tagline=c['tagline'],
            phone_display=c['phoneDisplay'], phone_link=c['phoneLink'],
            whatsapp_number=c['whatsapp'], email=c['email'], address=c['address'],
            map_label=c.get('mapLabel', ''), proprietor_name=c['proprietorName'],
            proprietor_role=c['proprietorRole'], proprietor_vision=c['proprietorVision'],
            proprietor_experience=c['proprietorExp'], proprietor_focus=c['proprietorFocus'],
            proprietor_achievements=c['proprietorAchieve'],
            proprietor_photo_url=c.get('proprietorPhoto', ''),
        )
        done.append('company')

    if not WebsiteContent.objects.exists():
        k = data['content']
        stats = {s['l']: s['v'] for s in k['stats']}
        WebsiteContent.objects.create(
            years_experience=stats.get('Years of experience', 15),
            completed_projects_count=stats.get('Completed projects', 86),
            active_projects_count=stats.get('Active projects', 7),
            happy_customers_count=stats.get('Happy customers', 250),
            trust_points=k['trust'], problem_solutions=k['pairs'],
            usps=k['usps'], specialization_rows=k['spec'],
        )
        done.append('content')

    if not Service.objects.exists():
        for s in data['services']:
            Service.objects.create(
                title=s['title'], description=s['description'], tag=s['tag'],
                icon_path=s['icon'], display_order=s['order'], is_published=s['published'])
        done.append('services')

    if not Project.objects.exists():
        for p in data['projects']:
            Project.objects.create(
                name=p['name'], location=p['location'], project_type=p['type'],
                category=p['category'], status=p['status'],
                completion_year=p.get('year', ''), progress_percentage=p.get('progress', 0),
                expected_completion=p.get('due', ''), current_stage=p.get('stage', 'Foundation'),
                launch_when=p.get('launchWhen', ''), description=p['description'],
                cover_image_url=p.get('coverImage', ''), art_index=p['artIndex'],
                display_order=p['order'], is_published=p['published'])
        done.append('projects')

    if not GalleryPhoto.objects.exists():
        for g in data['gallery']:
            GalleryPhoto.objects.create(
                title=g['title'], image_url=g.get('image', ''), art_index=g['artIndex'],
                display_order=g['order'], is_published=g['published'])
        done.append('gallery')

    if not CustomerReview.objects.exists():
        for r in data['reviews']:
            CustomerReview.objects.create(
                name=r['name'], project_type=r['projectType'], rating=r['rating'],
                message=r['message'], status=r['status'])
        done.append('reviews')

    return done
