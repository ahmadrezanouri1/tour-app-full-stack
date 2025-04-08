'use client'

// import { FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <section className="py-12 bg-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-dark mb-4">تماس با مسافر</h1>
            <p className="text-gray-600">
              لطفا قبل از ارسال ایمیل یا تماس تلفنی، ابتدا پرسش های متداول را مشاهده کنید. در صورتی که پاسخ سوالات خود را در بخش سوالات متداول نیافتید، این افتخار را داریم تا در هر ساعتی از شبانه روز و تمامی روزهای هفته پاسخگوی شما باشیم.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Support Card */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-bold text-dark mb-6">راه‌های ارتباطی با مسافر</h2>
              
              {/* Phone Support */}
              <div className="mb-6">
                <h3 className="font-bold mb-2">تلفن تماس</h3>
                <div className="flex items-center text-lg">
                  {/* <FaPhone className="text-primary ml-2" /> */}
                  <a href="tel:02143000000" className="text-gray-600 hover:text-primary">۰۲۱-۴۳۰۰۰۰۰۰</a>
                </div>
              </div>

              {/* Email Support */}
              <div className="mb-6">
                <h3 className="font-bold mb-2">ایمیل</h3>
                <div className="flex items-center">
                  {/* <FaEnvelope className="text-primary ml-2" /> */}
                  <a href="mailto:support@flytoday.ir" className="text-gray-600 hover:text-primary">support@mosafer.ir</a> 
                </div>
              </div>

              {/* Office Address */}
              <div>
                <h3 className="font-bold mb-2">دفتر مرکزی</h3>
                <div className="flex items-start">
                  {/* <FaMapMarker className="text-primary ml-2 mt-1" /> */}
                  <p className="text-gray-600">
                    تهران، خیابان بهشتی، خیابان خالد اسلامبولی، کوچه برادران شاداب، پلاک چهارم
                  </p>
                </div>
              </div>
            </div>

            {/* Support Request Card */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-xl font-bold text-dark mb-6">درخواست پشتیبانی</h2>
              <p className="text-gray-600 mb-6">
                در صورتی که سوالی دارید یا با مشکلی مواجه شده‌اید، با ایجاد درخواست پشتیبانی در کوتاه‌ترین زمان ممکن، آن را پیگیری خواهیم کرد.
              </p>
              <button className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors">
                ایجاد درخواست جدید
              </button>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-dark mb-2">عضویت در خبرنامه</h2>
              <p className="text-gray-600">روزانه از ۵ صفحه از پیشنهادهای ویژه ما خبردار شوید</p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="آدرس ایمیل"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
                ثبت ایمیل
              </button>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <div className="flex items-center">
              <span className="text-gray-600">تلفن پشتیبانی:</span>
              <a href="tel:02143000000" className="text-primary mr-2">۰۲۱-۴۳۰۰۰۰۰۰</a>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">ایمیل پشتیبانی:</span>
              <a href="mailto:support@flytoday.ir" className="text-primary mr-2">support@flytoday.ir</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 