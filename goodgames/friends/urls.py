from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^(?P<email>.+)$', views.get_all_friends, name='get_all_friends'),
]
