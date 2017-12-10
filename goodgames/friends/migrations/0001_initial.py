# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-10 00:46
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('modified_at', models.DateTimeField(auto_now=True)),
                ('friend', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='friends_friend_related', to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'friends',
            },
        ),
        migrations.AddIndex(
            model_name='friend',
            index=models.Index(fields=['user', 'friend'], name='friends_user_id_020709_idx'),
        ),
        migrations.AlterUniqueTogether(
            name='friend',
            unique_together=set([('user', 'friend')]),
        ),
    ]
