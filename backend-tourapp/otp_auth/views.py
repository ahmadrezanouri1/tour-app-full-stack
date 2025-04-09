from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail
from django.conf import settings
from .serializers import OTPGenerateSerializer, OTPVerifySerializer
from .models import OTP
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

User = get_user_model()

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def generate_otp(request):
    serializer = OTPGenerateSerializer(data=request.data)
    if serializer.is_valid():
        phone_number = serializer.validated_data['phone_number']
        
        # Generate OTP
        otp = OTP.generate_otp(phone_number)
        
        # In a real application, you would send the OTP via SMS here
        # For development, we'll just return the OTP
        return Response(
            {
                'message': 'OTP has been sent to your phone.',
                'otp': otp.code  # Remove this in production
            },
            status=status.HTTP_200_OK
        )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_otp(request):
    serializer = OTPVerifySerializer(data=request.data)
    if serializer.is_valid():
        phone_number = serializer.validated_data['phone_number']
        code = serializer.validated_data['code']
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        
        try:
            otp = OTP.objects.filter(
                phone_number=phone_number,
                code=code,
                is_used=False
            ).latest('created_at')
            
            if otp.is_valid():
                otp.mark_as_used()
                
                # Check if user exists
                try:
                    user = User.objects.get(phone_number=phone_number)
                except User.DoesNotExist:
                    if not username or not password:
                        return Response(
                            {'error': 'Username and password are required for new users.'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                    # Create new user
                    user = User.objects.create_user(
                        username=username,
                        password=password,
                        phone_number=phone_number,
                        email=f"{phone_number}@temp.com"  # Set a temporary email
                    )
                
                # Generate or get token
                token, created = Token.objects.get_or_create(user=user)
                
                return Response(
                    {
                        'message': 'OTP verified successfully.',
                        'token': token.key,
                        'user_id': user.id,
                        'username': user.username
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {'error': 'Invalid or expired OTP.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except OTP.DoesNotExist:
            return Response(
                {'error': 'Invalid OTP.'},
                status=status.HTTP_400_BAD_REQUEST
            )
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
