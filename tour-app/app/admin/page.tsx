'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { tourAPI } from '@/lib/api';
import {
  GlobeAltIcon,
  MapPinIcon,
  NewspaperIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

interface Stats {
  tours: number;
  destinations: number;
  blogPosts: number;
  bookings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    tours: 0,
    destinations: 0,
    blogPosts: 0,
    bookings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [tours, destinations, blogPosts] = await Promise.all([
        tourAPI.getAllTours(),
        tourAPI.getAllDestinations(),
        tourAPI.getAllBlogPosts(),
      ]);

      setStats({
        tours: Array.isArray(tours) ? tours.length : 0,
        destinations: Array.isArray(destinations) ? destinations.length : 0,
        blogPosts: Array.isArray(blogPosts) ? blogPosts.length : 0,
        bookings: 0, // You can add this when implementing bookings
      });
    } catch (error) {
      console.error('Error loading stats:', error);
      setError('خطا در بارگذاری آمار');
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    {
      name: 'تورها',
      href: '/admin/tours',
      icon: GlobeAltIcon,
      count: stats.tours,
      color: 'bg-primary',
    },
    {
      name: 'مقصدها',
      href: '/admin/destinations',
      icon: MapPinIcon,
      count: stats.destinations,
      color: 'bg-primary-dark',
    },
    {
      name: 'وبلاگ',
      href: '/admin/blog',
      icon: NewspaperIcon,
      count: stats.blogPosts,
      color: 'bg-primary-darker',
    },
    {
      name: 'رزروها',
      href: '/admin/bookings',
      icon: UsersIcon,
      count: stats.bookings,
      color: 'bg-dark',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg inline-block">
          <p>{error}</p>
          <button
            onClick={loadStats}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-6">پنل مدیریت</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              className="block group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
                <div className={`${action.color} p-4`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{action.name}</h3>
                  <p className="text-3xl font-bold text-gray-900">
                    {action.count.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">دسترسی سریع</h2>
          <div className="space-y-4">
            <Link
              href="/admin/tours/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <GlobeAltIcon className="w-6 h-6 text-primary" />
              <span>افزودن تور جدید</span>
            </Link>
            <Link
              href="/admin/destinations/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MapPinIcon className="w-6 h-6 text-primary-dark" />
              <span>افزودن مقصد جدید</span>
            </Link>
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <NewspaperIcon className="w-6 h-6 text-primary-darker" />
              <span>نوشتن مقاله جدید</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">راهنمای سریع</h2>
          <div className="space-y-4 text-gray-600">
            <p>• برای مدیریت تورها به بخش «تورها» مراجعه کنید</p>
            <p>• قبل از ایجاد تور جدید، مقصد مورد نظر را در بخش «مقصدها» ثبت کنید</p>
            <p>• برای مدیریت محتوای وبلاگ به بخش «وبلاگ» مراجعه کنید</p>
            <p>• تمامی تصاویر آپلود شده باید با فرمت JPG یا PNG باشند</p>
          </div>
        </div>
      </div>
    </div>
  );
} 