'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to play video when component mounts
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (err) {
          console.log("Video autoplay failed:", err);
        }
      };
      playVideo();
    }
  }, []);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/farm-aerial.jpg"
        >
          <source src="/videos/about-us.mp4" type="video/mp4" />
          <source src="/videos/about-us.webm" type="video/webm" />
          {/* Fallback image */}
          <Image
            src="/images/farm-aerial.jpg"
            alt="مزرعه گردشگری"
            fill
            className="object-cover"
            priority
          />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">مزرعه اکوتوریستی</h1>
          <p className="text-gray-600 max-w-3xl mx-auto leading-7">
            این مزرعه به عنوان مجموعه طبیعت گردی و فضایی مناسب برای گذران اوقات فراغت و تفریح و سرگرمی با خانواده و دوستان طراحی شده است که با چشم اندازی زیبا به طبیعت اطراف خود می نگرد.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="text-center p-6 rounded-lg border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">رزرو ۵ میلیون هتل</h3>
            <p className="text-gray-600 leading-6">
              با بیش از ۵ میلیون هتل در سراسر جهان، ما بهترین قیمت‌ها را برای اقامت شما تضمین می‌کنیم. از هتل‌های لوکس گرفته تا اقامتگاه‌های اقتصادی، همه را می‌توانید در سایت ما پیدا کنید.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 rounded-lg border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">پوشش ۱۲۰ مقصد هوایی</h3>
            <p className="text-gray-600 leading-6">
              با پوشش بیش از ۱۲۰ مقصد پروازی در سراسر دنیا، ما بهترین گزینه‌های سفر هوایی را برای شما فراهم می‌کنیم. از پروازهای داخلی تا بین‌المللی، همه را می‌توانید با بهترین قیمت رزرو کنید.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 rounded-lg border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">برنامه گسترده به بهترین اکوسیستم سفر</h3>
            <p className="text-gray-600 leading-6">
              ما با ارائه خدمات گسترده و متنوع در حوزه گردشگری، بهترین تجربه سفر را برای شما فراهم می‌کنیم. از برنامه‌ریزی سفر تا اجرای آن، در کنار شما هستیم.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="text-center p-6 rounded-lg border border-gray-100">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">تضمین جهانی مسافرت اکو ایرانی</h3>
            <p className="text-gray-600 leading-6">
              ما با همکاری با بهترین شرکای گردشگری در سراسر جهان، امنیت و کیفیت سفر شما را تضمین می‌کنیم. اعتماد مسافران ما، بزرگترین سرمایه ماست.
            </p>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">تاریخچه شرکت</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute h-full w-0.5 bg-gray-200 left-1/2 transform -translate-x-1/2"></div>
            
            {/* Timeline Items */}
            <div className="flex flex-col gap-8">
              <div className="flex justify-end md:justify-center items-center relative">
                <div className="w-full md:w-1/2 md:pr-8 text-right">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold">آذر ۱۳۹۵</h3>
                    <p className="text-gray-600">شروع فعالیت</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
              </div>

              <div className="flex justify-start md:justify-center items-center relative">
                <div className="w-full md:w-1/2 md:pl-8 text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold">آبان ۱۳۹۹</h3>
                    <p className="text-gray-600">توسعه خدمات گردشگری</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
              </div>

              <div className="flex justify-end md:justify-center items-center relative">
                <div className="w-full md:w-1/2 md:pr-8 text-right">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold">مهر ۱۳۹۹</h3>
                    <p className="text-gray-600">گسترش فعالیت‌های بین‌المللی</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
              </div>

              <div className="flex justify-start md:justify-center items-center relative">
                <div className="w-full md:w-1/2 md:pl-8 text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold">اردیبهشت ۱۳۹۹</h3>
                    <p className="text-gray-600">راه‌اندازی اپلیکیشن موبایل</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
              </div>

              <div className="flex justify-end md:justify-center items-center relative">
                <div className="w-full md:w-1/2 md:pr-8 text-right">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold">آذر ۱۳۹۸</h3>
                    <p className="text-gray-600">افتتاح دفتر مرکزی</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
              </div>

              <div className="flex justify-start md:justify-center items-center relative">
                <div className="w-full md:w-1/2 md:pl-8 text-left">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="font-bold">آذر ۱۳۹۶</h3>
                    <p className="text-gray-600">شروع فعالیت</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Info */}
        <div className="bg-gray-50 p-8 rounded-lg mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">راهنمای سازمانی</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto leading-7 mb-6">
            ما به عنوان یک شرکت پیشرو در صنعت گردشگری، همواره تلاش می‌کنیم تا بهترین خدمات را به مشتریان خود ارائه دهیم. تیم ما متشکل از متخصصان با تجربه در حوزه گردشگری است که با تعهد به کیفیت و نوآوری، به دنبال ارتقای سطح خدمات گردشگری هستند.
          </p>
          <div className="text-center">
            <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              تماس با تیم پشتیبانی
            </button>
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-gray-900 text-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-8">شرکت اکوتوریسم</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto leading-7">
            اکوتوریسم یک شرکت پیشرو در زمینه گردشگری پایدار است که با هدف حفظ محیط زیست و توسعه گردشگری مسئولانه فعالیت می‌کند. ما با ارائه خدمات با کیفیت و احترام به طبیعت، به دنبال ایجاد تجربه‌ای منحصر به فرد برای مسافران هستیم.
          </p>
        </div>

        {/* Services Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image src="/icons/airplane.svg" alt="هواپیما" width={64} height={64} />
            </div>
            <p className="text-sm text-gray-600">بلیط هواپیما با بهترین قیمت و امکان استرداد و تغییر</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image src="/icons/hotel.svg" alt="هتل" width={64} height={64} />
            </div>
            <p className="text-sm text-gray-600">رزرو آنلاین هتل‌های داخلی و خارجی با تضمین بهترین قیمت</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image src="/icons/visa.svg" alt="ویزا" width={64} height={64} />
            </div>
            <p className="text-sm text-gray-600">خدمات ویزا با پشتیبانی ۲۴ ساعته و ضمانت اخذ ویزا</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image src="/icons/tour.svg" alt="تور" width={64} height={64} />
            </div>
            <p className="text-sm text-gray-600">تورهای داخلی و خارجی با برنامه‌های متنوع و جذاب</p>
          </div>
        </div>
      </div>
    </main>
  );
} 