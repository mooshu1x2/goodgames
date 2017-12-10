from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'^$', views.get_all_games, name='get_all_games'),
	url(r'^(?P<pk>[0-9]+)$', views.get_game_details, name='get_game_details'),
	url(r'choices', views.genres, name='choices'),
	url(r'search/(?P<q>.+)$', views.searchBy, name='game_search'),
	url(r'sentiment/(?P<pk>[0-9]+)$', views.sentiment, name='comment_sentiment'),
	url(r'(?P<type>genre|platform|rating)/(?P<choice>.+)$', views.filterBy, name='filterByAll'),
	url(r'^(?P<pk>[0-9]+)/reviews/(?P<review>critic|user)$', views.get_all_comments, name='getCommentByType'),
	url(r'^(?P<pk>[0-9]+)/reviews', views.get_all_comments, name='getCommentByType'),
	# url(r'bucket/(?P<user_id>.+)/(?P<game_id>[0-9]+)/(?P<type>[\w\-].+)$', views.gameList, name='updateBucket'),
	url(r'bucket$', views.gameList, name='updateBucket'),
	url(r'fetch/(?P<user_id>.+)$', views.gameUserList, name='fetch_user_games'),
	url(r'lookup/(?P<user_id>.+)/(?P<type>.+)$', views.gameUserListType, name='fetch_user_games_type'),
	url(r'friends/(?P<user_id>.+)$', views.friendsList, name='get_friends_games'),
]