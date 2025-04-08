'use client';

import { useState, useEffect } from 'react';
import { adminAPI, tourAPI, type BlogPost } from '@/lib/api';
import { api } from '@/lib/api';  // Import the api instance
import ImageUpload from '@/components/ImageUpload';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface BlogPostFormData extends FormData {
  title: string;
  content: string;
  author: number;  // Changed to number for user ID
  category: number;  // Changed to number for category ID
  image: File | null;
  is_published: boolean;
  tags: string;
  slug: string;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [users, setUsers] = useState<{ id: number; username: string; }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string; }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState<BlogPostFormData>(new FormData() as BlogPostFormData);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isSlugManual, setIsSlugManual] = useState(false);

  useEffect(() => {
    loadPosts();
    loadUsers();
    loadCategories();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await adminAPI.getUsers();
      setUsers(response);
    } catch (error) {
      console.error('Error loading users:', error);
      setError('خطا در دریافت لیست کاربران');
    }
  };

  const loadCategories = async () => {
    try {
      const response = await adminAPI.getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('خطا در دریافت لیست دسته‌بندی‌ها');
    }
  };

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await tourAPI.getAllBlogPosts();
      
      if (!Array.isArray(data)) {
        console.error('Blog posts data is not an array:', data);
        setPosts([]);
        setError('خطا در دریافت اطلاعات مقالات');
      } else {
        setPosts(data);
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      setError('خطا در ارتباط با سرور');
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      
      // Get form values
      const title = formData.get('title')?.toString() || '';
      const content = formData.get('content')?.toString() || '';
      const author = formData.get('author')?.toString() || '';
      const category = formData.get('category')?.toString() || '';
      const tags = formData.get('tags')?.toString() || '';
      const is_published = formData.get('is_published') === 'true';
      
      // Handle slug
      let slug = formData.get('slug')?.toString() || '';
      if (!isSlugManual) {
        slug = generateSlug(title);
      }
      
      // Add all form fields
      submitData.append('title', title);
      submitData.append('content', content);
      
      // Convert author and category to integers
      if (author) {
        submitData.append('author', parseInt(author, 10).toString());
      }
      
      if (category) {
        submitData.append('category', parseInt(category, 10).toString());
      } else {
        // If no category is selected, send null
        submitData.append('category', '');
      }
      
      submitData.append('tags', tags);
      submitData.append('slug', slug);
      submitData.append('is_published', is_published.toString());

      // Handle image
      const image = formData.get('image');
      if (image instanceof File) {
        submitData.append('image', image);
      }
      
      if (selectedPost) {
        await adminAPI.updateBlogPost(selectedPost.id, submitData);
      } else {
        await adminAPI.createBlogPost(submitData);
      }
      resetForm();
      loadPosts();
    } catch (error) {
      console.error('Error saving blog post:', error);
      setError('خطا در ذخیره مقاله');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post);
    setIsEditing(true);
    const newFormData = new FormData();
    
    // Set form fields
    newFormData.set('title', post.title);
    newFormData.set('content', post.content);
    
    // Ensure author and category are set as strings
    if (post.author) {
      newFormData.set('author', post.author.toString());
    }
    
    if (post.category) {
      newFormData.set('category', post.category.toString());
    } else {
      newFormData.set('category', '');
    }
    
    newFormData.set('tags', post.tags || '');
    newFormData.set('slug', post.slug);
    newFormData.set('is_published', post.is_published.toString());
    
    setFormData(newFormData as BlogPostFormData);
    
    // Set image preview if available
    if (post.image) {
      // If the image is a full URL, use it directly
      if (post.image.startsWith('http')) {
        setPreviewImage(post.image);
      } else {
        // Otherwise, construct the full URL
        setPreviewImage(`http://localhost:8000${post.image}`);
      }
    } else {
      setPreviewImage('');
    }
    
    setIsSlugManual(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا از حذف این مقاله مطمئن هستید؟')) {
      try {
        await adminAPI.deleteBlogPost(id);
        loadPosts();
      } catch (error) {
        console.error('Error deleting blog post:', error);
        setError('خطا در حذف مقاله');
      }
    }
  };

  const resetForm = () => {
    setSelectedPost(null);
    setIsEditing(false);
    const newFormData = new FormData();
    newFormData.set('is_published', 'true');
    setFormData(newFormData as BlogPostFormData);
    
    // Clean up any existing image URL
    if (previewImage && previewImage.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }
    
    setPreviewImage('');
    setError(null);
  };

  const handleImageChange = (file: File) => {
    formData.set('image', file);
    
    // Create a URL for the preview
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    
    // Clean up the URL when component unmounts or when a new image is selected
    return () => {
      URL.revokeObjectURL(imageUrl);
    };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      formData.set(name, (e.target as HTMLInputElement).checked.toString());
    } else {
      formData.set(name, value);
      
      // Auto-generate slug from title if not manually edited
      if (name === 'title' && !isSlugManual) {
        formData.set('slug', generateSlug(value));
      }
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formData.set('slug', e.target.value);
    setIsSlugManual(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">مدیریت مقالات</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>افزودن مقاله جدید</span>
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                عنوان
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={formData.get('title')?.toString() || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                نامک (Slug)
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                defaultValue={formData.get('slug')?.toString() || ''}
                onChange={handleSlugChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                نویسنده
              </label>
              <select
                id="author"
                name="author"
                defaultValue={formData.get('author')?.toString() || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              >
                <option value="">انتخاب نویسنده</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                دسته‌بندی
              </label>
              <select
                id="category"
                name="category"
                defaultValue={formData.get('category')?.toString() || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                برچسب‌ها (با کاما جدا کنید)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                defaultValue={formData.get('tags')?.toString() || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="مثال: سفر، طبیعت، گردشگری"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تصویر
              </label>
              <ImageUpload
                preview={previewImage}
                onChange={handleImageChange}
                label="تصویر مقاله"
              />
            </div>
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              محتوا
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={formData.get('content')?.toString() || ''}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_published"
              name="is_published"
              defaultChecked={formData.get('is_published') === 'true'}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="is_published" className="mr-2 block text-sm text-gray-700">
              منتشر شود
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            >
              {selectedPost ? 'بروزرسانی' : 'ذخیره'}
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عنوان
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نویسنده
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  دسته‌بندی
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  تاریخ
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    هیچ مقاله‌ای یافت نشد. برای افزودن مقاله جدید روی دکمه "افزودن مقاله جدید" کلیک کنید.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {post.image && (
                          <div className="flex-shrink-0 h-10 w-10 mr-3">
                            <img className="h-10 w-10 rounded-full object-cover" src={post.image} alt={post.title} />
                          </div>
                        )}
                        <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {users.find(u => u.id === post.author)?.username || post.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {categories.find(c => c.id === post.category)?.name || post.category || 'بدون دسته‌بندی'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(post.created_at).toLocaleDateString('fa-IR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.is_published ? 'منتشر شده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-primary hover:text-primary/80 ml-3"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 