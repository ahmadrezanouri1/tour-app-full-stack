'use client'

import { useState } from 'react';
import Image from 'next/image';

// Sample data for foreign tours
const foreignTours = [
  {
    id: 1,
    title: 'تور استانبول',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    duration: '۵ شب و ۶ روز',
    price: '۲۵,۰۰۰,۰۰۰',
    location: 'ترکیه',
    season: 'بهار',
    type: 'تاریخی',
    rating: 4.8,
    departure: '۱۴۰۴/۰۱/۱۵',
    return: '۱۴۰۴/۰۱/۲۰'
  },
  {
    id: 2,
    title: 'تور دبی',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۴ شب و ۵ روز',
    price: '۳۰,۰۰۰,۰۰۰',
    location: 'امارات',
    season: 'زمستان',
    type: 'تفریحی',
    rating: 4.7,
    departure: '۱۴۰۴/۱۰/۰۵',
    return: '۱۴۰۴/۱۰/۰۹'
  },
  {
    id: 3,
    title: 'تور بانکوک',
    image: 'https://images.unsplash.com/photo-1528181304800-259b4844859f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۶ شب و ۷ روز',
    price: '۲۸,۰۰۰,۰۰۰',
    location: 'تایلند',
    season: 'زمستان',
    type: 'تفریحی',
    rating: 4.6,
    departure: '۱۴۰۴/۱۰/۱۵',
    return: '۱۴۰۴/۱۰/۲۱'
  },
  {
    id: 4,
    title: 'تور مالزی',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۷ شب و ۸ روز',
    price: '۳۵,۰۰۰,۰۰۰',
    location: 'مالزی',
    season: 'زمستان',
    type: 'طبیعت گردی',
    rating: 4.9,
    departure: '۱۴۰۴/۱۰/۲۵',
    return: '۱۴۰۴/۱۱/۰۲'
  },
  {
    id: 5,
    title: 'تور آنتالیا',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۵ شب و ۶ روز',
    price: '۲۲,۰۰۰,۰۰۰',
    location: 'ترکیه',
    season: 'تابستان',
    type: 'ساحلی',
    rating: 4.7,
    departure: '۱۴۰۴/۰۵/۱۰',
    return: '۱۴۰۴/۰۵/۱۵'
  },
  {
    id: 6,
    title: 'تور پاریس',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
    duration: '۶ شب و ۷ روز',
    price: '۴۵,۰۰۰,۰۰۰',
    location: 'فرانسه',
    season: 'بهار',
    type: 'تاریخی',
    rating: 4.9,
    departure: '۱۴۰۴/۰۲/۱۵',
    return: '۱۴۰۴/۰۲/۲۱'
  },
  {
    id: 7,
    title: 'تور رم',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    duration: '۵ شب و ۶ روز',
    price: '۴۲,۰۰۰,۰۰۰',
    location: 'ایتالیا',
    season: 'بهار',
    type: 'تاریخی',
    rating: 4.8,
    departure: '۱۴۰۴/۰۲/۲۵',
    return: '۱۴۰۴/۰۳/۰۱'
  },
  {
    id: 8,
    title: 'تور بالی',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۷ شب و ۸ روز',
    price: '۳۸,۰۰۰,۰۰۰',
    location: 'اندونزی',
    season: 'زمستان',
    type: 'ساحلی',
    rating: 4.9,
    departure: '۱۴۰۴/۱۱/۰۵',
    return: '۱۴۰۴/۱۱/۱۲'
  },
  {
    id: 9,
    title: 'تور سنگاپور',
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۴ شب و ۵ روز',
    price: '۳۲,۰۰۰,۰۰۰',
    location: 'سنگاپور',
    season: 'زمستان',
    type: 'تفریحی',
    rating: 4.8,
    departure: '۱۴۰۴/۱۱/۱۵',
    return: '۱۴۰۴/۱۱/۱۹'
  },
  {
    id: 10,
    title: 'تور کوالالامپور',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۵ شب و ۶ روز',
    price: '۲۸,۰۰۰,۰۰۰',
    location: 'مالزی',
    season: 'زمستان',
    type: 'تفریحی',
    rating: 4.7,
    departure: '۱۴۰۴/۱۱/۲۰',
    return: '۱۴۰۴/۱۱/۲۵'
  }
];

// Filter options
const seasons = ['بهار', 'تابستان', 'پاییز', 'زمستان'];
const types = ['ساحلی', 'تاریخی', 'تفریحی', 'طبیعت گردی'];
const locations = [
  'ترکیه',
  'امارات',
  'تایلند',
  'مالزی',
  'فرانسه',
  'ایتالیا',
  'اندونزی',
  'سنگاپور'
];

export default function DomesticTours() {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000000]);

  // Filter tours based on selected criteria
  const filteredTours = foreignTours

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark text-center mb-8">تورهای خارجی</h1>
        
        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Season Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">فصل سفر</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
              >
                <option value="">همه فصول</option>
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع تور</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">همه انواع</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">مقصد</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">همه مقاصد</option>
                {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                محدوده قیمت: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} تومان
              </label>
              <div className="flex gap-4">
                <input
                  type="range"
                  min="0"
                  max="20000000"
                  step="1000000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min="0"
                  max="20000000"
                  step="1000000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-dark">{tour.title}</h3>
                  <div className="flex items-center">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600 mr-1">{tour.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="ml-2">📍</span>
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-2">⏱️</span>
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="ml-2">📅</span>
                    <span>{tour.departure} تا {tour.return}</span>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="text-primary font-bold">{tour.price} تومان</div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                    مشاهده جزئیات
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredTours.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">هیچ توری با فیلترهای انتخاب شده یافت نشد.</p>
          </div>
        )}
      </div>
    </section>
  );
} 