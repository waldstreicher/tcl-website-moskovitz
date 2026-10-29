import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProcedureSection from '@/components/ProcedureSection';
import TreatmentExpectationsSection from '@/components/TreatmentExpectationsSection';
import CandidacySection from '@/components/CandidacySection';
import ComparisonSection from '@/components/ComparisonSection';
// import PatientResultSection from '@/components/PatientResultSection'; // archived 2026-10-29 — uncomment to restore
// import AboutSection from '@/components/AboutSection';         // hidden 2026-10-29 — uncomment to restore
// import BeforeAfterGallery from '@/components/BeforeAfterGallery';  // temporarily hidden
// import VideoGallery from '@/components/VideoGallery';               // temporarily hidden
import VirtualConsultBanner from '@/components/VirtualConsultBanner';
import ConsultationForm from '@/components/ConsultationForm';
import LocationSection from '@/components/LocationSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProcedureSection />
      <TreatmentExpectationsSection />
      <CandidacySection />
      <ComparisonSection />
      {/* <PatientResultSection /> */}  {/* archived 2026-10-29 — uncomment to restore */}
      {/* <AboutSection /> */}        {/* hidden 2026-10-29 — uncomment to restore */}
      {/* <BeforeAfterGallery /> */}  {/* temporarily hidden — uncomment to restore */}
      {/* <VideoGallery /> */}         {/* temporarily hidden — uncomment to restore */}
      <VirtualConsultBanner />
      <ConsultationForm />
      <LocationSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
