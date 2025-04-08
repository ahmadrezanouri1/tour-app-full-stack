import type { Metadata } from 'next';
import Chat from '@/components/Chat';

export const metadata: Metadata = {
  title: 'گفتگو با همسفر | پشتیبانی آنلاین',
  description: 'گفتگوی آنلاین با کارشناسان همسفر برای راهنمایی و پشتیبانی در رزرو تور و سفر',
};

export default function ChatPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">پشتیبانی آنلاین همسفر</h1>
          <p className="text-gray-600">
            کارشناسان ما به صورت آنلاین آماده پاسخگویی به سوالات شما در مورد تورها، رزرواسیون و خدمات گردشگری هستند.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Chat />
          </div>

          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">راه‌های ارتباطی دیگر</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">شماره تماس</h3>
                  <p className="text-primary">۰۲۱-۴۳۰۰۰۰۰۰</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">ایمیل پشتیبانی</h3>
                  <p className="text-primary">support@hamsafar.com</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">ساعات پاسخگویی</h3>
                  <p className="text-gray-600">همه روزه از ساعت ۸ صبح تا ۸ شب</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">سوالات متداول</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">نحوه رزرو تور</h3>
                  <p className="text-gray-600">برای رزرو تور می‌توانید از طریق وبسایت یا تماس با پشتیبانی اقدام نمایید.</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">مدارک مورد نیاز</h3>
                  <p className="text-gray-600">پاسپورت معتبر با حداقل ۶ ماه اعتبار از تاریخ سفر</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-700 mb-1">شرایط کنسلی</h3>
                  <p className="text-gray-600">جزئیات شرایط کنسلی هر تور در صفحه مربوطه درج شده است.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
