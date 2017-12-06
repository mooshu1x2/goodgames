from rest_framework import serializers

from .models import Game, Comment

class GameSerializer(serializers.ModelSerializer):

	class Meta:
		model = Game
		fields = ('id', 'title', 'platform',
		          'genre', 'rating', 'release_date',
		          'publisher', 'developer',
		          'na_sales', 'eu_sales', 'jp_sales', 'ot_sales',
		          'critic_score', 'critic_count', 'user_score',
		          'user_count',)

class CommentSerializer(serializers.ModelSerializer):
	# game = GameSerializer()

	class Meta:
		model = Comment
		fields = ('id', 'description', 'is_critic', 'is_user', 'sentiment_score',
		          'sentiment_magnitude')