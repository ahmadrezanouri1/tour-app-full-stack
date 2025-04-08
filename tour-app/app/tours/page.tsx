'use client';

import { useEffect, useState } from 'react';
import { Tour, tourAPI } from '@/lib/api';
import TourCard from '@/components/TourCard';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    season: '',
    minPrice: '',
    maxPrice: '',
    destination: '',
  });

  useEffect(() => {
    loadTours();
  }, [filters]);

  const loadTours = async () => {
    try {
      setLoading(true);
      const params = {
        type: filters.type || undefined,
        season: filters.season || undefined,
        price_gte: filters.minPrice || undefined,
        price_lte: filters.maxPrice || undefined,
        destination: filters.destination || undefined,
      };
      const data = await tourAPI.getAllTours(params);
      setTours(data.results || []);
    } catch (error) {
      console.error('Error loading tours:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">تورهای گردشگری</h1>
        <button
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
          onClick={() => {/* Open filter modal */}}
        >
          <FunnelIcon className="w-5 h-5" />
          فیلترها
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">نوع تور</label>
            <select
              className="w-full border rounded-md p-2"
              value={filters.type}
              onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            >
              <option value="">همه</option>
              <option value="adventure">ماجراجویی</option>
              <option value="cultural">فرهنگی</option>
              <option value="beach">ساحلی</option>
              <option value="wildlife">طبیعت وحش</option>
              <option value="religious">مذهبی</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">فصل</label>
            <select
              className="w-full border rounded-md p-2"
              value={filters.season}
              onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value }))}
            >
              <option value="">همه</option>
              <option value="spring">بهار</option>
              <option value="summer">تابستان</option>
              <option value="autumn">پاییز</option>
              <option value="winter">زمستان</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">حداقل قیمت</label>
            <input
              type="number"
              className="w-full border rounded-md p-2"
              value={filters.minPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
              placeholder="حداقل قیمت"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium mb-1">حداکثر قیمت</label>
            <input
              type="number"
              className="w-full border rounded-md p-2"
              value={filters.maxPrice}
              onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
              placeholder="حداکثر قیمت"
            />
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map(tour => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}

      {!loading && tours.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">هیچ توری یافت نشد</p>
        </div>
      )}
    </div>
  );
} 