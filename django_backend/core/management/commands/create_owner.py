import os

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand

from core.seed import load_initial_data


class Command(BaseCommand):
    help = 'Creates the owner login (if missing) and loads the starting website content.'

    def handle(self, *args, **options):
        username = os.getenv('INITIAL_OWNER_USERNAME', 'adityaraj_owner')
        email = os.getenv('INITIAL_OWNER_EMAIL', 'contact@adityarajbuilders.in')
        password = os.getenv('INITIAL_OWNER_PASSWORD', 'Adityaraj@2026')

        user = User.objects.filter(username=username).first()
        if user is None:
            User.objects.create_superuser(
                username=username, email=email, password=password,
                first_name='Owner', last_name='Adityaraj')
            self.stdout.write(self.style.SUCCESS("Created owner account: '%s'" % username))
        else:
            if not user.is_staff:
                user.is_staff = True
                user.save()
            self.stdout.write(self.style.WARNING("Owner '%s' already exists (password unchanged)." % username))

        loaded = load_initial_data()
        if loaded:
            self.stdout.write(self.style.SUCCESS('Loaded starting website content: ' + ', '.join(loaded)))
        else:
            self.stdout.write('Website content already present - nothing to load.')
