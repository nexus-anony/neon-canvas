import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GifGallery from "@/components/GifGallery";
import FeaturedEdits from "@/components/FeaturedEdits";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Nexus Edits - Anime GIF Creator & AMV Editor</title>
        <meta
          name="description"
          content="High-quality anime GIFs and AMV edits optimized for Instagram and GIPHY"
        />
        <meta
          name="keywords"
          content="anime gifs, AMV editor, anime edits, GIPHY creator"
        />
      </Helmet>
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
