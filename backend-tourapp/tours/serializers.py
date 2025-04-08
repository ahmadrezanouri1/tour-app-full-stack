from rest_framework import serializers
from .models import Tour, TourImage, Hotel
from destinations.serializers import DestinationSerializer
import json


class HotelSerializer(serializers.ModelSerializer):
    rating_display = serializers.CharField(source='get_rating_display', read_only=True)
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    amenities = serializers.SerializerMethodField()

    class Meta:
        model = Hotel
        fields = [
            'id', 'name', 'description', 'address', 'rating', 'rating_display',
            'amenities', 'image', 'price_per_night', 'destination', 'destination_name'
        ]

    def get_amenities(self, obj):
        return obj.get_amenities()

    def validate_amenities(self, value):
        if isinstance(value, list):
            return json.dumps(value)
        return value

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            data['amenities'] = json.loads(instance.amenities)
        except (json.JSONDecodeError, TypeError):
            data['amenities'] = []
        return data

    def to_internal_value(self, data):
        if 'amenities' in data and isinstance(data['amenities'], list):
            data['amenities'] = json.dumps(data['amenities'])
        return super().to_internal_value(data)


class TourImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourImage
        fields = ['id', 'image', 'created_at']


class TourListSerializer(serializers.ModelSerializer):
    featured_image = serializers.SerializerMethodField()
    destination_name = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = Tour
        fields = [
            'id', 'title', 'type', 'destination_name', 'duration',
            'price', 'season', 'rating', 'featured_image'
        ]

    def get_featured_image(self, obj):
        featured_image = obj.images.filter(is_primary=True).first()
        if featured_image:
            return self.context['request'].build_absolute_uri(featured_image.image.url)
        return None


class TourDetailSerializer(serializers.ModelSerializer):
    images = TourImageSerializer(many=True, read_only=True)
    destination_name = serializers.CharField(source='destination.name', read_only=True)

    class Meta:
        model = Tour
        fields = [
            'id', 'title', 'description', 'type', 'destination',
            'destination_name', 'duration', 'price', 'season',
            'included_services', 'excluded_services', 'itinerary',
            'rating', 'images', 'created_at', 'updated_at'
        ]
        read_only_fields = ['rating', 'created_at', 'updated_at']


class TourImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourImage
        fields = ['image', 'caption', 'is_primary']


class TourSerializer(serializers.ModelSerializer):
    images = TourImageSerializer(many=True, read_only=True)
    hotels = HotelSerializer(many=True, read_only=True)
    destination_details = DestinationSerializer(source='destination', read_only=True)
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    season_display = serializers.CharField(source='get_season_display', read_only=True)
    destination_name = serializers.CharField(source='destination.name', read_only=True)
    included_services = serializers.SerializerMethodField()
    excluded_services = serializers.SerializerMethodField()

    class Meta:
        model = Tour
        fields = [
            'id', 'title', 'description', 'type', 'type_display',
            'destination', 'destination_details', 'duration', 'price',
            'season', 'season_display', 'rating', 'included_services',
            'excluded_services', 'itinerary', 'hotels', 'images',
            'created_at', 'updated_at', 'destination_name'
        ]

    def get_included_services(self, obj):
        return obj.get_included_services()

    def get_excluded_services(self, obj):
        return obj.get_excluded_services()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        try:
            data['included_services'] = json.loads(instance.included_services)
            data['excluded_services'] = json.loads(instance.excluded_services)
        except (json.JSONDecodeError, TypeError):
            data['included_services'] = []
            data['excluded_services'] = []
        # Convert amenities to list for each hotel
        for hotel in data['hotels']:
            if hotel['amenities']:
                hotel['amenities'] = [
                    amenity.strip() 
                    for amenity in hotel['amenities'].split('\n') 
                    if amenity.strip()
                ]
        return data 

    def to_internal_value(self, data):
        if 'included_services' in data and isinstance(data['included_services'], list):
            data['included_services'] = json.dumps(data['included_services'])
        if 'excluded_services' in data and isinstance(data['excluded_services'], list):
            data['excluded_services'] = json.dumps(data['excluded_services'])
        return super().to_internal_value(data)


class TourCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(),
        write_only=True,
        required=False
    )
    hotel_ids = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )
    included_services = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )
    excluded_services = serializers.ListField(
        child=serializers.CharField(),
        required=False
    )

    class Meta:
        model = Tour
        fields = [
            'title', 'description', 'destination', 'duration',
            'price', 'season', 'type', 'included_services',
            'excluded_services', 'images', 'hotel_ids'
        ]

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        hotel_ids = validated_data.pop('hotel_ids', [])
        included_services = validated_data.pop('included_services', [])
        excluded_services = validated_data.pop('excluded_services', [])
        
        # Convert lists to JSON strings
        validated_data['included_services'] = json.dumps(included_services)
        validated_data['excluded_services'] = json.dumps(excluded_services)
        
        tour = Tour.objects.create(**validated_data)
        
        # Add hotels
        if hotel_ids:
            tour.hotels.set(hotel_ids)
        
        # Create tour images
        for image in images:
            TourImage.objects.create(tour=tour, image=image)
        
        return tour


class TourUpdateSerializer(TourCreateSerializer):
    class Meta(TourCreateSerializer.Meta):
        pass

    def update(self, instance, validated_data):
        images = validated_data.pop('images', [])
        hotel_ids = validated_data.pop('hotel_ids', [])
        included_services = validated_data.pop('included_services', None)
        excluded_services = validated_data.pop('excluded_services', None)
        
        # Update JSON fields only if provided
        if included_services is not None:
            validated_data['included_services'] = json.dumps(included_services)
        if excluded_services is not None:
            validated_data['excluded_services'] = json.dumps(excluded_services)
        
        # Update tour fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update hotels
        if hotel_ids:
            instance.hotels.set(hotel_ids)
        
        # Add new images
        for image in images:
            TourImage.objects.create(tour=instance, image=image)
        
        return instance 