import Nav from '@/components/home/Nav';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Philosophy from '@/components/home/Philosophy';
import Pricing from '@/components/home/Pricing';
import Cta from '@/components/home/Cta';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="bg-app text-app min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}