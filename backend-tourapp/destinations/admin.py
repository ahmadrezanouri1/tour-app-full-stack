from django.contrib import admin
from .models import Destination


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ['name', 'country', 'type']
    list_filter = ['country', 'type']
    search_fields = ['name', 'country', 'description']
    fieldsets = (
        (None, {
            'fields': ('name', 'country', 'type', 'description')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Details', {
            'fields': ('attractions', 'climate')
        }),
        ('Location', {
            'fields': ('latitude', 'longitude')
        }),
    ) 