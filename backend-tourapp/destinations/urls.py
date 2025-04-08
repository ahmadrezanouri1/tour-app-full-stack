from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'destinations'

router = DefaultRouter()
router.register(r'destinations', views.DestinationViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 