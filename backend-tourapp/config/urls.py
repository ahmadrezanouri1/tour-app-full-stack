from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Tour App API",
        default_version='v1',
        description="API documentation for Tour App",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@tourapp.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path('api/tours/', include('tours.urls')),
    path('api/destinations/', include('destinations.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/bookings/', include('bookings.urls')),
    
    # Swagger URLs
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
    # CSRF endpoint
    path('api/csrf/', include('config.csrf_urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 