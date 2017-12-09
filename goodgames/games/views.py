# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import permissions, status

from rest_framework.decorators import (api_view,
                                       authentication_classes,
                                       permission_classes,
                                       throttle_classes,)
from rest_framework.throttling import UserRateThrottle

from rest_framework.response import Response

from django.shortcuts import render

from .models import (Game, Comment)
from .serializers import (GameSerializer, CommentSerializer)

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
def get_all_comments(request, pk, review):
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
		return Response({}, status=status.HTTP_200_OK)

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