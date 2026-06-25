import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen font-sans text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1609152204646-d27999999999?q=80&w=2000')`,
        }}
      >
        <div className="absolute inset-0 bg-white/90" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="pt-40 pb-20 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col lg:flex-row items-center gap-16"
            >
              <div className="lg:w-1/2">
                <motion.span
                  variants={fadeInUp}
                  className="text-sm font-bold text-agrovista-gold uppercase tracking-[0.3em] mb-4 block"
                >
                  Who We Are
                </motion.span>
                <motion.h1
                  variants={fadeInUp}
                  className="text-5xl lg:text-7xl font-black leading-tight mb-8 text-agrovista-dark"
                >
                  Agrovista <br />{" "}
                  <span className="text-agrovista-gold italic">Exports</span>
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-slate-600 font-light leading-relaxed mb-6"
                >
                  Agrovista Exports is a Sri Lanka–based export company
                  dedicated to delivering premium gourmet vanilla, Ceylon tea,
                  and exceptional spices to the global market.
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg text-slate-600 font-light leading-relaxed"
                >
                  Founded with a vision to introduce Sri Lanka's rich agricultural
                  heritage and world-class vanilla curing standards to the world,
                  we focus on quality, authenticity, and long-term partnerships.
                </motion.p>
              </div>

              {/* Asymmetric Image Grid */}
              <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <motion.div
                  variants={scaleUp}
                  whileHover={{ scale: 1.02 }}
                  className="col-span-2 h-80 rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="/images/vanilla-info.jpg"
                    className="w-full h-full object-cover"
                    alt="Vanilla planifolia Infographic"
                  />
                </motion.div>
                <motion.div
                  variants={scaleUp}
                  whileHover={{ scale: 1.05 }}
                  className="h-48 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src="/images/vanilla-green.jpg"
                    className="w-full h-full object-cover"
                    alt="Fresh Green Vanilla Pods"
                  />
                </motion.div>
                <motion.div
                  variants={scaleUp}
                  whileHover={{ scale: 1.05 }}
                  className="h-48 rounded-xl overflow-hidden shadow-lg"
                >
                  <img
                    src="/images/vanilla-cured.jpg"
                    className="w-full h-full object-cover"
                    alt="Cured Gourmet Vanilla Beans"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* VISION & MISSION SECTION */}
        <section className="bg-gray-900 text-white py-24 md:py-32">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.span
                  variants={fadeInUp}
                  className="text-sm font-bold tracking-[0.2em] uppercase text-agrovista-gold mb-4 block"
                >
                  OUR PURPOSE
                </motion.span>
                <motion.h2
                  variants={fadeInUp}
                  className="text-4xl md:text-5xl font-black leading-tight mb-8"
                >
                  Sharing Sri Lanka's <br />
                  <span className="text-gray-400">Agricultural Heritage</span>
                </motion.h2>

                <div className="space-y-8 text-gray-300 font-light text-lg leading-relaxed">
                  <motion.div variants={fadeInUp}>
                    <h3 className="text-white font-bold text-xl mb-2">
                      Our Vision
                    </h3>
                    <p>
                      To become a trusted global exporter of Sri Lankan gourmet vanilla,
                      tea, and spices, recognized for quality, authenticity, and
                      sustainable practices.
                    </p>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <h3 className="text-white font-bold text-xl mb-2">
                      Our Mission
                    </h3>
                    <ul className="space-y-3 mt-2">
                      <li className="flex gap-3">
                        <CheckCircle
                          size={20}
                          className="text-agrovista-gold shrink-0"
                        />
                        Export premium Ceylon vanilla, tea, &amp; spices meeting global
                        standards.
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle
                          size={20}
                          className="text-agrovista-gold shrink-0"
                        />
                        Work closely with local farmers for ethical sourcing.
                      </li>
                      <li className="flex gap-3">
                        <CheckCircle
                          size={20}
                          className="text-agrovista-gold shrink-0"
                        />
                        Build long-term partnerships based on trust &amp;
                        transparency.
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Image */}
              <div className="relative h-[600px] w-full bg-gray-800 rounded-lg overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 0.9 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  src="https://images.unsplash.com/photo-1609152204646-d27999999999?q=80&w=2000"
                  alt="Vanilla Vine Plantation"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SOURCING & QUALITY SECTION */}
        <section className="py-24">
          <div className="container mx-auto px-6 lg:px-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-20 text-center md:text-left"
            >
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 block">
                SPECIALIZATION
              </span>
              <h2 className="text-4xl md:text-5xl font-medium text-slate-900">
                Ethical Sourcing &amp; <br /> Premium Quality
              </h2>
            </motion.div>

            {/* Feature 1: The Source */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center"
            >
              <div className="order-2 md:order-1">
                <h3 className="text-3xl font-bold mb-6 uppercase tracking-wide text-agrovista-gold">
                  Quality Begins at Source
                </h3>
                <p className="text-slate-600 text-lg font-light mb-8 leading-relaxed">
                  We work closely with farmers and producers to ensure ethical
                  sourcing, strict quality control, and international export
                  standards. Every product is carefully processed, packed, and
                  delivered to preserve its natural flavor, aroma, and
                  freshness.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-agrovista-gold">
                    <h4 className="font-bold text-lg">Trusted Growers</h4>
                    <p className="text-sm text-gray-500">
                      Direct partnerships with locals.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border-l-4 border-agrovista-gold">
                    <h4 className="font-bold text-lg">Strict Control</h4>
                    <p className="text-sm text-gray-500">
                      Maintained from farm to export.
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2 h-[400px] bg-white/50 backdrop-blur rounded-xl overflow-hidden shadow-lg">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src="https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=2070"
                  className="w-full h-full object-cover"
                  alt="Farm Sourcing"
                />
              </div>
            </motion.div>

            {/* Feature 2: The Products */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div className="h-[400px] bg-white/50 backdrop-blur rounded-xl overflow-hidden shadow-lg">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  src="/images/pexels-qwirkiandco-14381803.jpg"
                  className="w-full h-full object-cover"
                  alt="Premium Gourmet Vanilla Beans"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-6 uppercase tracking-wide text-agrovista-gold">
                  Our Product Range
                </h3>
                <p className="text-slate-600 text-lg font-light mb-6 leading-relaxed">
                  We specialize in premium Grade A and Grade B Ceylon vanilla beans, vanilla powder, and extracts, alongside a wide range of Ceylon teas and exceptional spices.
                </p>
                <p className="text-slate-600 text-lg font-light mb-8 leading-relaxed">
                  In addition, we export high-quality Sri Lankan spices,
                  including{" "}
                  <strong>
                    cinnamon (Alba &amp; C5), cardamom, cloves, and high-piperine black pepper
                  </strong>
                  .
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 px-8 py-3 border border-agrovista text-agrovista font-bold rounded-full hover:bg-agrovista hover:text-white transition-all duration-300 border-b-2 border-agrovista-gold shadow"
                >
                  View Catalog <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 bg-white/80 backdrop-blur-md border-t border-gray-200">
          <div className="container mx-auto px-6 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <h3 className="text-2xl font-light text-slate-800">
                Agrovista by the numbers
              </h3>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-300 pt-12"
            >
              {[
                { value: "100%", label: "Authentic Ceylon" },
                { value: "50+", label: "Partner Farmers" },
                { value: "Global", label: "Export Reach" },
                { value: "Premium", label: "Quality Grade" },
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <h4 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                    {stat.value}
                  </h4>
                  <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
