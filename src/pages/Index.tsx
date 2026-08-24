import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import ProductsSection from "@/components/ProductsSection";
import EditionsSummarySection from "@/components/EditionsSummarySection";
import DownloadCTASection from "@/components/DownloadCTASection";
import CyMindSection from "@/components/CyMindSection";
import PlatformSection from "@/components/PlatformSection";
import ServicesSection from "@/components/ServicesSection";
import ComparisonSection from "@/components/ComparisonSection";
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
        <WhySection />
        <ProductsSection />
        <EditionsSummarySection />
        <DownloadCTASection />
        <CyMindSection />
        <PlatformSection />
        <ServicesSection />
        <ComparisonSection />
        <FreeScanSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
