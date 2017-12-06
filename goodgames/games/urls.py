from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'^$', views.get_all_games, name='get_all_games'),
	url(r'^(?P<pk>[0-9]+)$', views.get_game_details, name='get_game_details'),
	url(r'choices', views.genres, name='choices'),
	url(r'(?P<type>genre|platform|rating)/(?P<choice>.+)$', views.filterBy, name='filterByAll'),
	url(r'^(?P<pk>[0-9]+)/reviews/(?P<review>critic|user)$', views.get_all_comments,
	    name='getCommentByType'),

	# url(r'^create_challenge_host_team$', views.create_challenge_host_team, name='create_challenge_host_team'),
    # url(r'^challenge_host_team/(?P<challenge_host_team_pk>[0-9]+)/challenge_host$', views.challenge_host_list,
    #     name='get_challenge_host_list'),
    # url(r'^challenge_host_team/(?P<challenge_host_team_pk>[0-9]+)/challenge_host/(?P<pk>[0-9]+)$',
    #     views.challenge_host_detail, name='get_challenge_host_details'),
    # url(r'^remove_self_from_challenge_host/(?P<challenge_host_team_pk>[0-9]+)$',
    #     views.remove_self_from_challenge_host_team, name='remove_self_from_challenge_host_team'),
    # url(r'^challenge_host_teams/(?P<pk>[0-9]+)/invite$', views.invite_host_to_team,
    #     name='invite_host_to_team'),
]
