from django.conf.urls import url

from . import views

urlpatterns = [
    # url(r'^google/$', views.GoogleLogin.as_view(), name='google_login'),
    # url(r'^facebook/$', views.FacebookLogin.as_view(), name='fb_login'),
    # url(r'login/(?P<email>.+)/(?P<first>.+)/(?P<last>.+)$', views.social_login, name='social_login'),
    url(r'sociallogin', views.social_login, name='social_login'),
]
