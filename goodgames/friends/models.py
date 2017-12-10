# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

from base.models import (TimeStampedModel, )

# Create your models here.
class Friend(TimeStampedModel):
	user = models.ForeignKey(User)
	friend = models.ForeignKey(User, related_name="%(app_label)s_%(class)s_related")

	def __unicode__(self):
		return '{0} is friends with {1}'.format(self.user, self.friend)

	class Meta:
		app_label = 'friends'
		db_table = 'friends'
		indexes = [
			models.Index(fields=['user', 'friend'])
		]
		unique_together = ('user', 'friend')