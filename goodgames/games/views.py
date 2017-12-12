# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import os

from itertools import chain

from rest_framework import permissions, status

from rest_framework.decorators import (api_view,
                                       authentication_classes,
                                       permission_classes,
                                       throttle_classes,)
from rest_framework.throttling import UserRateThrottle

from rest_framework.response import Response

from django.shortcuts import render

from django.contrib.auth.models import User
from .models import (Game, GameList, Comment)
from .serializers import (GameSerializer, GameListSerializer, CommentSerializer)

from friends.models import Friend
from friends.serializers import FriendSerializer

# Imports the Google Cloud client library
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

from django.db.models import Q
import operator

# Create your views here.

@throttle_classes([UserRateThrottle])
@api_view(['GET', 'POST'])
# @permission_classes((permissions.IsAuthenticated, HasVerifiedEmail))
# @authentication_classes((ExpiringTokenAuthentication,))
def get_all_games(request):
	if request.method == 'GET':
		games = Game.objects.all()
		serializer = GameSerializer(games, many=True)
		response_data = serializer.data
		return Response(response_data, status=status.HTTP_200_OK)

	elif request.method == 'POST':
		pass

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def get_all_comments(request, pk, review = ''):
	if request.method == 'GET':
		fields = {'critic': 'is_critic', 'user': 'is_user'}
		options = {}
		if review in fields:
			options[fields[review]] = True
			options['game'] = pk
			query = Comment.objects.all().filter(**options)
			results = []
			for c in query:
				serialize = CommentSerializer(c)
				results.append(serialize.data)
			return Response(results, status=status.HTTP_200_OK)
		else:
			comments = Comment.objects.filter(game=pk)
			comments = [CommentSerializer(ob).data for ob in
			            comments]

			return Response(comments, status=status.HTTP_200_OK)

@throttle_classes([UserRateThrottle])
@api_view(['GET', 'POST'])
def get_game_details(request, pk):
	try:
		game = Game.objects.get(pk=pk)
	except Game.DoesNotExist:
		response_data = {'error': 'Game does not exist'}
		return Response(response_data, status=status.HTTP_406_NOT_ACCEPTABLE)

	if request.method == 'GET':
		serializer = GameSerializer(game)
		response_data = serializer.data
		return Response(response_data, status=status.HTTP_200_OK)

	elif request.method == 'POST':
		serializer = GameSerializer(data=request.data,
		                            context={'request': request})
		if serializer.is_valid():
			serializer.save()
			response_data = serializer.data
			return Response(response_data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@throttle_classes([UserRateThrottle])
@api_view(['POST'])
def create_game(request):
	try:
		pass
	except:
		pass

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
# @permission_classes((permissions.IsAuthenticated, HasVerifiedEmail))
# @authentication_classes((ExpiringTokenAuthentication,))
def genres(request):
	if request.method == 'GET':
		genres = Game._meta.get_field('genre').choices
		ratings = Game._meta.get_field('rating').choices
		platforms = Game._meta.get_field('platform').choices

		result = {
			'genres': [{'id': i[0], 'value': i[1]} for i in genres],
			'ratings': [{'id': i[0], 'value': i[1]} for i in ratings],
			'platforms': [{'id': i[0], 'value': i[1]} for i in platforms]
		}

		return Response(result, status=status.HTTP_200_OK)

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def filterBy(request, type, choice):
	if request.method == 'GET':
		fields = ['genre', 'platform', 'rating']
		options = {}
		if type in fields:
			options[type] = choice
			query = Game.objects.all().filter(**options)
			results = []
			for g in query:
				serialize = GameSerializer(g)
				results.append(serialize.data)
			return Response(results, status=status.HTTP_200_OK)
		return Response({}, status=status.HTTP_200_OK)


@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def searchBy(request, q):
	if request.method == 'GET':
		query_list = q.split()
		result = Game.objects.filter(reduce(operator.or_, (Q(title__icontains=i) for i in query_list)))
		results = [GameSerializer(ob).data for ob in result]
		return Response(results, status=status.HTTP_200_OK)

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def sentiment(request, pk):
	if request.method == 'GET':
		# @todo, push to queue first
		# @todo, cache results

		comments = Comment.objects.filter(game=pk)
		comments = [CommentSerializer(ob).data['description'] for ob in comments]

		# Just need to capture overall sentiment
		comment_str = ''
		for c in comments:
			comment_str += c

		results = []
		if os.environ.get("GAE_INSTANCE") or os.environ.get("ENABLE_CLOUD"):
			# Instantiates a client
			client = language.LanguageServiceClient()
			document = types.Document(content=comment_str,
			                          type=enums.Document.Type.PLAIN_TEXT)

			# Detects the sentiment of the text
			sentiment = client.analyze_sentiment(document=document).document_sentiment

			results = {
				'sentiment': sentiment.score,
				'magnitude': sentiment.magnitude
			}
		return Response(results, status=status.HTTP_200_OK)

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def gameUserList(request, user_id):
	# user = User.objects.get(email=user_id)
	if request.method == 'GET':
		queryset = GameList.objects.filter(user__email=user_id)
		results = [GameListSerializer(ob).data for ob in queryset]
		return Response(results, status=status.HTTP_200_OK)

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def friendsList(request, user_id):
	if request.method == 'GET':
		# i = Friend.objects.select_related().filter(user__email=user_id)
		# print(i)
		# result_list = sorted(
		# 		chain(page_list, article_list, post_list),
		# 		key=lambda instance: instance.date_created)

		# queryset = Friend.objects.filter(user__email=user_id)
		# # For each of my friends, get their games
		# results = []
		#
		# for f in queryset:
		# 	friend_email = FriendSerializer(f).data['friend']['email']
		#
		# 	print(friend_email)
		# 	q = GameList.objects.get(user__email=friend_email)
		# 	print(q.entry_set.all() ) # Returns all Entry objects for this Author.
		# 	# q = GameList.objects.filter(user__email=friend_email).order_by('-modified_at')

			# results.append(GameListSerializer(q))
			# print(GameListSerializer(q).data)
		# result_list = list(chain(*results))

		# print(result_list)
		# res = [GameListSerializer(obj) for obj in results]
		# union(*other_qs, all=False)
		# qs1.union(qs2).order_by('name')

		return Response([], status=status.HTTP_200_OK)
# record = Record.objects.get(pk=record_id)
# values = Value.objects.filter(record=record).select_related()

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def gameUserListType(request, user_id, type):
	# user = User.objects.get(email=user_id)
	print(type)
	print("try to fetch a specific category in gamelist")
	if request.method == 'GET':
		queryset = GameList.objects.filter(user__email=user_id, type=type)
		results = [GameListSerializer(ob).data for ob in queryset]
		return Response(results, status=status.HTTP_200_OK)
	else:
		return Response([], status=status.HTTP_200_OK)

@throttle_classes([UserRateThrottle])
@api_view(['POST'])
def gameList(request):
	data = request.data
	user = User.objects.get(email=data['user'])
	game = Game.objects.get(pk=data['game'])
	type = data['type']
	# Bucket - save changes to gamelist by either
	# creating a new bucket or updated the current state of one
	if request.method == 'POST':
		obj = None
		try:
			obj = GameList.objects.get(user=user, game=game)
			obj.type = type.upper()
			obj.save()
		except GameList.DoesNotExist:
			obj = GameList.objects.create(user=user, game=game, type=type.upper())
		return Response(GameListSerializer(obj).data, status=status.HTTP_200_OK)
