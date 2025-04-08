from django.contrib import admin
from .models import Tour, Hotel, TourImage


class TourImageInline(admin.TabularInline):
    model = TourImage
    extra = 1


@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ['name', 'rating', 'price_per_night', 'created_at']
    list_filter = ['rating']
    search_fields = ['name', 'description', 'address']
    ordering = ['-rating', 'name']


@admin.register(Tour)
class TourAdmin(admin.ModelAdmin):
    list_display = ['title', 'destination', 'duration', 'price', 'season', 'type', 'created_at']
    list_filter = ['season', 'type', 'destination']
    search_fields = ['title', 'description']
    filter_horizontal = ['hotels']
    inlines = [TourImageInline]
    ordering = ['-created_at']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('destination') 