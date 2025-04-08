'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CameraIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'رایان احمدی',
    email: 'rayan@example.com',
    phone: '09123456789',
    nationalId: '0123456789',
    birthDate: '1990-01-01',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">پروفایل کاربری</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Profile"
                width={96}
                height={96}
                className="object-cover"
              />
            </div>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle file upload here
                  console.log('Selected file:', file);
                }
              }}
            />
            <button 
              onClick={() => document.getElementById('profile-image')?.click()}
              className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors"
            >
              <CameraIcon className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{formData.fullName}</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span>حساب تایید شده</span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ایمیل
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                شماره موبایل
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                کد ملی
              </label>
              <input
                type="text"
                name="nationalId"
                value={formData.nationalId}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تاریخ تولد
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    [name]: value
                  }));
                }}
                disabled={!isEditing}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    // Reset form data to initial values when canceling
                    setFormData({
                      fullName: 'رایان احمدی',
                      email: 'rayan@example.com',
                      phone: '09123456789',
                      nationalId: '0123456789',
                      birthDate: '1990-01-01',
                    });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  ذخیره تغییرات
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                ویرایش اطلاعات
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">تورهای رزرو شده</h3>
          <p className="text-3xl font-bold text-primary">12</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">تورهای مورد علاقه</h3>
          <p className="text-3xl font-bold text-primary">8</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">امتیاز کاربری</h3>
          <p className="text-3xl font-bold text-primary">850</p>
        </div>
      </div>
    </div>
  );
} 