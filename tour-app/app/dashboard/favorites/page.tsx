'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, CalendarIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';

interface FavoriteTour {
  id: number;
  title: string;
  destination: string;
  duration: number;
  startDate: string;
  price: number;
  rating: number;
  image: string;
  isLiked: boolean;
}

const mockFavorites: FavoriteTour[] = [
  {
    id: 1,
    title: 'تور کیش 3 روزه',
    destination: 'کیش',
    duration: 3,
    startDate: '2024-04-15',
    price: 12500000,
    rating: 4.5,
    image: '/logo.png',
    isLiked: true,
  },
  {
    id: 2,
    title: 'تور استانبول 5 روزه',
    destination: 'استانبول',
    duration: 5,
    startDate: '2024-05-01',
    price: 45000000,
    rating: 4.8,
    image: '/logo.png',
    isLiked: true,
  },
  // Add more mock favorites as needed
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const handleRemoveFavorite = (tourId: number) => {
    setFavorites(favorites.filter(tour => tour.id !== tourId));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">تورهای مورد علاقه</h1>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setView('grid')}
              className={`px-4 py-2 rounded-md transition-colors ${
                view === 'grid' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
            >
              شبکه‌ای
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-md transition-colors ${
                view === 'list' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
            >
              لیستی
            </button>
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <HeartIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">هیچ تور مورد علاقه‌ای ندارید</h2>
          <p className="text-gray-500 mb-6">تورهای مورد علاقه خود را با کلیک روی آیکون قلب اضافه کنید</p>
          <Link
            href="/tours"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
          >
            مشاهده تورها
          </Link>
        </div>
      ) : (
        <div className={view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {favorites.map((tour) => (
            <div key={tour.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${
              view === 'list' ? 'flex' : ''
            }`}>
              <div className={`relative ${view === 'list' ? 'w-48' : 'h-48'}`}>
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => handleRemoveFavorite(tour.id)}
                  className="absolute top-2 left-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <HeartIconSolid className="w-5 h-5 text-primary" />
                </button>
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{tour.title}</h2>
                <div className="flex items-center gap-4 text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-5 h-5" />
                    <span>{tour.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{tour.duration} روز</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span>{tour.rating}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-gray-600">شروع از</span>
                    <span className="text-lg font-bold mr-2">
                      {tour.price.toLocaleString()} تومان
                    </span>
                  </div>
                  
                  <Link
                    href={`/tours/${tour.id}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    مشاهده تور
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 