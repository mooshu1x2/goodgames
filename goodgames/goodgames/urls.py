"""goodgames URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings

from rest_framework_swagger.views import get_swagger_view

from web import views

schema_view = get_swagger_view(title='GoodGames API')
handler404 = 'web.views.page_not_found'
handler500 = 'web.views.internal_server_error'

urlpatterns = [
    url(r'^$', views.home, name='home'),

    url(r'^fun', views.fun_page, name='fun'),


    url(r'^accounts/', include('allauth.urls')),

    # url(r'^accounts/profile', views.ProfileView.as_view(), name='profile'),

    url(r'^admin/', admin.site.urls),

    url(r'^api/games/', include('games.urls', namespace='games')),
    url(r'^api/web/',  include('web.urls', namespace='web')),
]

if settings.DEBUG:
    urlpatterns += [
                    url(r'^docs/', schema_view),
                    url(r'^api/admin-auth/', include('rest_framework.urls', namespace='rest_framework')),
                    ]
