'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Tour, tourAPI } from '@/lib/api';
import {
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  HomeIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/solid';

interface TourDetailPageProps {
  params: {
    id: string;
  };
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadTour();
  }, [params.id]);

  const loadTour = async () => {
    try {
      setLoading(true);
      const data = await tourAPI.getTourById(parseInt(params.id));
      setTour(data);
      if (data.images.length > 0) {
        setSelectedImage(data.images[0].image);
      }
    } catch (error) {
      console.error('Error loading tour:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">تور مورد نظر یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-primary" />
            <span>{tour.destination_details.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-primary" />
            <span>{tour.duration} روز</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span>{tour.season_display}</span>
          </div>
          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span>{tour.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={tour.title}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {tour.images.map((image) => (
            <div
              key={image.id}
              className={`relative h-32 rounded-lg overflow-hidden cursor-pointer ${
                selectedImage === image.image ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelectedImage(image.image)}
            >
              <Image
                src={image.image}
                alt={image.caption || tour.title}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tour Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">توضیحات تور</h2>
            <p className="text-gray-600 whitespace-pre-line">{tour.description}</p>
          </div>

          {/* Itinerary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">برنامه سفر</h2>
            <p className="text-gray-600 whitespace-pre-line">{tour.itinerary}</p>
          </div>

          {/* Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                خدمات شامل شده
              </h2>
              <ul className="space-y-2">
                {tour.included_services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <XCircleIcon className="w-6 h-6 text-red-500" />
                خدمات شامل نشده
              </h2>
              <ul className="space-y-2">
                {tour.excluded_services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <XCircleIcon className="w-5 h-5 text-red-500" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-primary mb-2">
              {tour.price.toLocaleString()} تومان
            </div>
            <p className="text-gray-500 mb-4">قیمت برای هر نفر</p>
            <button className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors">
              رزرو تور
            </button>
          </div>

          {/* Hotels */}
          {tour.hotels.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <HomeIcon className="w-6 h-6 text-primary" />
                هتل‌های پیشنهادی
              </h2>
              <div className="space-y-4">
                {tour.hotels.map(hotel => (
                  <div key={hotel.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>{hotel.rating_display}</span>
                      <span>•</span>
                      <span>{hotel.destination_name}</span>
                    </div>
                    <div className="text-sm text-gray-500">{hotel.address}</div>
                    <div className="mt-2 text-primary font-semibold">
                      {hotel.price_per_night.toLocaleString()} تومان / شب
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 