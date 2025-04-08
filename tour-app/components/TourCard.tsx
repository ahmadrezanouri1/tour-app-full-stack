import Image from 'next/image';
import Link from 'next/link';
import { Tour } from '@/lib/api';
import { StarIcon, MapPinIcon, ClockIcon, CalendarIcon } from '@heroicons/react/24/solid';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  const featuredImage = tour.images.find(img => img.is_primary)?.image || tour.images[0]?.image;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={tour.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image available</span>
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
          {tour.type_display}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPinIcon className="w-5 h-5 text-primary" />
          <span>{tour.destination_details.name}</span>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <ClockIcon className="w-5 h-5 text-primary" />
            <span>{tour.duration} روز</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            <span>{tour.season_display}</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span>{tour.rating.toFixed(1)}</span>
          </div>
          <div className="text-lg font-bold text-primary">
            {tour.price.toLocaleString()} تومان
          </div>
        </div>

        {tour.hotels.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">هتل‌های پیشنهادی:</h4>
            <div className="flex flex-wrap gap-2">
              {tour.hotels.map(hotel => (
                <span
                  key={hotel.id}
                  className="bg-gray-100 px-2 py-1 rounded-full text-sm"
                  title={`${hotel.name} - ${hotel?.rating_display}`}
                >
                  {hotel.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <Link
          href={`/tours/${tour.id}`}
          className="block w-full text-center bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
        >
          مشاهده جزئیات
        </Link>
      </div>
    </div>
  );
} 