'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaCalendar, FaFolder } from 'react-icons/fa'

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: '۱۰ مقصد برتر سفر در سال ۱۴۰۴',
    excerpt: 'با ما همراه باشید تا بهترین مقاصد سفر در سال جدید را به شما معرفی کنیم...',
    image: '/logo.png',
    date: '۱۴۰۴/۰۱/۱۵',
    author: 'تیم سفر',
    category: 'مقاصد سفر'
  },
  {
    id: 2,
    title: 'راهنمای سفر به استانبول',
    excerpt: 'همه چیز درباره سفر به استانبول، از جاذبه‌های گردشگری تا غذاهای محلی...',
    image: '/logo.png',
    date: '۱۴۰۴/۰۱/۱۰',
    author: 'تیم سفر',
    category: 'راهنمای سفر'
  },
  {
    id: 3,
    title: 'بهترین زمان سفر به دبی',
    excerpt: 'با بهترین فصل‌ها و زمان‌های سفر به دبی آشنا شوید...',
    image: '/logo.png',
    date: '۱۴۰۴/۰۱/۰۵',
    author: 'تیم سفر',
    category: 'راهنمای سفر'
  },
  {
    id: 4,
    title: 'راهنمای خرید بلیط هواپیما',
    excerpt: 'نکات مهم برای خرید بلیط هواپیما با بهترین قیمت...',
    image: '/logo.png',
    date: '۱۴۰۳/۱۲/۲۵',
    author: 'تیم سفر',
    category: 'راهنمای سفر'
  },
  {
    id: 5,
    title: 'بهترین هتل‌های استانبول',
    excerpt: 'معرفی بهترین هتل‌های استانبول برای اقامت...',
    image: '/logo.png',
    date: '۱۴۰۳/۱۲/۲۰',
    author: 'تیم سفر',
    category: 'اقامت'
  },
  {
    id: 6,
    title: 'راهنمای سفر به مالزی',
    excerpt: 'همه چیز درباره سفر به مالزی، از جاذبه‌ها تا غذاهای محلی...',
    image: '/logo.png',
    date: '۱۴۰۳/۱۲/۱۵',
    author: 'تیم سفر',
    category: 'راهنمای سفر'
  }
]

export default function Blog() {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-dark text-center mb-8">وبلاگ سفر</h1>
        
        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                placeholder="جستجو در وبلاگ..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary">
                <option value="">همه دسته‌بندی‌ها</option>
                <option value="مقاصد سفر">مقاصد سفر</option>
                <option value="راهنمای سفر">راهنمای سفر</option>
                <option value="اقامت">اقامت</option>
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <h2 className="text-xl font-bold text-dark mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-primary">{post.category}</span>
                  <Link 
                    href={`/blog/${post.id}`}
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    ادامه مطلب →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <nav className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              قبلی
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">
              1
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              2
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              3
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              بعدی
            </button>
          </nav>
        </div>
      </div>
    </section>
  )
} 