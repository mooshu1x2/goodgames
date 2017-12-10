from rest_framework import serializers

from .models import Game, GameList, Comment

from friends.serializers import UserSerializer
from django.contrib.auth.models import User


class CustomSerializer(serializers.HyperlinkedModelSerializer):

	def get_field_names(self, declared_fields, info):
		expanded_fields = super(CustomSerializer, self).get_field_names(
				declared_fields, info)

		if getattr(self.Meta, 'extra_fields', None):
			return expanded_fields + self.Meta.extra_fields
		else:
			return expanded_fields


class GameSerializer(serializers.ModelSerializer):
	class Meta:
		model = Game
		fields = ('id', 'description', 'title', 'platform',
		          'genre', 'rating', 'release_date',
		          'publisher', 'developer',
		          'na_sales', 'eu_sales', 'jp_sales', 'ot_sales',
		          'critic_score', 'critic_count', 'user_score',
		          'user_count',)


class GameTypeSerializer(serializers.ChoiceField):
	def __init__(self, **kwargs):
		super(GameTypeSerializer, self).__init__(choices=GameList.LIST_OPTIONS)

	def to_representation(self, value):
		# if value in ('', None):
		# 	return ''
		print(value)
		return super(GameTypeSerializer, self).to_representation(value)


class ChoicesField(serializers.Field):
	def __init__(self, choices, **kwargs):
		self._choices = choices
		super(ChoicesField, self).__init__(**kwargs)

	def to_representation(self, obj):
		return self._choices[obj]

	def to_internal_value(self, data):
		return getattr(self._choices, data)


class GameListSerializer(serializers.ModelSerializer):
	user = UserSerializer()
	game = GameSerializer()
	# type = ChoicesField(GameList.LIST_OPTIONS)

	class Meta:
		model = GameList
		fields = ('user', 'game', 'type')


class CommentSerializer(serializers.ModelSerializer):
	# game = GameSerializer()

	class Meta:
		model = Comment
		fields = (
			'id', 'description', 'is_critic', 'is_user', 'sentiment_score',
			'sentiment_magnitude')


# class GameListTestSerializer(serializers.ModelSerializer):
# 	game = GameSerializer()
# 	user = UserSerializer()
# 	created_by = serializers.SlugRelatedField(slug_field='user',
# 	                                          queryset=User.objects.all())
#
# 	def __init__(self, *args, **kwargs):
# 		super(GameListTestSerializer, self).__init__(*args, **kwargs)
# 		context = kwargs.get('context')
# 		print("Getting context")
# 		print(context)
# 		if context:
# 			request = context.get('request')
# 			print(kwargs)
# 			kwargs['data']['created_by'] = request.user.email
#
# 	class Meta:
# 		model = GameList
# 		fields = ('game', 'type', 'user', 'created_by')
