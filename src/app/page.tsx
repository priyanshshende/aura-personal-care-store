export const dynamic = 'force-dynamic';

import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts title="Bestsellers" />
      <FeaturedProducts title="New Arrivals" />
    </main>
  );
}
