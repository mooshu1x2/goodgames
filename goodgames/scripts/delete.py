# Command to run : python manage.py shell --settings=settings.dev  <
# scripts/seed.py
import os
import json

from django.contrib.auth.models import User
from allauth.account.models import EmailAddress
from django.conf import settings
from django.core.management.base import BaseCommand

from games.models import Game, GameList, Comment


def run(*args, **options):
	GameList.objects.all().delete()
	Comment.objects.all().delete()
	Game.objects.all().delete()
	User.objects.all().delete()
