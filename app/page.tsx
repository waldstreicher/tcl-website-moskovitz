import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProcedureSection from '@/components/ProcedureSection';
import ComparisonSection from '@/components/ComparisonSection';
import AboutSection from '@/components/AboutSection';
// import BeforeAfterGallery from '@/components/BeforeAfterGallery';  // temporarily hidden
// import VideoGallery from '@/components/VideoGallery';               // temporarily hidden
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
      {/* <BeforeAfterGallery /> */}  {/* temporarily hidden — uncomment to restore */}
      {/* <VideoGallery /> */}         {/* temporarily hidden — uncomment to restore */}
      <VirtualConsultBanner />
      <ConsultationForm />
      <LocationSection />
      <Footer />
    </main>
  );
}
