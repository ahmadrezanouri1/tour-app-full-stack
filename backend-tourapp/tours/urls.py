from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TourViewSet, HotelViewSet, TourImageViewSet

router = DefaultRouter()
router.register(r'tours', TourViewSet)
router.register(r'hotels', HotelViewSet)
router.register(r'tour-images', TourImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 