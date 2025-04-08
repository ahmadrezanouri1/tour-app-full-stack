from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from destinations.models import Destination

class Hotel(models.Model):
    HOTEL_RATINGS = [
        (1, '⭐'),
        (2, '⭐⭐'),
        (3, '⭐⭐⭐'),
        (4, '⭐⭐⭐⭐'),
        (5, '⭐⭐⭐⭐⭐'),
    ]

    name = models.CharField(max_length=200, verbose_name='نام هتل')
    description = models.TextField(verbose_name='توضیحات')
    address = models.CharField(max_length=500, verbose_name='آدرس')
    rating = models.DecimalField(max_digits=3, decimal_places=1, verbose_name='درجه هتل')
    amenities = models.TextField(default='[]', verbose_name='امکانات')
    image = models.ImageField(upload_to='hotels/', null=True, blank=True, verbose_name='تصویر')
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='قیمت هر شب')
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='hotels', verbose_name='مقصد')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ بروزرسانی')

    def __str__(self):
        return self.name

    def get_amenities(self):
        try:
            return json.loads(self.amenities)
        except:
            return []

    def set_amenities(self, amenities_list):
        self.amenities = json.dumps(amenities_list)

    class Meta:
        verbose_name = 'هتل'
        verbose_name_plural = 'هتل‌ها'
        ordering = ['-rating']

class Tour(models.Model):
    TOUR_TYPES = [
        ('cultural', 'Cultural'),
        ('adventure', 'Adventure'),
        ('nature', 'Nature'),
        ('historical', 'Historical'),
        ('beach', 'Beach'),
        ('luxury', 'Luxury'),
    ]

    SEASONS = [
        ('spring', 'Spring'),
        ('summer', 'Summer'),
        ('fall', 'Fall'),
        ('winter', 'Winter'),
        ('all', 'All Seasons'),
    ]

    title = models.CharField(max_length=200, verbose_name='عنوان تور')
    description = models.TextField(verbose_name='توضیحات')
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='tours', verbose_name='مقصد')
    duration = models.IntegerField(help_text='Duration in days', verbose_name='مدت زمان')
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='قیمت')
    type = models.CharField(max_length=20, choices=TOUR_TYPES, verbose_name='نوع تور')
    season = models.CharField(max_length=10, choices=SEASONS, verbose_name='فصل')
    rating = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],
        default=0.0,
        verbose_name='امتیاز'
    )
    included_services = models.TextField(default='[]', verbose_name='خدمات شامل شده')
    excluded_services = models.TextField(default='[]', verbose_name='خدمات شامل نشده')
    itinerary = models.TextField(blank=True, verbose_name='برنامه سفر')
    hotels = models.ManyToManyField(Hotel, related_name='tours', verbose_name='هتل‌های پیشنهادی')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ بروزرسانی')

    def __str__(self):
        return self.title

    def get_included_services(self):
        try:
            return json.loads(self.included_services)
        except:
            return []

    def set_included_services(self, services_list):
        self.included_services = json.dumps(services_list)

    def get_excluded_services(self):
        try:
            return json.loads(self.excluded_services)
        except:
            return []

    def set_excluded_services(self, services_list):
        self.excluded_services = json.dumps(services_list)

    class Meta:
        verbose_name = 'تور'
        verbose_name_plural = 'تورها'
        ordering = ['-created_at']

class TourImage(models.Model):
    tour = models.ForeignKey(Tour, on_delete=models.CASCADE, related_name='images', verbose_name='تور')
    image = models.ImageField(upload_to='tours/', verbose_name='تصویر')
    caption = models.CharField(max_length=200, blank=True, verbose_name='توضیح تصویر')
    is_primary = models.BooleanField(default=False, verbose_name='تصویر اصلی')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')

    def __str__(self):
        return f'Image for {self.tour.title}'

    class Meta:
        verbose_name = 'تصویر تور'
        verbose_name_plural = 'تصاویر تور'
        ordering = ['created_at'] 