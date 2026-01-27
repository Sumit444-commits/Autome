import GetInTouch from "../sections/GetInTouch";
import OurTestimonials from "../sections/OurTestimonials";
import TrustedCompanies from "../sections/TrustedCompanies";
import AboutOurApps from "../sections/AboutOurApps";
import HeroSection from "../sections/HeroSection";
import OurLatestCreation from "../sections/OurLatestCreation";

export default function Home() {
  return (
    <>
      <main className="px-6 md:px-16 lg:px-24 xl:px-32">
        <HeroSection />
        <OurLatestCreation />
        <AboutOurApps />
        <OurTestimonials />
        <TrustedCompanies />
        <GetInTouch />
        
      </main>
    </>
  );
}
