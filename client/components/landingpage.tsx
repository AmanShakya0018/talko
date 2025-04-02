import FAQ from './faq'
import FeaturesSection from './featuressection'
import Footer from './footer'
import HeroSection from './herosection'
import Navbar from './Navbar'
import TechStackSection from './techstacksection'


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TechStackSection />
      <FAQ />
      <Footer />
    </>
  )
}

export default LandingPage