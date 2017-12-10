# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from base.admin import ImportExportTimeStampedAdmin
from .models import (Friend)

# Register your models here.
@admin.register(Friend)
class FriendAdmin(ImportExportTimeStampedAdmin):
    list_display = ("user", "friend")
    list_filter =  ("user", "friend")
    search_fields =  ("user", "friend")
