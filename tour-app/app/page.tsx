
import Hero from '@/components/Hero'
import PopularTours from '@/components/PopularTours'
import LatestForeignTours from '@/components/LatestForeignTours'
import Blog from '@/components/Blog'

export default function Home() {
  return (
    <main>
   
      <Hero />
      <PopularTours />
      <LatestForeignTours />
      <Blog />
    </main>
  )
}
