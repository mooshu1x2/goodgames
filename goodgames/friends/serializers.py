from rest_framework import serializers

from .models import Friend
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class FriendSerializer(serializers.ModelSerializer):
	friend = UserSerializer()
	user = UserSerializer()

	class Meta:
		model = Friend
		fields = ['user', 'friend']
