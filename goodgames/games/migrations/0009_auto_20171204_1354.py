# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-04 13:54
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0008_auto_20171204_1331'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='sentiment_magnitude',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=6, null=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='sentiment_score',
            field=models.DecimalField(blank=True, decimal_places=4, max_digits=6, null=True),
        ),
    ]
