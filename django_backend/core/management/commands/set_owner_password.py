from django.contrib.auth.models import User
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    help = 'Change the owner password:  python manage.py set_owner_password NEWPASSWORD'

    def add_arguments(self, parser):
        parser.add_argument('password')
        parser.add_argument('--username', default='adityaraj_owner')

    def handle(self, *args, **opts):
        user = User.objects.filter(username=opts['username']).first()
        if not user:
            raise CommandError("User '%s' not found. Run: python manage.py create_owner" % opts['username'])
        user.set_password(opts['password'])
        user.is_staff = True
        user.save()
        self.stdout.write(self.style.SUCCESS('Password updated for %s' % user.username))
