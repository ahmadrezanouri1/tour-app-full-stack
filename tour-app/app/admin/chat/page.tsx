import type { Metadata } from 'next';
import AdminChat from '@/components/AdminChat';

export const metadata: Metadata = {
  title: 'پنل ادمین | مدیریت گفتگوها',
  description: 'پنل مدیریت گفتگوهای آنلاین با کاربران',
};

export default function AdminChatPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">مدیریت گفتگوها</h1>
          <p className="text-gray-600">
            در این بخش می‌توانید به پیام‌های کاربران پاسخ دهید و گفتگوها را مدیریت کنید.
          </p>
        </div>

        <AdminChat />
      </div>
    </main>
  );
} 