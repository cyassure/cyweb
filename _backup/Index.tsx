import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyCyAssureSection from "@/components/WhyCyAssureSection";
import AboutSection from "@/components/AboutSection";
import PlatformSection from "@/components/PlatformSection";
import DetailedServicesSection from "@/components/DetailedServicesSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyCyAssureSection />
        <PlatformSection />
        <DetailedServicesSection />
        <AboutSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
