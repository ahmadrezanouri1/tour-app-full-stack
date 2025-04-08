'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';

type ReservationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

interface Reservation {
  id: number;
  tourId: number;
  tourName: string;
  destination: string;
  startDate: string;
  endDate: string;
  passengers: number;
  totalPrice: number;
  status: ReservationStatus;
  image: string;
}

const mockReservations: Reservation[] = [
  {
    id: 1,
    tourId: 101,
    tourName: 'تور کیش 3 روزه',
    destination: 'کیش',
    startDate: '2024-04-15',
    endDate: '2024-04-18',
    passengers: 2,
    totalPrice: 12500000,
    status: 'confirmed',
    image: '/logo.png',
  },
  {
    id: 2,
    tourId: 102,
    tourName: 'تور استانبول 5 روزه',
    destination: 'استانبول',
    startDate: '2024-05-01',
    endDate: '2024-05-06',
    passengers: 3,
    totalPrice: 45000000,
    status: 'pending',
    image: '/logo.png', 
  },
  // Add more mock reservations as needed
];

const statusColors: Record<ReservationStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

const statusText: Record<ReservationStatus, string> = {
  pending: 'در انتظار تایید',
  confirmed: 'تایید شده',
  completed: 'انجام شده',
  cancelled: 'لغو شده',
};

export default function ReservationsPage() {
  const [filter, setFilter] = useState<ReservationStatus | 'all'>('all');

  const filteredReservations = filter === 'all'
    ? mockReservations
    : mockReservations.filter(res => res.status === filter);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">رزروهای من</h1>
        
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as ReservationStatus | 'all')}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">همه</option>
            <option value="pending">در انتظار تایید</option>
            <option value="confirmed">تایید شده</option>
            <option value="completed">انجام شده</option>
            <option value="cancelled">لغو شده</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {filteredReservations.map((reservation) => (
          <div key={reservation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-48 h-48 md:h-auto">
                <Image
                  src={reservation.image}
                  alt={reservation.tourName}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">
                      {reservation.tourName}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPinIcon className="w-5 h-5" />
                        <span>{reservation.destination}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-5 h-5" />
                        <span>
                          {new Date(reservation.startDate).toLocaleDateString('fa-IR')} تا{' '}
                          {new Date(reservation.endDate).toLocaleDateString('fa-IR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <UsersIcon className="w-5 h-5" />
                        <span>{reservation.passengers} نفر</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${statusColors[reservation.status]}`}>
                    {statusText[reservation.status]}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-gray-600">مبلغ کل:</span>
                    <span className="text-lg font-bold mr-2">
                      {reservation.totalPrice.toLocaleString()} تومان
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      href={`/tours/${reservation.tourId}`}
                      className="px-4 py-2 text-primary hover:text-primary-dark"
                    >
                      مشاهده تور
                    </Link>
                    <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                      جزئیات رزرو
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredReservations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">هیچ رزروی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
} 