'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  MapPinIcon,
  GlobeAltIcon,
  NewspaperIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { adminAPI } from '@/lib/api';

const navigation = [
  {
    name: 'تورها',
    href: '/admin/tours',
    icon: GlobeAltIcon,
  },
  {
    name: 'مقصدها',
    href: '/admin/destinations',
    icon: MapPinIcon,
  },
  {
    name: 'وبلاگ',
    href: '/admin/blog',
    icon: NewspaperIcon,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await adminAPI.logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-bold text-primary">
                پنل مدیریت
              </Link>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-primary/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>خروج</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
} 