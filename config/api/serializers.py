from rest_framework import serializers
from .models import *

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']

class BandMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = BandMember
        fields = ['id', 'name', 'role']

class BandImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BandImage
        fields = ['id', 'image']

class BandSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    members = BandMemberSerializer(many=True, read_only=True)
    images = BandImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Band
        fields = ['id', 'name', 'formation_year', 'description', 'genres', 'members', 'images']

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'name']


class ProductSizeStockSerializer(serializers.ModelSerializer):
    size = SizeSerializer(read_only=True)
    
    class Meta:
        model = ProductSizeStock
        fields = ['size', 'stock']


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']
        read_only_fields = ['id']

class ProductSerializer(serializers.ModelSerializer):
    band = serializers.StringRelatedField()
    images = ProductImageSerializer(many=True, read_only=True)
    sizes_stock = ProductSizeStockSerializer(many=True, read_only=True)

    band = serializers.PrimaryKeyRelatedField(
        queryset=Band.objects.all(),
        error_messages={
            'does_not_exist': 'La banda con ID {pk_value} no existe.',
            'incorrect_type': 'El campo band debe ser un ID numérico.'
        }
    )
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'band', 'images', 'sizes_stock']