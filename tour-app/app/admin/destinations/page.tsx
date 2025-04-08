'use client';

import { useState, useEffect } from 'react';
import { adminAPI, tourAPI, Destination } from '@/lib/api';
import ImageUpload from '@/components/ImageUpload';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

interface DestinationFormData {
  name: string;
  country: string;
  description: string;
  type: 'city' | 'region';
  image: File | null;
  attractions: string;
  climate: string;
  latitude?: string;
  longitude?: string;
}

export default function DestinationsAdmin() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [formData, setFormData] = useState<DestinationFormData>({
    name: '',
    country: '',
    description: '',
    type: 'city',
    image: null,
    attractions: '',
    climate: '',
    latitude: '',
    longitude: ''
  });
  const [previewImage, setPreviewImage] = useState<string>('');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await adminAPI.getAllDestinations();
      
      if (!Array.isArray(data)) {
        console.error('Expected array of destinations, got:', data);
        setError('خطا در دریافت اطلاعات مقصدها');
        setDestinations([]);
      } else {
        setDestinations(data);
      }
    } catch (error) {
      console.error('Error loading destinations:', error);
      setError('خطا در دریافت اطلاعات مقصدها');
      setDestinations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submitData = new FormData();
      
      // Add all form fields except image
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && key !== 'image') {
          submitData.append(key, value.toString());
        }
      });

      // Add image only if it's a new file
      if (formData.image instanceof File) {
        submitData.append('image', formData.image);
      }

      if (selectedDestination) {
        await adminAPI.updateDestination(selectedDestination.id, submitData);
      } else {
        await adminAPI.createDestination(submitData);
      }
      resetForm();
      loadDestinations();
    } catch (error) {
      console.error('Error saving destination:', error);
      setError('خطا در ذخیره اطلاعات مقصد');
    }
  };

  const handleEdit = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsEditing(true);
    setFormData({
      name: destination.name,
      country: destination.country,
      description: destination.description,
      type: destination.type,
      image: null,
      attractions: destination.attractions,
      climate: destination.climate,
      latitude: destination.latitude || '',
      longitude: destination.longitude || ''
    });
    setPreviewImage(destination.image);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا از حذف این مقصد مطمئن هستید؟')) {
      try {
        await adminAPI.deleteDestination(id);
        loadDestinations();
      } catch (error) {
        console.error('Error deleting destination:', error);
        setError('خطا در حذف مقصد');
      }
    }
  };

  const resetForm = () => {
    setSelectedDestination(null);
    setIsEditing(false);
    setFormData({
      name: '',
      country: '',
      description: '',
      type: 'city',
      image: null,
      attractions: '',
      climate: '',
      latitude: '',
      longitude: ''
    });
    setPreviewImage('');
    setError(null);
  };

  const handleImageChange = (file: File) => {
    setFormData(prev => ({
      ...prev,
      image: file
    }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm hover:underline"
          >
            بستن
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت مقصدها</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>افزودن مقصد جدید</span>
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام مقصد</label>
              <input
                type="text"
                name="name"
                defaultValue={selectedDestination?.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">کشور</label>
              <input
                type="text"
                name="country"
                defaultValue={selectedDestination?.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع مقصد</label>
              <select
                name="type"
                defaultValue={selectedDestination?.type || 'city'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              >
                <option value="city">شهر</option>
                <option value="region">منطقه</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
              <textarea
                name="description"
                defaultValue={selectedDestination?.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                rows={4}
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">جاذبه‌ها</label>
              <textarea
                name="attractions"
                defaultValue={selectedDestination?.attractions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                rows={2}
                placeholder="جاذبه‌ها را با کاما از هم جدا کنید"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">آب و هوا</label>
              <textarea
                name="climate"
                defaultValue={selectedDestination?.climate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                rows={2}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">عرض جغرافیایی</label>
              <input
                type="number"
                name="latitude"
                step="any"
                defaultValue={selectedDestination?.latitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">طول جغرافیایی</label>
              <input
                type="number"
                name="longitude"
                step="any"
                defaultValue={selectedDestination?.longitude}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="md:col-span-2">
              <ImageUpload
                onChange={handleImageChange}
                preview={previewImage}
                label="تصویر مقصد"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {selectedDestination ? 'بروزرسانی' : 'ذخیره'}
            </button>
          </div>
        </form>
      )}

      {destinations.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-4">هیچ مقصدی یافت نشد</p>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>افزودن اولین مقصد</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <div key={destination.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={destination.image || '/placeholder-destination.jpg'}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{destination.type === 'city' ? destination.name : destination.country}</p>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{destination.description}</p>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(destination)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(destination.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 