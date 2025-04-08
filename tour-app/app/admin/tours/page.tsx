'use client';

import { useState, useEffect } from 'react';
import { adminAPI, tourAPI, type Tour, type Destination, type TourImage } from '@/lib/api';
import ImageUpload from '@/components/ImageUpload';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

const SEASONS = ['بهار', 'تابستان', 'پاییز', 'زمستان'];
const TOUR_TYPES = ['تفریحی', 'فرهنگی', 'ماجراجویی', 'طبیعت‌گردی', 'زیارتی'];

interface TourFormData {
  title: string;
  destination: string;
  type: string;
  season: string;
  duration: number;
  price: number;
  included_services: string;
  excluded_services: string;
  description: string;
  images?: File[];
}

export default function ToursAdmin() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState<TourFormData>({
    title: '',
    destination: '',
    type: '',
    season: '',
    duration: 0,
    price: 0,
    included_services: '',
    excluded_services: '',
    description: '',
    images: []
  });
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const [toursData, destinationsData] = await Promise.all([
        tourAPI.getAllTours(),
        tourAPI.getAllDestinations(),
      ]);

      // Ensure toursData is an array
      if (!Array.isArray(toursData)) {
        console.error('Tours data is not an array:', toursData);
        setTours([]);
        setError('خطا در دریافت اطلاعات تورها');
      } else {
        setTours(toursData);
      }

      // Ensure destinationsData is an array
      if (!Array.isArray(destinationsData)) {
        console.error('Destinations data is not an array:', destinationsData);
        setDestinations([]);
        setError('خطا در دریافت اطلاعات مقصدها');
      } else {
        setDestinations(destinationsData);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      setError('خطا در ارتباط با سرور');
      setTours([]);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataObj = new FormData();
      
      // Add each field from the formData state to the FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'included_services' || key === 'excluded_services') {
          // Convert string to array if it's a comma-separated string
          const services = typeof value === 'string' ? value.split(',').map(s => s.trim()) : value;
          formDataObj.append(key, JSON.stringify(services));
        } else if (key === 'images') {
          // Handle multiple images
          if (Array.isArray(value) && value.length > 0) {
            value.forEach((file: File) => {
              formDataObj.append('images', file);
            });
          }
        } else {
          formDataObj.append(key, value.toString());
        }
      });

      if (selectedTour) {
        await adminAPI.updateTour(selectedTour.id, formDataObj);
        toast.success('تور با موفقیت بروزرسانی شد');
      } else {
        await adminAPI.createTour(formDataObj);
        toast.success('تور با موفقیت ایجاد شد');
      }

      resetForm();
      loadData();
    } catch (err) {
      setError('خطا در ذخیره تور');
      console.error('Error saving tour:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tour: Tour) => {
    setSelectedTour(tour);
    setFormData({
      title: tour.title,
      destination: tour.destination.id.toString(),
      type: tour.type,
      season: tour.season,
      duration: tour.duration,
      price: tour.price,
      included_services: Array.isArray(tour.included_services) 
        ? tour.included_services.join(', ')
        : tour.included_services || '',
      excluded_services: Array.isArray(tour.excluded_services)
        ? tour.excluded_services.join(', ')
        : tour.excluded_services || '',
      description: tour.description,
      images: []
    });
    setPreviewImages(tour.images.map((img: TourImage) => img.image));
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('آیا از حذف این تور مطمئن هستید؟')) {
      try {
        await adminAPI.deleteTour(id);
        loadData();
      } catch (error) {
        console.error('Error deleting tour:', error);
      }
    }
  };

  const resetForm = () => {
    setSelectedTour(null);
    setIsEditing(false);
    setFormData({
      title: '',
      destination: '',
      type: '',
      season: '',
      duration: 0,
      price: 0,
      included_services: '',
      excluded_services: '',
      description: '',
      images: []
    });
    setPreviewImages([]);
  };

  const handleImageChange = (file: File) => {
    // Update the preview images
    setPreviewImages([...previewImages, URL.createObjectURL(file)]);
    
    // Update the formData state with the new file
    setFormData(prev => ({
      ...prev,
      images: prev.images ? [...prev.images, file] : [file]
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
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
            onClick={loadData}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            تلاش مجدد
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت تورها</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>افزودن تور جدید</span>
          </button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">عنوان تور</label>
              <input
                type="text"
                name="title"
                defaultValue={selectedTour?.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مقصد</label>
              <select
                name="destination"
                defaultValue={selectedTour?.destination.id}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              >
                <option value="">انتخاب مقصد</option>
                {destinations.map(dest => (
                  <option key={dest.id} value={dest.id}>
                    {dest.name} - {dest.country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع تور</label>
              <select
                name="type"
                defaultValue={selectedTour?.type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              >
                <option value="">انتخاب نوع تور</option>
                {TOUR_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">فصل</label>
              <select
                name="season"
                defaultValue={selectedTour?.season}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
              >
                <option value="">انتخاب فصل</option>
                {SEASONS.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">مدت تور (روز)</label>
              <input
                type="number"
                name="duration"
                defaultValue={selectedTour?.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">قیمت (تومان)</label>
              <input
                type="number"
                name="price"
                defaultValue={selectedTour?.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                required
                min="0"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
              <textarea
                name="description"
                defaultValue={selectedTour?.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">خدمات شامل شده</label>
              <textarea
                name="included_services"
                defaultValue={selectedTour?.included_services.join('\n')}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                rows={4}
                placeholder="هر خدمت در یک خط"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">خدمات شامل نشده</label>
              <textarea
                name="excluded_services"
                defaultValue={selectedTour?.excluded_services.join('\n')}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                rows={4}
                placeholder="هر خدمت در یک خط"
                required
              />
            </div>

            <div className="md:col-span-2">
              <ImageUpload
                onChange={handleImageChange}
                label="افزودن تصویر"
              />
              {previewImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {previewImages.map((img, index) => (
                    <div key={index} className="relative h-24">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              {selectedTour ? 'ویرایش تور' : 'افزودن تور'}
            </button>
          </div>
        </form>
      )}

      {tours.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-500 mb-4">هیچ توری یافت نشد</p>
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <PlusIcon className="w-5 h-5" />
            <span>افزودن اولین تور</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={tour.images[0]?.image || '/placeholder-tour.jpg'}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{tour.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-600 text-sm">
                    مقصد: {tour.destination.name} | مدت: {tour.duration} روز
                  </p>
                  <p className="text-gray-600 text-sm">
                    نوع: {tour.type} | فصل: {tour.season}
                  </p>
                  <p className="text-primary font-semibold">
                    {tour.price.toLocaleString()} تومان
                  </p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleEdit(tour)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
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