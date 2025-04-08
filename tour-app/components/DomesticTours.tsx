'use client'

import { useState } from 'react';
import Image from 'next/image';

// Sample data for domestic tours
const domesticTours = [
  {
    id: 1,
    title: 'تور کیش',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۱۵,۰۰۰,۰۰۰',
    location: 'جزیره کیش',
    season: 'بهار',
    type: 'ساحلی',
    rating: 4.5,
    departure: '۱۴۰۴/۰۱/۱۵',
    return: '۱۴۰۴/۰۱/۱۸'
  },
  {
    id: 2,
    title: 'تور مشهد',
    image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    duration: '۴ شب و ۵ روز',
    price: '۱۲,۰۰۰,۰۰۰',
    location: 'مشهد',
    season: 'بهار',
    type: 'مذهبی',
    rating: 4.8,
    departure: '۱۴۰۴/۰۱/۲۰',
    return: '۱۴۰۴/۰۱/۲۴'
  },
  {
    id: 3,
    title: 'تور شیراز',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۱۰,۰۰۰,۰۰۰',
    location: 'شیراز',
    season: 'بهار',
    type: 'تاریخی',
    rating: 4.7,
    departure: '۱۴۰۴/۰۱/۲۵',
    return: '۱۴۰۴/۰۱/۲۸'
  },
  {
    id: 4,
    title: 'تور اصفهان',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۸,۵۰۰,۰۰۰',
    location: 'اصفهان',
    season: 'تابستان',
    type: 'تاریخی',
    rating: 4.9,
    departure: '۱۴۰۴/۰۴/۱۰',
    return: '۱۴۰۴/۰۴/۱۲'
  },
  {
    id: 5,
    title: 'تور قشم',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۴ شب و ۵ روز',
    price: '۱۴,۰۰۰,۰۰۰',
    location: 'قشم',
    season: 'تابستان',
    type: 'ساحلی',
    rating: 4.6,
    departure: '۱۴۰۴/۰۵/۱۵',
    return: '۱۴۰۴/۰۵/۱۹'
  },
  {
    id: 6,
    title: 'تور یزد',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۹,۵۰۰,۰۰۰',
    location: 'یزد',
    season: 'پاییز',
    type: 'تاریخی',
    rating: 4.7,
    departure: '۱۴۰۴/۰۷/۰۵',
    return: '۱۴۰۴/۰۷/۰۸'
  },
  {
    id: 7,
    title: 'تور تبریز',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۱۱,۰۰۰,۰۰۰',
    location: 'تبریز',
    season: 'پاییز',
    type: 'تاریخی',
    rating: 4.5,
    departure: '۱۴۰۴/۰۷/۲۰',
    return: '۱۴۰۴/۰۷/۲۳'
  },
  {
    id: 8,
    title: 'تور رامسر',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۷,۵۰۰,۰۰۰',
    location: 'رامسر',
    season: 'تابستان',
    type: 'طبیعت گردی',
    rating: 4.4,
    departure: '۱۴۰۴/۰۶/۱۰',
    return: '۱۴۰۴/۰۶/۱۲'
  },
  {
    id: 9,
    title: 'تور کاشان',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۶,۵۰۰,۰۰۰',
    location: 'کاشان',
    season: 'بهار',
    type: 'تاریخی',
    rating: 4.3,
    departure: '۱۴۰۴/۰۲/۱۵',
    return: '۱۴۰۴/۰۲/۱۷'
  },
  {
    id: 10,
    title: 'تور چابهار',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۴ شب و ۵ روز',
    price: '۱۶,۰۰۰,۰۰۰',
    location: 'چابهار',
    season: 'زمستان',
    type: 'ساحلی',
    rating: 4.6,
    departure: '۱۴۰۴/۱۰/۰۵',
    return: '۱۴۰۴/۱۰/۰۹'
  },
  {
    id: 11,
    title: 'تور همدان',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۷,۰۰۰,۰۰۰',
    location: 'همدان',
    season: 'بهار',
    type: 'تاریخی',
    rating: 4.4,
    departure: '۱۴۰۴/۰۲/۲۰',
    return: '۱۴۰۴/۰۲/۲۲'
  },
  {
    id: 12,
    title: 'تور ارومیه',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۱۰,۵۰۰,۰۰۰',
    location: 'ارومیه',
    season: 'تابستان',
    type: 'طبیعت گردی',
    rating: 4.5,
    departure: '۱۴۰۴/۰۵/۲۵',
    return: '۱۴۰۴/۰۵/۲۸'
  },
  {
    id: 13,
    title: 'تور کرمان',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۹,۰۰۰,۰۰۰',
    location: 'کرمان',
    season: 'پاییز',
    type: 'تاریخی',
    rating: 4.3,
    departure: '۱۴۰۴/۰۷/۱۵',
    return: '۱۴۰۴/۰۷/۱۸'
  },
  {
    id: 14,
    title: 'تور بندرعباس',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۱۳,۰۰۰,۰۰۰',
    location: 'بندرعباس',
    season: 'زمستان',
    type: 'ساحلی',
    rating: 4.5,
    departure: '۱۴۰۴/۱۰/۲۰',
    return: '۱۴۰۴/۱۰/۲۳'
  },
  {
    id: 15,
    title: 'تور کرمانشاه',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۸,۰۰۰,۰۰۰',
    location: 'کرمانشاه',
    season: 'بهار',
    type: 'تاریخی',
    rating: 4.4,
    departure: '۱۴۰۴/۰۲/۰۵',
    return: '۱۴۰۴/۰۲/۰۷'
  },
  {
    id: 16,
    title: 'تور زنجان',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۷,۵۰۰,۰۰۰',
    location: 'زنجان',
    season: 'تابستان',
    type: 'تاریخی',
    rating: 4.2,
    departure: '۱۴۰۴/۰۶/۱۵',
    return: '۱۴۰۴/۰۶/۱۷'
  },
  {
    id: 17,
    title: 'تور سمنان',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۶,۵۰۰,۰۰۰',
    location: 'سمنان',
    season: 'پاییز',
    type: 'طبیعت گردی',
    rating: 4.3,
    departure: '۱۴۰۴/۰۷/۲۵',
    return: '۱۴۰۴/۰۷/۲۷'
  },
  {
    id: 18,
    title: 'تور گرگان',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۹,۵۰۰,۰۰۰',
    location: 'گرگان',
    season: 'بهار',
    type: 'طبیعت گردی',
    rating: 4.6,
    departure: '۱۴۰۴/۰۲/۱۰',
    return: '۱۴۰۴/۰۲/۱۳'
  },
  {
    id: 19,
    title: 'تور بوشهر',
    image: 'https://images.unsplash.com/photo-1583422409516-2899a4c0c0e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    duration: '۳ شب و ۴ روز',
    price: '۱۲,۵۰۰,۰۰۰',
    location: 'بوشهر',
    season: 'زمستان',
    type: 'ساحلی',
    rating: 4.5,
    departure: '۱۴۰۴/۱۰/۱۵',
    return: '۱۴۰۴/۱۰/۱۸'
  },
  {
    id: 20,
    title: 'تور اراک',
    image: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1494&q=80',
    duration: '۲ شب و ۳ روز',
    price: '۷,۰۰۰,۰۰۰',
    location: 'اراک',
    season: 'پاییز',
    type: 'تاریخی',
    rating: 4.3,
    departure: '۱۴۰۴/۰۷/۱۰',
    return: '۱۴۰۴/۰۷/۱۲'
  }
];

// Filter options
const seasons = ['بهار', 'تابستان', 'پاییز', 'زمستان'];
const types = ['ساحلی', 'مذهبی', 'تاریخی', 'طبیعت گردی'];
const locations = [
  'جزیره کیش',
  'مشهد',
  'شیراز',
  'اصفهان',
  'تهران',
  'قشم',
  'یزد',
  'تبریز',
  'رامسر',
  'کاشان',
  'چابهار',
  'همدان',
  'ارومیه',
  'کرمان',
  'بندرعباس',
  'کرمانشاه',
  'زنجان',
  'سمنان',
  'گرگان',
  'بوشهر',
  'اراک'
];

export default function DomesticTours() {
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000000]);

  // Filter tours based on selected criteria
  const filteredTours = domesticTours

  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark text-center mb-8">تورهای داخلی</h1>
        
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