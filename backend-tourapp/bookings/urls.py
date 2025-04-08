from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'bookings'

router = DefaultRouter()
router.register(r'bookings', views.BookingViewSet)
router.register(r'payments', views.PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 