from django.contrib import admin
from django.utils.html import format_html
from .models import Post, Comment, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'post_count', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at',)
    ordering = ('name',)

    def post_count(self, obj):
        return obj.posts.count()
    post_count.short_description = 'Number of Posts'

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'category', 'is_published', 'views', 'created_at', 'image_preview')
    list_filter = ('is_published', 'category', 'created_at')
    search_fields = ('title', 'content', 'author__username', 'category__name')
    readonly_fields = ('created_at', 'updated_at', 'views', 'image_preview')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    list_per_page = 20
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'category', 'content')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
        ('Additional Information', {
            'fields': ('tags', 'is_published', 'views')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" style="object-fit: cover;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Image Preview'

    def save_model(self, request, obj, form, change):
        if not change:  # If creating a new object
            obj.author = request.user
        super().save_model(request, obj, form, change)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'author', 'short_content', 'is_approved', 'created_at', 'parent')
    list_filter = ('is_approved', 'created_at')
    search_fields = ('content', 'author__username', 'post__title')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
    list_per_page = 20

    def short_content(self, obj):
        return obj.content[:100] + '...' if len(obj.content) > 100 else obj.content
    short_content.short_description = 'Content'

    fieldsets = (
        ('Comment Information', {
            'fields': ('post', 'author', 'content', 'parent')
        }),
        ('Moderation', {
            'fields': ('is_approved',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    ) 