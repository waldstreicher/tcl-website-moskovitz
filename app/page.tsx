import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProcedureSection from '@/components/ProcedureSection';
import ComparisonSection from '@/components/ComparisonSection';
import AboutSection from '@/components/AboutSection';
import BeforeAfterGallery from '@/components/BeforeAfterGallery';
import VideoGallery from '@/components/VideoGallery';
import VirtualConsultBanner from '@/components/VirtualConsultBanner';
import ConsultationForm from '@/components/ConsultationForm';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProcedureSection />
      <ComparisonSection />
      <AboutSection />
      <BeforeAfterGallery />
      <VideoGallery />
      <VirtualConsultBanner />
      <ConsultationForm />
      <LocationSection />
      <Footer />
    </main>
  );
}
