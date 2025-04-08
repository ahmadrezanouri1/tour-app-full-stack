from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Destination
from .serializers import DestinationSerializer


class DestinationViewSet(viewsets.ModelViewSet):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
    ]
    filterset_fields = ['type', 'country']
    search_fields = ['name', 'description', 'attractions']
    ordering_fields = ['name', 'country', 'created_at']
    ordering = ['name'] 