'use client'

import Image from 'next/image';
import { useState } from 'react';

const hotelOptions = [
  {
    id: 1,
    name: 'هتل گرند پارک لارا',
    rating: 5,
    mainImage: '/hotel1.jpg',
    images: [
      { src: '/hotel1.jpg', alt: 'اتاق هتل گرند پارک' },
      { src: '/hotel1.jpg', alt: 'استخر هتل گرند پارک' },
      { src: '/hotel1.jpg', alt: 'رستوران هتل گرند پارک' }
    ],
    price: '۱۵,۰۰۰,۰۰۰',
    nights: '۴ شب',
    type: 'اتاق استاندارد'
  },
  {
    id: 2,
    name: 'هتل رویال هالیدی پالاس',
    rating: 5,
    mainImage: '/hotel2.jpg',
    images: [
      { src: '/hotel2.jpg', alt: 'اتاق هتل رویال' },
      { src: '/hotel2.jpg', alt: 'استخر هتل رویال' },
      { src: '/hotel2.jpg', alt: 'رستوران هتل رویال' }
    ],
    price: '۱۸,۵۰۰,۰۰۰',
    nights: '۴ شب',
    type: 'اتاق دلوکس'
  },
  {
    id: 3,
    name: 'هتل تایتانیک بیچ لارا',
    rating: 5,
    mainImage: '/hotel3.jpg',
    images: [
      { src: '/hotel3.jpg', alt: 'اتاق هتل تایتانیک' },
      { src: '/hotel3.jpg', alt: 'استخر هتل تایتانیک' },
      { src: '/hotel3.jpg', alt: 'رستوران هتل تایتانیک' }
    ],
    price: '۲۰,۰۰۰,۰۰۰',
    nights: '۴ شب',
    type: 'اتاق رو به دریا'
  }
];

export default function TourDetail() {
  const [selectedDate, setSelectedDate] = useState('');
  const [passengerCount, setPassengerCount] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Section */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-2 relative h-[400px]">
          <Image
            src="/tour1.jpg"
            alt="تور آنتالیا"
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="grid grid-rows-2 gap-4">
          <div className="relative h-[195px]">
            <Image
              src="/tour2.jpg"
              alt="ساحل آنتالیا"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="relative h-[195px]">
            <Image
              src="/tour3.jpg"
              alt="هتل آنتالیا"
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold mb-4">تور آنتالیا</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <span className="ml-1">📅</span>
                <span>۴ شب و ۵ روز</span>
              </div>
              <div className="flex items-center">
                <span className="ml-1">✈️</span>
                <span>پرواز ترکیش</span>
              </div>
              <div className="flex items-center">
                <span className="ml-1">🏨</span>
                <span>هتل ۵ ستاره</span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              آنتالیا یکی از محبوب‌ترین مقاصد گردشگری ترکیه است که با سواحل زیبا، هتل‌های لوکس و جاذبه‌های تاریخی خود، هر ساله میزبان گردشگران زیادی از سراسر دنیاست.
            </p>
          </div>

          {/* Hotel Options */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-6">انتخاب هتل</h2>
            <div className="space-y-6">
              {hotelOptions.map((hotel) => (
                <div key={hotel.id} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                  <div className="flex flex-col gap-2">
                    <div className="relative w-full md:w-[280px] h-[200px] md:h-[180px]">
                      <Image
                        src={hotel.mainImage}
                        alt={hotel.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {hotel.images.map((image, index) => (
                        <div key={index} className="relative w-[80px] h-[60px] flex-shrink-0">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="rounded-md object-cover hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 space-y-3 md:space-y-0">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-2 mb-2">
                      <h3 className="text-lg font-bold">{hotel.name}</h3>
                      <div className="flex">
                        {[...Array(hotel.rating)].map((_, i) => (
                          <span key={i} className="text-yellow-400">⭐</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-2">{hotel.type}</p>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
                      <span className="text-gray-600">{hotel.nights}</span>
                      <div className="text-right md:text-left w-full md:w-auto">
                        <div className="text-sm text-gray-600">شروع قیمت از</div>
                        <div className="text-lg font-bold text-primary">{hotel.price} تومان</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tour Details Sections */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">خدمات تور</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>پرواز رفت و برگشت با ترکیش ایرلاین</li>
                <li>اقامت در هتل ۵ ستاره با صبحانه</li>
                <li>ترانسفر فرودگاهی</li>
                <li>گشت شهری</li>
                <li>بیمه مسافرتی</li>
                <li>راهنمای فارسی زبان</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">برنامه سفر</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">روز اول:</h3>
                  <p className="text-gray-600">ورود به آنتالیا - انتقال به هتل - استراحت و گشت آزاد</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">روز دوم:</h3>
                  <p className="text-gray-600">صرف صبحانه - گشت شهری آنتالیا - بازدید از مناطق تاریخی</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">روز سوم و چهارم:</h3>
                  <p className="text-gray-600">روز آزاد - استفاده از امکانات هتل و ساحل اختصاصی</p>
                </div>
                <div>
                  <h3 className="font-bold mb-2">روز پنجم:</h3>
                  <p className="text-gray-600">تحویل اتاق - انتقال به فرودگاه - بازگشت به ایران</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">رزرو تور</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ حرکت</label>
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">انتخاب تاریخ</option>
                  <option value="1404-01-15">۱۵ فروردین ۱۴۰۴</option>
                  <option value="1404-01-25">۲۵ فروردین ۱۴۰۴</option>
                  <option value="1404-02-05">۵ اردیبهشت ۱۴۰۴</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تعداد مسافر</label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                >
                  <option value="">انتخاب تعداد</option>
                  <option value="1">۱ نفر</option>
                  <option value="2">۲ نفر</option>
                  <option value="3">۳ نفر</option>
                  <option value="4">۴ نفر</option>
                </select>
              </div>
              <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                رزرو آنلاین تور
              </button>
              <div className="text-center text-sm text-gray-600">
                برای اطلاعات بیشتر با شماره
                <a href="tel:02143000000" className="text-primary mx-1">۰۲۱-۴۳۰۰۰۰۰۰</a>
                تماس بگیرید
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 