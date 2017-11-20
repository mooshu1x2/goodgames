from rest_framework import serializers

from .models import Game

class GameSerializer(serializers.ModelSerializer):

	class Meta:
		model = Game
		fields = ('id', 'title', 'is_sequel', 'platform',
		          'genre', 'rating', 'release_date', 'release_year',
		          'publisher', 'developer',
		          'na_sales', 'eu_sales', 'jp_sales', 'ot_sales',
		          'critic_score', 'critic_count', 'user_score',
		          'user_count',)