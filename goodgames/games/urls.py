from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'^$', views.get_all_games, name='get_all_games'),
	url(r'^(?P<pk>[0-9]+)$', views.get_game_details, name='get_game_details'),
	url(r'choices', views.genres, name='choices'),
	url(r'search/(?P<q>.+)$', views.searchBy, name='game_search'),
	url(r'(?P<type>genre|platform|rating)/(?P<choice>.+)$', views.filterBy, name='filterByAll'),
	url(r'^(?P<pk>[0-9]+)/reviews/(?P<review>critic|user)$', views.get_all_comments,
	    name='getCommentByType'),


]
