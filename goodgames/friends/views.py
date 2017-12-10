# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from rest_framework import permissions, status

from rest_framework.decorators import (api_view,
                                       authentication_classes,
                                       permission_classes,
                                       throttle_classes,)
from rest_framework.throttling import UserRateThrottle

from rest_framework.response import Response

from django.contrib.auth.models import User

from .models import (Friend)
from .serializers import (FriendSerializer)

# Create your views here.
@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def get_all_friends(request, email):
	if request.method == 'GET':
		try:
			user = User.objects.get(email=email)
			friends = Friend.objects.filter(user=user)
			results = [FriendSerializer(ob).data for ob in friends]
			return Response(results, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			user = None
			return Response("Unable to find " + email, status.HTTP_404_NOT_FOUND)

@throttle_classes([UserRateThrottle])
@api_view(['GET'])
def get_all_friends_info(request, email):
	if request.method == 'GET':
		try:
			user = User.objects.get(email=email)
			friends = Friend.objects.filter(user=user)
			results = [FriendSerializer(ob).data for ob in friends]
			return Response(results, status=status.HTTP_200_OK)
		except User.DoesNotExist:
			user = None
			return Response("Unable to find " + email, status.HTTP_404_NOT_FOUND)