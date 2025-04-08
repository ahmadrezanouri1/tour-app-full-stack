from django.urls import path
from django.middleware.csrf import get_token
from django.http import JsonResponse

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

urlpatterns = [
    path('', csrf, name='csrf'),
] 