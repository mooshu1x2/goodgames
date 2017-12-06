# Command to run : python manage.py seed
import os
import json
import datetime

from django.contrib.auth.models import User
from allauth.account.models import EmailAddress
from django.conf import settings
from django.core.management.base import BaseCommand

from games.models import Game, GameList, Comment

# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types


def create_user(is_admin, username=""):
	"""
	Creates superuser, participant user, host user and returns it.
	"""
	if is_admin:
		username = "admin"
		email = "admin@example.com"
	else:
		email = "%s@example.com" % (username)
	user = User.objects.create_user(
			email=email,
			username=username,
			password="password",
			is_staff=is_admin,
			is_superuser=is_admin,
	)
	EmailAddress.objects.create(user=user, email=email, verified=True,
	                            primary=True)
	print("{} was created with username: {} password: password".format(
		"Super user" if is_admin else "User", username))
	return user


def create_game(client):
	"""
	Create games from curated list, including comments
	"""

	f = 'gamedata.json'
	data = None
	with open(os.path.join(settings.BASE_DIR, 'scripts', f), 'rb') as data_file:
		data = json.load(data_file)

	games = data['games']
	for d in games:
		print("Creating game {}...".format(d['name']))
		game = Game.objects.create(
				title=d["name"],
				platform=d["platform"],
				genre=d["genre"],
				rating=d["rating"],
				release_date=datetime.datetime.strptime(d["release_date"], "%b %d, %Y") if d["release_date"] else None,
				# release_year=datetime.datetime.strptime(d["release_year"], "%Y") if d["release_year"] else None,
				publisher=d["publisher"],
				developer=d["developer"],
				na_sales=d["na_sales"] if d["na_sales"] else None,
				eu_sales=d["eu_sales"] if d["eu_sales"] else None,
				jp_sales=d["jp_sales"] if d["jp_sales"] else None,
				ot_sales=d["rw_sales"] if d["rw_sales"] else None,
				gb_sales=d["gl_sales"] if d["gl_sales"] else None,
				critic_score=d["critic_score"] if d["critic_score"] else None,
				critic_count=d["critic_count"] if d["critic_count"] else None,
				user_score=d["user_score"] if d["user_score"] else None,
				user_count=d["user_count"] if d["user_count"] else None,
		)

		critic_reviews = d['critic_reviews']
		print("Creating {} critic reviews for game {}...".format(len(critic_reviews), d['name']))
		for c in critic_reviews:
			# Quick and dirty way to restrict length of comment to 1024 characters
			desc = c[:1024] if len(c) > 1024 else c
			desc = desc.encode('ascii', 'ignore')
			document = types.Document(content=desc, type=enums.Document.Type.PLAIN_TEXT)

			# Detects the sentiment of the text
			sentiment = client.analyze_sentiment(document=document).document_sentiment
			print('Sentiment: {}, {}'.format(sentiment.score, sentiment.magnitude))

			comment = Comment.objects.create(
					game=game,
					description=desc,
					is_critic=True,
					is_user=False,
					sentiment_score=format(sentiment.score, '.3f'),
					sentiment_magnitude=format(sentiment.magnitude, '.3f'),
			)

		user_reviews = d['user_reviews']
		print("Creating {} user reviews for game {}...".format(len(user_reviews), d['name']))
		for u in user_reviews:
			# Quick and dirty way to restrict length of comment to 1024
			# characters
			desc = u[:1024] if len(u) > 1024 else u
			desc = desc.encode('ascii', 'ignore')

			document = types.Document(content=desc,
			                          type=enums.Document.Type.PLAIN_TEXT)

			# Detects the sentiment of the text
			sentiment = client.analyze_sentiment(document=document).document_sentiment
			print('Sentiment: {}, {}'.format(sentiment.score, sentiment.magnitude))

			comment = Comment.objects.create(
					game=game,
					description=desc,
					is_critic=False,
					is_user=True,
					sentiment_score=format(sentiment.score, '.3f'),
					sentiment_magnitude=format(sentiment.magnitude, '.3f'),
			)



def run(*args, **options):
	# Create superuser
	create_user(is_admin=True)

	# Create participant user
	participant_user = create_user(is_admin=False, username="participant")

	# Create curated list of games from data file
	# Instantiates a client
	client = language.LanguageServiceClient()
	create_game(client)
