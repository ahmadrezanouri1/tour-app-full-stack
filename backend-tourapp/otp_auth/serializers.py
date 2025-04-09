from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import OTP

User = get_user_model()

class PhoneNumberSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

class OTPGenerateSerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)

class OTPVerifySerializer(serializers.Serializer):
    phone_number = serializers.CharField(max_length=15)
    code = serializers.CharField(max_length=6)
    username = serializers.CharField(required=False)
    password = serializers.CharField(required=False)

    def validate(self, data):
        try:
            otp = OTP.objects.filter(
                phone_number=data['phone_number'],
                code=data['code'],
                is_used=False
            ).latest('created_at')
            
            if not otp.is_valid():
                raise serializers.ValidationError("Invalid or expired OTP.")
            
            return data
        except OTP.DoesNotExist:
            raise serializers.ValidationError("Invalid OTP.") 