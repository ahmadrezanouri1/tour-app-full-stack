from django.urls import path
from .views import generate_otp, verify_otp

urlpatterns = [
    path('generate/', generate_otp, name='generate-otp'),
    path('verify/', verify_otp, name='verify-otp'),
] 