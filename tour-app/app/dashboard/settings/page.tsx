'use client';

import { useState } from 'react';
import { BellIcon, ShieldCheckIcon, GlobeAltIcon, UserIcon } from '@heroicons/react/24/outline';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    offers: false,
    newsletter: true,
  });

  const [preferences, setPreferences] = useState({
    language: 'fa',
    currency: 'IRT',
    theme: 'light',
  });

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">تنظیمات</h1>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheckIcon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">امنیت و حریم خصوصی</h2>
        </div>

        <div className="space-y-4">
          <button className="w-full flex justify-between items-center p-4 border rounded-lg hover:border-primary transition-colors">
            <span className="font-medium">تغییر رمز عبور</span>
            <span className="text-sm text-gray-500">آخرین تغییر: 3 ماه پیش</span>
          </button>

          <button className="w-full flex justify-between items-center p-4 border rounded-lg hover:border-primary transition-colors">
            <span className="font-medium">تایید دو مرحله‌ای</span>
            <span className="text-sm text-green-500">فعال</span>
          </button>

          <button className="w-full flex justify-between items-center p-4 border rounded-lg hover:border-primary transition-colors">
            <span className="font-medium">دستگاه‌های متصل</span>
            <span className="text-sm text-gray-500">2 دستگاه</span>
          </button>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <BellIcon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">تنظیمات اعلان‌ها</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <span className="font-medium">اعلان‌های ایمیلی</span>
              <span className="text-sm text-gray-500">دریافت اطلاعیه‌ها از طریق ایمیل</span>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <span className="font-medium">اعلان‌های پیامکی</span>
              <span className="text-sm text-gray-500">دریافت اطلاعیه‌ها از طریق پیامک</span>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <span className="font-medium">پیشنهادات ویژه</span>
              <span className="text-sm text-gray-500">دریافت تخفیف‌ها و پیشنهادات</span>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.offers}
                onChange={(e) => setNotifications({ ...notifications, offers: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-2 mb-6">
          <GlobeAltIcon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">ترجیحات</h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              زبان
            </label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="fa">فارسی</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              واحد پول
            </label>
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="IRT">تومان</option>
              <option value="USD">دلار</option>
              <option value="EUR">یورو</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تم
            </label>
            <select
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="light">روشن</option>
              <option value="dark">تیره</option>
              <option value="system">سیستم</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
} 