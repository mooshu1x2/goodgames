# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from base.admin import ImportExportTimeStampedAdmin

# Register your models here.
from .models import (Game, GameList, Comment)


@admin.register(Game)
class GameAdmin(ImportExportTimeStampedAdmin):
    list_display = ("title", "description", "platform", "release_date", "genre", "publisher", "developer",
                    "rating")
    list_filter = ("platform", "genre", "publisher", "developer", "rating")
    search_fields = ("title", "platform")


@admin.register(GameList)
class GameListAdmin(ImportExportTimeStampedAdmin):
	list_display = ("type", "user", "game")
	list_filter = ("type", "game")
	search_fields = ("type", "user", "game")

@admin.register(Comment)
class CommentAdmin(ImportExportTimeStampedAdmin):
	list_display = ("game", "description", "is_critic", "is_user", "sentiment_score", "sentiment_magnitude")
	list_filter = ("game", "is_critic", "is_user")
	search_fields = ("game", "is_critic", "is_user")
