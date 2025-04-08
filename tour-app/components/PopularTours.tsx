import Image from 'next/image'
import Link from 'next/link'

const popularTours = [
  {
    id: 1,
    title: 'تور دبی',
    image: '/logo.png',  
    price: '۱۵,۰۰۰,۰۰۰',
  },
  {
    id: 2,
    title: 'تور کیش',
    image: '/logo.png',
    price: '۸,۵۰۰,۰۰۰',
  },
  {
    id: 3,
    title: 'تور استانبول',
    image: '/logo.png',
    price: '۲۰,۰۰۰,۰۰۰',
  },
  {
    id: 4,
    title: 'تور آنتالیا',
    image: '/logo.png',
    price: '۱۸,۰۰۰,۰۰۰',
  },
  {
    id: 5,
    title: 'تور ارمنستان',
    image: '/logo.png',
    price: '۱۲,۰۰۰,۰۰۰',
  }
]

export default function PopularTours() {
  return (
    <section className="py-12 bg-[#88304E]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">تورهای محبوب</h2>
          <Link href="/tours" className="text-primary hover:text-primary/80 text-white">
            مشاهده همه تورها
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
          {popularTours.map((tour) => (
            <div 
              key={tour.id}
              className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-dark mb-2">{tour.title}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">شروع از</span>
                  <span className="text-primary font-medium">{tour.price} تومان</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 