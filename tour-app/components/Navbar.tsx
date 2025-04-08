import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="logo" width={60} height={20} />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8 space-x-reverse">
            <Link href="/tours/domestic" className="text-dark hover:text-primary">تورهای داخلی</Link>
            <Link href="/tours/foreign" className="text-dark hover:text-primary">تورهای خارجی</Link>
            <Link href="/blog" className="text-dark hover:text-primary">مجله گردشگری</Link>
            <Link href="/about" className="text-dark hover:text-primary">درباره ما</Link>
            <Link href="/contact" className="text-dark hover:text-primary">تماس با ما</Link>
            <Link href="/chat" className="text-dark hover:text-primary">چت با همسفر</Link>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/login" className="text-primary hover:text-primary/80">
              ورود / ثبت نام
            </Link>
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 