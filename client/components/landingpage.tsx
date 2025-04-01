import FAQ from './faq'
import FeaturesSection from './featuressection'
import Footer from './footer'
import HeroSection from './herosection'
import Navbar from './Navbar'


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <FAQ />
      <Footer />
    </>
  )
}

export default LandingPage