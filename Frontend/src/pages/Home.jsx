import GetInTouch from "../sections/get-in-touch";
import OurTestimonials from "../sections/our-testimonials";
import TrustedCompanies from "../sections/trusted-companies";
import AboutOurApps from "../sections/about-our-apps";
import HeroSection from "../sections/hero-section";
import OurLatestCreation from "../sections/our-latest-creation";

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
