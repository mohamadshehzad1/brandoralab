import dynamic from 'next/dynamic';

// Critical components for initial load
import Header from '../components/Header';
import Hero from '@/components/Hero';
import CategoriesGrid from '@/components/CategoriesGrid'; // 
import Tutorials from '@/components/Tutorials'; 

// Dynamically imported components (disable SSR for client-heavy ones)
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Services = dynamic(() => import('@/components/Services'), { ssr: false });
const Tech = dynamic(() => import('@/components/Tech'), { ssr: false });
const DigitalMarketing = dynamic(() => import('@/components/DigitalMarketing'), { ssr: false });
const Teams = dynamic(() => import('@/components/Teams'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/Testimonials'), { ssr: false });
const Blogs = dynamic(() => import('@/components/Blogs'), { ssr: false });
const ContactUs = dynamic(() => import('@/components/ContactUs'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const Facebook = dynamic(() => import('@/components/Facebook'), { ssr: false });
const InstagramEmbed = dynamic(() => import('@/components/InstagramEmbed'), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="bg-gray-100 pt-10 pb-16">
        <Header />
        <Hero />
      </div>
      {/* Put Categories before Blogs for better UX */}
      <CategoriesGrid />
      <Blogs />
      <Tutorials />
      <Services />
      <Tech />
      <DigitalMarketing />
      <Testimonials />
      <ContactUs />
      <Footer />
    </>
  );
}
