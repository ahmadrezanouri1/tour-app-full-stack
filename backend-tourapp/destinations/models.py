from django.db import models

class Destination(models.Model):
    DESTINATION_TYPES = [
        ('city', 'شهر'),
        ('region', 'منطقه'),
    ]

    name = models.CharField(max_length=200, verbose_name='نام')
    country = models.CharField(max_length=100, verbose_name='کشور')
    description = models.TextField(verbose_name='توضیحات')
    type = models.CharField(max_length=20, choices=DESTINATION_TYPES, verbose_name='نوع مقصد')
    image = models.ImageField(upload_to='destinations/', verbose_name='تصویر')
    attractions = models.TextField(blank=True, help_text="جاذبه‌ها را با کاما از هم جدا کنید", verbose_name='جاذبه‌ها')
    climate = models.TextField(verbose_name='آب و هوا')
    latitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        verbose_name='عرض جغرافیایی'
    )
    longitude = models.DecimalField(
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
        verbose_name='طول جغرافیایی'
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ بروزرسانی')

    class Meta:
        ordering = ['name']
        unique_together = ['name', 'country']
        verbose_name = 'مقصد'
        verbose_name_plural = 'مقصدها'

    def __str__(self):
        return f"{self.name}, {self.country}"

    def get_attractions_list(self):
        """Returns the attractions as a list"""
        return [attr.strip() for attr in self.attractions.split(',') if attr.strip()]

    def set_attractions_list(self, attractions_list):
        """Sets the attractions from a list"""
        self.attractions = ', '.join(attractions_list) 