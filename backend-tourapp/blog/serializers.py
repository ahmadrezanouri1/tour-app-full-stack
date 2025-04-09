from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Category, Post, Comment

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'author', 'content', 'created_at', 'updated_at']
        read_only_fields = ['author', 'created_at', 'updated_at']

class PostListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    comment_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = ['id', 'title', 'slug', 'excerpt', 'image', 'author', 'category', 
                 'status', 'created_at', 'updated_at', 'comment_count']
        read_only_fields = ['author', 'slug', 'created_at', 'updated_at']
    
    def get_comment_count(self, obj):
        return obj.comments.count()

class PostDetailSerializer(PostListSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    
    class Meta(PostListSerializer.Meta):
        fields = PostListSerializer.Meta.fields + ['content', 'comments']

class PostCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['title', 'content', 'excerpt', 'image', 'category', 'status'] 