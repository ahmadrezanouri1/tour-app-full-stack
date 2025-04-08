'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserIcon,
  CalendarIcon,
  HeartIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const menuItems = [
  {
    title: 'پروفایل',
    icon: UserIcon,
    href: '/dashboard',
  },
  {
    title: 'رزرو‌های من',
    icon: CalendarIcon,
    href: '/dashboard/reservations',
  },
  {
    title: 'علاقه‌مندی‌ها',
    icon: HeartIcon,
    href: '/dashboard/favorites',
  },
  {
    title: 'تنظیمات',
    icon: Cog6ToothIcon,
    href: '/dashboard/settings',
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-md rounded-lg h-[calc(100vh-2rem)] p-4 sticky top-4">
      <div className="flex flex-col h-full">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'text-dark hover:bg-primary/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100">
          <button
            onClick={() => {/* Add logout logic */}}
            className="flex items-center gap-3 w-full px-4 py-3 text-dark hover:bg-primary/5 rounded-lg transition-colors"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            <span className="font-medium">خروج</span>
          </button>
        </div>
      </div>
    </div>
  );
} 