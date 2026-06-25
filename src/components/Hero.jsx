import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Award, Globe, ShieldCheck, Leaf } from 'lucide-react';
import ThreeDCard from './ThreeDCard';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';

export default function Hero() {
  const navigate = useNavigate();

  // Floating background 3D-rotated decorative icons configuration
  const floatingItems = [
    { icon: <Leaf size={40} className="text-agrovista-gold/30 fill-agrovista-gold/10" />, delay: 0, x: "12%", y: "15%", rotX: 45, rotY: 45, duration: 6 },
    { icon: <Sprout size={32} className="text-agrovista-light/30" />, delay: 1.5, x: "85%", y: "20%", rotX: -30, rotY: 60, duration: 8 },
    { icon: <Globe size={44} className="text-agrovista-gold/20" />, delay: 0.5, x: "80%", y: "65%", rotX: 55, rotY: -25, duration: 7 },
    { icon: <ShieldCheck size={36} className="text-agrovista-light/20" />, delay: 2.2, x: "15%", y: "70%", rotX: -40, rotY: -45, duration: 9 },
  ];

  return (
    <div className="relative bg-gray-950 text-white min-h-[90vh] md:min-h-[85vh] flex flex-col justify-center">
      {/* Background vanilla base picture */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center opacity-45 animate-pulse"
          style={{
            backgroundImage: "url('/images/vanilla_flower_hero.png')",
            animationDuration: '8s'
          }}
        />
      </div>

      {/* 3D Floating Background Items */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {floatingItems.map((item, idx) => (
          <motion.div
            key={idx}
            className="absolute hidden md:block"
            style={{ left: item.x, top: item.y, perspective: 1000 }}
            animate={{
              y: [0, -25, 0],
              rotateX: [item.rotX, item.rotX + 15, item.rotX],
              rotateY: [item.rotY, item.rotY - 30, item.rotY],
              rotateZ: [0, 360],
            }}
            transition={{
              y: { duration: item.duration, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              rotateX: { duration: item.duration + 1, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              rotateY: { duration: item.duration - 1, repeat: Infinity, ease: "easeInOut", delay: item.delay },
              rotateZ: { duration: 30, repeat: Infinity, ease: "linear", delay: item.delay },
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Soft gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-950 z-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-36 md:py-52 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-[1.05] text-center">
          <TextReveal text="Premium Sri Lankan" />
          <br />
          <span className="text-agrovista-gold mt-2 block">
            <TextReveal text="Vanilla, Ceylon Tea &amp; Spices" delay={0.2} />
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Exporting the finest authentic agricultural products from the heart of Ceylon to international importers, brands, and distributors worldwide.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <MagneticButton strength={0.25}>
            <button
              onClick={() => navigate('/products')}
              className="bg-agrovista hover:bg-agrovista-dark px-10 py-4 rounded-full text-white font-bold transition-all duration-300 shadow-xl border-b-2 border-agrovista-gold"
            >
              Explore Catalog
            </button>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-white hover:bg-white hover:text-agrovista-dark px-10 py-4 rounded-full text-white font-bold transition-all duration-300"
            >
              Wholesale Inquiry
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Overlapping Cards with 3D Tilt Effect & Pop-out Layers */}
      <div className="relative z-20 container mx-auto px-6 -mb-24 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ThreeDCard className="rounded-2xl">
            <div
              className="bg-white p-8 h-full rounded-2xl border-t-4 border-agrovista transition-all duration-300 flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                <h3 className="text-xl font-bold text-agrovista-dark mb-3">Natural Farming</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Directly sourced from local farmers in Sri Lanka, ensuring 100% purity and bio-diversity.
                </p>
              </div>
            </div>
          </ThreeDCard>

          <ThreeDCard className="rounded-2xl">
            <div
              className="bg-agrovista p-8 h-full rounded-2xl text-white border-t-4 border-agrovista-gold transition-all duration-300 flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                <h3 className="text-xl font-bold mb-3">Global Bulk Shipping</h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  Fast and secure ocean or air freight cargo logistics delivering premium freshness to any international port.
                </p>
              </div>
            </div>
          </ThreeDCard>

          <ThreeDCard className="rounded-2xl">
            <div
              className="bg-white p-8 h-full rounded-2xl border-t-4 border-agrovista-gold transition-all duration-300 flex flex-col justify-between"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                <h3 className="text-xl font-bold text-agrovista-dark mb-3">Export Standards</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  Premium vanilla beans, leafy tea tips, and rich spices  standards.
                </p>
              </div>
            </div>
          </ThreeDCard>
        </div>
      </div>
    </div>
  );
}
