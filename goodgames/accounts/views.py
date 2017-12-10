# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.contrib.auth import logout

from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.decorators import (api_view,
                                       authentication_classes,
                                       permission_classes,
                                       throttle_classes,)
from rest_framework.throttling import UserRateThrottle
from rest_framework.response import Response

from django.contrib.auth.models import User
from allauth.account.models import EmailAddress

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter

from rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter(FacebookOAuth2Adapter)

# Create your views here.
@throttle_classes([UserRateThrottle])
@api_view(['POST'])
def social_login(request):
    data = request.data
    email = request.data['email']
    name = request.data['name'].split()

    if request.method == 'POST':
        try:
            user = User.objects.get(email=email)
            return Response("ok", status=status.HTTP_200_OK)
        except User.DoesNotExist:
            user = User.objects.create_user(
                    email=email,
                    username=email,
                    password="password",
                    is_staff=False,
                    is_superuser=False,
            )
            user.first_name = name[0]
            user.last_name = name[1]
            user.save()
            EmailAddress.objects.create(user=user, email=email, verified=True,
                                        primary=True)

            return Response("ok", status.HTTP_200_OK)