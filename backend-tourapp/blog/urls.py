from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, PostViewSet, CommentViewSet

app_name = 'blog'

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'posts', PostViewSet)
router.register(r'posts/(?P<post_slug>[^/.]+)/comments', CommentViewSet, basename='post-comments')

urlpatterns = [
    path('', include(router.urls)),
] 