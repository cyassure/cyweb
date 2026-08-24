import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import ProductsSection from "@/components/ProductsSection";
import EditionsSummarySection from "@/components/EditionsSummarySection";
import DownloadCTASection from "@/components/DownloadCTASection";
import PlatformSection from "@/components/PlatformSection";
import ServicesSection from "@/components/ServicesSection";
import FreeScanSection from "@/components/FreeScanSection";
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
        <PlatformSection />
        <ServicesSection />
        <FreeScanSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
