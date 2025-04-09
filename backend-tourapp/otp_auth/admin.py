from django.contrib import admin
from .models import OTP
from django.utils import timezone
from django import forms

class OTPAdminForm(forms.ModelForm):
    class Meta:
        model = OTP
        fields = ['phone_number', 'code', 'is_used']

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    form = OTPAdminForm
    list_display = ('phone_number', 'code', 'created_at', 'expires_at', 'is_used')
    list_filter = ('is_used', 'created_at')
    search_fields = ('phone_number', 'code')
    readonly_fields = ('created_at', 'expires_at')
    
    def save_model(self, request, obj, form, change):
        if not change:  # Only set expires_at for new OTPs
            obj.expires_at = timezone.now() + timezone.timedelta(minutes=5)
        super().save_model(request, obj, form, change)
