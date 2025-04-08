'use client';

import DashboardSidebar from '@/components/DashboardSidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4">
      <div className="container mx-auto">
        <div className="flex gap-6">
          <DashboardSidebar />
          <main className="flex-1">
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 