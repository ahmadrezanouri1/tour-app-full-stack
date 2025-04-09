from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import random
import string

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    email = models.EmailField(unique=True, blank=True, null=True)

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.phone_number or self.username

class OTP(models.Model):
    phone_number = models.CharField(max_length=15, default='')
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_used = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timezone.timedelta(minutes=5)
        super().save(*args, **kwargs)

    @classmethod
    def generate_otp(cls, phone_number):
        # Generate a 6-digit OTP
        code = ''.join(random.choices(string.digits, k=6))
        # OTP expires in 5 minutes
        expires_at = timezone.now() + timezone.timedelta(minutes=5)
        
        # Create new OTP
        otp = cls.objects.create(
            phone_number=phone_number,
            code=code,
            expires_at=expires_at
        )
        return otp

    def is_valid(self):
        return (
            not self.is_used and
            timezone.now() <= self.expires_at
        )

    def mark_as_used(self):
        self.is_used = True
        self.save()

    class Meta:
        verbose_name = 'OTP'
        verbose_name_plural = 'OTPs'
