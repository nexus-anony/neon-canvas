import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GifGallery from "@/components/GifGallery";
import FeaturedEdits from "@/components/FeaturedEdits";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
const Index = () => {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <GifGallery />
        <FeaturedEdits />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
