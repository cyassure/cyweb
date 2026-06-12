import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyCycentraSection from "@/components/WhyCycentraSection";
import ProductsSection from "@/components/ProductsSection";
import CyMindSection from "@/components/CyMindSection";
import PlatformSection from "@/components/PlatformSection";
import ComparisonSection from "@/components/ComparisonSection";
import AboutSection from "@/components/AboutSection";
import FreeScanSection from "@/components/FreeScanSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WhyCycentraSection />
        <ProductsSection />
        <PlatformSection />
        <ServicesSection />
        <CyMindSection />
        <ComparisonSection />
        <FreeScanSection />
        <PricingSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
