from rest_framework import viewsets, status, filters, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Tour, TourImage, Hotel
from .serializers import (
    TourListSerializer,
    TourDetailSerializer,
    TourImageUploadSerializer,
    HotelSerializer,
    TourSerializer,
    TourCreateSerializer,
    TourUpdateSerializer,
    TourImageSerializer
)


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['rating', 'destination']
    search_fields = ['name', 'description', 'address', 'amenities']
    ordering_fields = ['rating', 'price_per_night', 'name']
    ordering = ['-rating', 'name']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save()


class TourViewSet(viewsets.ModelViewSet):
    queryset = Tour.objects.prefetch_related('hotels', 'images', 'destination').all()
    serializer_class = TourListSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = {
        'type': ['exact'],
        'destination': ['exact'],
        'season': ['exact'],
        'duration': ['exact', 'gte', 'lte'],
        'price': ['exact', 'gte', 'lte'],
        'rating': ['exact', 'gte', 'lte'],
        'hotels': ['exact'],
    }
    search_fields = ['title', 'description', 'included_services', 'excluded_services', 'itinerary']
    ordering_fields = ['price', 'duration', 'rating', 'created_at']
    ordering = ['-created_at']
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_serializer_class(self):
        if self.action == 'list':
            return TourListSerializer
        elif self.action == 'create':
            return TourCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return TourUpdateSerializer
        return TourDetailSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        tour = serializer.save()
        return Response(
            TourSerializer(tour).data,
            status=status.HTTP_201_CREATED
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        tour = serializer.save()
        return Response(TourSerializer(tour).data)

    @action(detail=True, methods=['post'])
    def upload_images(self, request, pk=None):
        tour = self.get_object()
        serializer = TourImageUploadSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(tour=tour)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def remove_image(self, request, pk=None):
        tour = self.get_object()
        try:
            image_id = request.data.get('image_id')
            image = tour.images.get(id=image_id)
            image.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except TourImage.DoesNotExist:
            return Response(
                {'error': 'Image not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class TourImageViewSet(viewsets.ModelViewSet):
    queryset = TourImage.objects.all()
    serializer_class = TourImageSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save() 