import { useNavigate } from "react-router-dom";
import { CheckCircle, Globe, Award, Clock, ArrowRight, ShieldCheck, Truck, Sprout, Star, Heart } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import CountUp from "../utils/CountUp.jsx";
import ThreeDCard from "../components/ThreeDCard.jsx";
import TextReveal from "../components/TextReveal.jsx";
import MagneticButton from "../components/MagneticButton.jsx";
import ThreeDCardSlider from "../components/ThreeDCardSlider.jsx";

// --- HOMEPAGE DATA ---
const stats = [
  {
    label: "Years of Trust",
    value: 15,
    suffix: "+",
    icon: <Clock className="text-agrovista-gold" size={36} />,
  },
  {
    label: "Global Destinations",
    value: 50,
    suffix: "+",
    icon: <Globe className="text-agrovista-gold" size={36} />,
  },
  {
    label: "Export Standards",
    value: 100,
    suffix: "%",
    icon: <ShieldCheck className="text-agrovista-gold" size={36} />,
  },
  {
    label: "Awards & Recognitions",
    value: 12,
    suffix: "+",
    icon: <Award className="text-agrovista-gold" size={36} />
  },
];

const highlights = [
  {
    title: "Vanilla Beans & Powder",
    tag: "Premium Gourmet & Extraction Grade",
    desc: "Grade A Gourmet Vanilla and Grade B extraction beans carefully cured in Negombo. Boasts rich vanillin content and sweet, buttery aromas ideal for extracts and culinary masters.",
    image: "/images/pexels-qwirkiandco-14381803.jpg",
    link: "/products?category=vanilla"
  },
  {
    title: "Ceylon Tea Grades",
    tag: "High Grown Orthodox Tea",
    desc: "From the prized Silver and Golden Tips to orthodox grades like BOP, BOPF, and OPA. Harvested from the highest elevation misty hills of Sri Lanka for distinct character and briskness.",
    image: "/images/pexels-liu-2155530113-34917509.jpg",
    link: "/products?category=tea"
  },
  {
    title: "Authentic Ceylon Spices",
    tag: "High Piperine & Low Coumarin",
    desc: "Premium True Ceylon Cinnamon Sticks (Alba & C5), high-piperine Black Pepper, cloves, and cardamom. Hand-picked and sun-dried for the maximum concentration of essential oils.",
    image: "/images/pexels-musa-colak-434382216-15388238.jpg",
    link: "/products?category=spices"
  }
];

const certifications = [
  {
    name: "ISO 22000",
    description: "International Food Safety Management System standard compliance across our supply chain.",
    icon: <ShieldCheck className="text-agrovista-gold mx-auto mb-3" size={40} />
  },
  {
    name: "HACCP Certified",
    description: "Hazard Analysis Critical Control Point standard verification, ensuring zero biological or chemical hazards.",
    icon: <CheckCircle className="text-agrovista-gold mx-auto mb-3" size={40} />
  },
  {
    name: "GMP Standards",
    description: "Good Manufacturing Practices enforced during sourcing, sorting, curing, and packaging.",
    icon: <Award className="text-agrovista-gold mx-auto mb-3" size={40} />
  },
  {
    name: "USDA & EU Organic",
    description: "Certified organic fields and processes, free from chemical fertilizers and synthetic pesticides.",
    icon: <Sprout className="text-agrovista-gold mx-auto mb-3" size={40} />
  }
];

const logisticsSteps = [
  {
    title: "Vacuum-Sealed Preservation",
    description: "Vanilla and spices are vacuum-packed in food-grade high-barrier bags to retain moisture, aroma, and essential oils.",
    icon: <ShieldCheck size={28} className="text-agrovista-gold" />
  },
  {
    title: "FOB & CIF Shipping Modes",
    description: "Flexible delivery terms with major international ocean carriers and air freight cargo lines operating from Colombo Port.",
    icon: <Truck size={28} className="text-agrovista-gold" />
  },
  {
    title: "Customized Wholesale Packing",
    description: "Bulk bags, cartons, or retail-ready private label packaging customized to supermarket and food brand specifications.",
    icon: <Globe size={28} className="text-agrovista-gold" />
  }
];

const faqs = [
  {
    q: "Do you provide product samples?",
    a: "Yes, we send samples of our vanilla beans, tea grades, and spice selections via courier (DHL/FedEx) to verified wholesale buyers prior to bulk ordering.",
  },
  {
    q: "What is your Minimum Order Quantity (MOQ)?",
    a: "Our MOQ is structured per category: 5kg for high-value items like Vanilla Beans/Powder, 50kg for Ceylon Tea Grades, and 100kg for spices.",
  },
  {
    q: "Do you offer private labeling (OEM)?",
    a: "Yes, we provide full retail contract packaging and private labeling under your brand name, utilizing custom stand-up pouches, tins, or boxes.",
  },
  {
    q: "What is the typical shipping lead time?",
    a: "Air freight shipments dispatch within 5-7 days from Negombo/Colombo. Ocean freight cargo dispatches within 14-21 days depending on packing volume.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-agrovista-cream overflow-x-hidden font-sans relative">
      {/* Background stardust noise texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] z-0" />

      <Navbar />
      <Hero />

      {/* Spacer for overlapping cards */}
      <div className="h-28 md:h-32" />

      {/* --- SECTION 1: ABOUT US SHORT --- */}
      <ScrollReveal>
        <section className="container mx-auto px-6 py-20 relative z-10" id="about">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <span className="text-agrovista font-bold uppercase tracking-[0.25em] text-sm mb-3 block">
                Pure Sri Lankan Heritage
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-agrovista-dark mb-6 leading-tight">
                <TextReveal text="Bringing the Rare Aromas of Ceylon to Global Markets" />
              </h2>
              <div className="w-20 h-1 bg-agrovista-gold mb-6 rounded-full" />
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                Agrovista Exports is a premium Sri Lankan agricultural exporter. We gather the finest Grade A vanilla pods, exquisite leafy tea tips, and bold spices from estate networks to deliver freshness directly to your destination port.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Operating from Negombo, our infrastructure aligns with international export quality standards, ensuring rigorous moisture checking, curing control, and custom packaging.
              </p>
              <div className="flex gap-4">
                <MagneticButton strength={0.2}>
                  <button
                    onClick={() => navigate("/about")}
                    className="bg-agrovista text-white font-bold px-8 py-3.5 rounded-full hover:bg-agrovista-dark transition duration-300 border-b-2 border-agrovista-gold"
                  >
                    Our Story
                  </button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <button
                    onClick={() => navigate("/contact")}
                    className="border border-agrovista text-agrovista font-bold px-8 py-3.5 rounded-full hover:bg-agrovista hover:text-white transition duration-300"
                  >
                    Contact Exporters
                  </button>
                </MagneticButton>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white hover:scale-[1.02] transition duration-500">
                <div className="w-full h-full bg-[url('/images/pexels-qwirkiandco-14381803.jpg')] bg-cover bg-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-agrovista-dark/65 via-transparent to-transparent flex items-end p-8">
                  <div className="text-white">
                    <p className="text-xs uppercase tracking-widest text-agrovista-gold font-bold mb-1">Estate Hand-picked</p>
                    <h4 className="text-2xl font-bold">100% Traceable Gourmet Vanilla</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>



      {/* --- SECTION 3: ORGANIC FARMING & SUSTAINABILITY --- */}
      <ScrollReveal>
        <section className="py-24 bg-white relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/images/vanilla-green.jpg"
                    alt="Organic Vanilla Harvesting"
                    className="rounded-2xl shadow-lg mt-8 border border-gray-100 hover:scale-105 transition duration-300 object-cover h-[280px] w-full"
                  />
                  <img
                    src="/images/vanilla-cured.jpg"
                    alt="Gourmet Cured Vanilla Beans"
                    className="rounded-2xl shadow-lg border border-gray-100 hover:scale-105 transition duration-300 object-cover h-[280px] w-full"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <span className="text-agrovista font-bold uppercase tracking-[0.25em] text-sm mb-3 block">
                  Sustainable Sourcing
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-agrovista-dark mb-6 leading-tight">
                  <TextReveal text="Organic Farming &amp; Ethical Partnerships" />
                </h2>
                <div className="w-20 h-1 bg-agrovista-gold mb-6 rounded-full" />
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  At Agrovista, quality starts in the soil. We partner directly with a network of certified organic smallholder farmers across Sri Lanka, ensuring fair compensation and biodynamic farming methods.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-agrovista-gold shrink-0 mt-1" size={20} />
                    <p className="text-gray-600"><strong className="text-gray-900">Zero Synthetic Pesticides:</strong> Our plantations practice pure organic companion farming to preserve rich soil biology.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-agrovista-gold shrink-0 mt-1" size={20} />
                    <p className="text-gray-600"><strong className="text-gray-900">Vanilla Sun-Curing:</strong> Our vanilla beans are cured slowly under direct sunlight and blanket-sweated for months to maximize vanillin crystallization.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle className="text-agrovista-gold shrink-0 mt-1" size={20} />
                    <p className="text-gray-600"><strong className="text-gray-900">Orthodox Processing:</strong> Ceylon Teas are plucked and rolled using traditional methods to preserve aromatic oils.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* --- SECTION 4: PRODUCT HIGHLIGHT Spotlight --- */}
      <section className="py-24 bg-agrovista-cream relative z-10" id="spotlight">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-agrovista font-bold uppercase tracking-[0.25em] text-sm mb-3 block">
              Premium Wholesale Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-agrovista-dark">
              <TextReveal text="Our Primary Export Categories" />
            </h2>
            <div className="w-24 h-1 bg-agrovista-gold mx-auto mt-4 rounded-full" />
          </div>

          <ThreeDCardSlider items={highlights} onNavigate={navigate} />
        </div>
      </section>

      {/* --- SECTION 5: WORLDWIDE SHIPPING & B2B LOGISTICS --- */}
      <ScrollReveal>
        <section className="bg-white py-24 relative z-10 border-t border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <span className="text-agrovista font-bold uppercase tracking-[0.25em] text-sm mb-3 block">
                  Global Supply Chain
                </span>
                <h2 className="text-3xl md:text-5xl font-black text-agrovista-dark mb-6 leading-tight">
                  <TextReveal text="Worldwide Shipping &amp; Logistics Infrastructure" />
                </h2>
                <div className="w-20 h-1 bg-agrovista-gold mb-6 rounded-full" />
                <p className="text-gray-700 leading-relaxed text-lg mb-8">
                  Agrovista Exports operates robust supply agreements with top-tier carrier lines. We facilitate custom clearance at Colombo port and arrange dispatch to major ports worldwide.
                </p>
                <div className="space-y-6">
                  {logisticsSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="p-3 bg-agrovista-goldLight rounded-xl border border-agrovista-gold/20 shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-agrovista-dark mb-1">{step.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[450px]">
                  <div className="absolute inset-0 bg-agrovista-dark/20 z-10" />
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1615485925763-8678627d50a1?q=80&w=2070')" }}
                  />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl z-20 border-l-4 border-agrovista shadow-xl">
                    <h5 className="font-bold text-agrovista-dark mb-1">Global Freight Ready</h5>
                    <p className="text-gray-600 text-xs leading-relaxed">Regular exports to Germany, USA, Japan, Australia, Saudi Arabia, and the UK. FOB Colombo or CIF destination terms available.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>



      {/* --- SECTION 7: FAQ SECTION --- */}
      <ScrollReveal>
        <section className="bg-white py-24 relative z-10 border-b border-gray-100">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-agrovista font-bold uppercase tracking-[0.25em] text-sm mb-3 block">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-agrovista-dark">
                <TextReveal text="Frequently Asked Questions" />
              </h2>
              <div className="w-20 h-1 bg-agrovista-gold mx-auto mt-4 rounded-full" />
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-agrovista-cream/50 p-6 rounded-2xl border border-gray-100 hover:border-agrovista-gold transition duration-300 cursor-pointer group"
                >
                  <h3 className="text-lg font-bold text-agrovista-dark mb-2 flex justify-between items-center group-hover:text-agrovista transition">
                    {faq.q}
                    <span className="text-agrovista-gold text-2xl group-hover:scale-110 transition shrink-0 ml-2">+</span>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* --- SECTION 8: PARTNERSHIP CALL TO ACTION --- */}
      <section className="relative py-24 bg-agrovista-dark text-white z-10 overflow-hidden">
        {/* Soft background gold glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-agrovista-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-7/12">
              <ScrollReveal>
                <span className="text-agrovista-gold font-bold uppercase tracking-[0.25em] text-sm mb-3 block">
                  Export Partnerships
                </span>
                <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                  <TextReveal text="Ready to Secure Your Supply Chain?" />
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-10 font-light leading-relaxed">
                  Partner with Agrovista Exports today. Get premium Sri Lankan agricultural products delivered with direct manufacturer pricing.
                </p>
                <MagneticButton strength={0.25}>
                  <button
                    onClick={() => navigate("/contact")}
                    className="bg-agrovista hover:bg-agrovista-light text-white font-bold px-10 py-4.5 rounded-full text-lg border-b-2 border-agrovista-gold shadow-2xl transition duration-300"
                  >
                    Request Commercial Quote
                  </button>
                </MagneticButton>
              </ScrollReveal>
            </div>
            <div className="lg:w-5/12">
              <ScrollReveal>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 h-[380px] hover:scale-[1.02] transition duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-agrovista-dark/40 to-transparent z-10" />
                  <img
                    src="https://images.unsplash.com/photo-1615485925763-8678627d50a1?q=80&w=2070"
                    alt="Ready to Secure Your Supply Chain"
                    className="w-full h-full object-cover"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
