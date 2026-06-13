import Header from './components/Header'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Services from './components/Services'
import Calculator from './components/Calculator'
import BeforeAfter from './components/BeforeAfter'
import Gallery from './components/Gallery'
import WhyUs from './components/WhyUs'
import HowItWorks from './components/HowItWorks'
import ServiceArea from './components/ServiceArea'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import ContactForm from './components/ContactForm'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import Cursor from './components/Cursor'

export default function App() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <Cursor />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Calculator />
        <BeforeAfter />
        <Gallery />
        <WhyUs />
        <HowItWorks />
        <ServiceArea />
        <Reviews />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  )
}
