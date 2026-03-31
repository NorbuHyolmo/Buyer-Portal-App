from .models import Property, Favourite
from rest_framework import serializers


class PropertySerializer(serializers.ModelSerializer):
    is_favourited = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = '__all__'

    def get_is_favourited(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return Favourite.objects.filter(user=user, property=obj).exists()
        return False
        # request = self.context.get('request')
        # if request and request.user.is_authenticated:
        #     return Favourite.objects.filter(
        #         user = request.user, 
        #         property=obj
        #     ).exists()
        # return False


class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = '__all__'
        read_only_fields = ['user']

    