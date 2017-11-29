# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from base.models import (TimeStampedModel, )

# Create your models here.

class Game(TimeStampedModel):
	# Platforms
	UNK = 'Unknown'
	# Old School
	ATARI = '2600'
	SEGA = 'GEN'
	# Playstation
	PS = 'PS'
	PS2 = 'PS2'
	PS3 = 'PS3'
	PS4 = 'PS4'
	PSV = 'PSV'
	PSP = 'PSP'
	# Microsoft
	XB = 'XB'
	XBOX360 = 'X360'
	XBONE = 'XOne'
	# Nintendo
	NES= 'NES'
	SNES = 'SNES'
	GC = 'GC'
	GB = 'GB'
	GBA = 'GBA'
	N64 = 'N64'
	DS = 'DS'
	DS3 = '3DS'
	WII = 'Wii'
	WIIU = 'WiiU'
	SWITCH = 'NS'
	PC = 'PC'

	# Genres
	ACTION = 'Action'
	ADVENTURE = 'Adventure'
	FIGHTING = 'Fighting'
	PLATFORM = 'Platform'
	PUZZLE = 'Puzzle'
	RACING = 'Racing'
	RPG = 'Role-Playing'
	SHOOTER = 'Shooter'
	SIMULATION = 'Simulation'
	SPORTS = 'Sports'
	STRATEGY = 'Strategy'
	MISC = 'Misc'

	# ESRB Ratings
	RP = 'RP'
	EC = 'EC'
	E = 'E'
	E10 = 'E10+'
	T = 'T'
	M = 'M'
	AO = 'AO'
	KA = 'K-A'

	CONSOLE_OPTIONS = (
		(ATARI, 'Atari 2600'),
		(SEGA, 'Sega Genesis'),
		(PS, 'Playstation'),
		(PS2, 'Playstation 2'),
		(PS3, 'Playstation 3'),
		(PS4, 'Playstation 4'),
		(PSV, 'Playstation Vita'),
		(PSP, 'Playstation Portable'),
		(XB, 'Xbox'),
		(XBOX360, 'Xbox 360'),
		(XBONE, 'Xbox One'),
		(NES, 'Nintendo Entertainment System'),
		(SNES, 'Super Nintendo Entertainment System'),
		(GC, 'Game Boy Color'),
		(GB, 'Game Boy'),
		(GBA, 'Game Boy Advance'),
		(N64, 'Nintendo 64'),
		(DS, 'Nintendo DS'),
		(DS3, 'Nintendo DS3'),
		(WII, 'Wii'),
		(WIIU, 'WiiU'),
		(SWITCH, 'Nintendo Switch'),
		(PC, 'PC'),
		(UNK, UNK),
	)

	GENRE_OPTIONS = (
		(ACTION, ACTION),
		(ADVENTURE, ADVENTURE),
		(FIGHTING, FIGHTING),
		(PLATFORM, PLATFORM),
		(PUZZLE, PUZZLE),
		(RACING, RACING),
		(RPG, RPG),
		(SHOOTER, SHOOTER),
		(SIMULATION, SIMULATION),
		(SPORTS, SPORTS),
		(STRATEGY, STRATEGY),
		(MISC, MISC),
		(UNK, UNK)
	)

	RATING_OPTIONS = (
		(RP, 'Rating Pending'),
		(EC, 'Early Childhood'),
		(E, 'Everyone'),
		(E10, 'Everyone 10+'),
		(T, 'Teen'),
		(M, 'Mature'),
		(AO, 'Adults Only'),
		(KA, 'Kids to Adults'),
		(UNK, UNK)
	)

	# Required
	title = models.CharField(max_length=120)
	# is_sequel = models.BooleanField(default=False)
	platform = models.CharField(max_length=30, choices=CONSOLE_OPTIONS, default=UNK)
	genre = models.CharField(max_length=30, choices=GENRE_OPTIONS, default=UNK)
	rating = models.CharField(max_length=30, choices=RATING_OPTIONS, default=UNK)

	# Optional
	release_date = models.DateField(null=True, blank=True)
	# release_year = models.DateField(null=True, blank=True)
	publisher = models.CharField(max_length=120, blank=True)
	developer = models.CharField(max_length=120, blank=True)

	# Sales data (optional)
	na_sales = models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)
	eu_sales = models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)
	jp_sales = models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)
	ot_sales = models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)
	gb_sales = models.DecimalField(decimal_places=2, max_digits=6, null=True, blank=True)

	# Reviews (optional)
	critic_score = models.IntegerField(null=True, blank=True)
	critic_count = models.IntegerField(null=True, blank=True)
	user_score = models.DecimalField(decimal_places=1, max_digits=6, null=True, blank=True)
	user_count = models.IntegerField(null=True, blank=True)

	def __unicode__(self):
		return '{0}:{1}:{2}:{3}'.format(self.title, self.genre, self.publisher, self.developer)

	class Meta:
		app_label = 'games'
		db_table = 'games'
		indexes = [
			models.Index(fields=['title', 'platform']),
			models.Index(fields=['title', 'platform', 'rating']),
			models.Index(fields=['platform', 'genre']),
			models.Index(fields=['platform']),
			models.Index(fields=['genre'])
		]
		unique_together = ('title', 'platform', 'developer')


class GameList(TimeStampedModel):
	LIST_OPTIONS = (
		('WANT TO PLAY', 'Want to Play'),
		('HAVE PLAYED', 'Have Played'),
		('NEVER', 'Never want to play'),
		('OTHER', 'Other')
	)

	name = models.CharField(max_length=120)
	type = models.CharField(max_length=30, choices=LIST_OPTIONS)

	user = models.ForeignKey(User)
	game = models.ForeignKey(Game)

	def __unicode__(self):
		return '{0}:{1}:{2}:{3}'.format(self.name, self.type,
		                                self.game, self.user)

	class Meta:
		app_label = 'games'
		db_table = 'game_list'
		indexes = [
			models.Index(fields=['name', 'type']),
			models.Index(fields=['name', 'type', 'game'])
		]
		unique_together = ('name', 'user', 'game')


class Comment(TimeStampedModel):
	description = models.CharField(max_length=1024)
	is_critic = models.BooleanField(default=False)
	is_user = models.BooleanField(default=False)

	game = models.ForeignKey(Game)

	def __unicode__(self):
		return '{0}:{1}:{2}:{3}'.format(self.game, self.description,
		                                self.is_critic, self.is_user)

	class Meta:
		app_label = 'games'
		db_table = 'comments'
		indexes = [
			models.Index(fields=['game', 'is_critic']),
			models.Index(fields=['game', 'is_user'])
		]
		# unique_together = ('game', 'description')

