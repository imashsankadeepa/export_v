import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

export default function ThreeDCardSlider({ items, onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[560px] flex flex-col justify-between items-center select-none pb-4">
      {/* 3D Stack Viewport */}
      <div 
        className="relative w-full h-[460px] flex items-center justify-center" 
        style={{ perspective: 1200, transformStyle: "preserve-3d" }}
      >
        {items.map((item, index) => {
          // Calculate circular index offset
          let offset = index - activeIndex;
          if (offset < -1) offset += items.length;
          if (offset > 1) offset -= items.length;

          const isActive = offset === 0;
          const isRight = offset === 1 || (offset < -1 && index > activeIndex);
          const isLeft = offset === -1 || (offset > 1 && index < activeIndex);

          // Render dimensions and coordinates in 3D space
          let x = 0;
          let z = 0;
          let scale = 1;
          let rotateY = 0;
          let opacity = 1;
          let zIndex = 10;

          if (isActive) {
            x = 0;
            z = 0;
            scale = 1;
            rotateY = 0;
            opacity = 1;
            zIndex = 30;
          } else if (isRight) {
            x = "40%";
            z = -220;
            scale = 0.85;
            rotateY = -28;
            opacity = 0.55;
            zIndex = 20;
          } else if (isLeft) {
            x = "-40%";
            z = -220;
            scale = 0.85;
            rotateY = 28;
            opacity = 0.55;
            zIndex = 20;
          } else {
            x = 0;
            z = -400;
            scale = 0.7;
            rotateY = 0;
            opacity = 0;
            zIndex = 10;
          }

          return (
            <motion.div
              key={index}
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={{
                x,
                z,
                scale,
                rotateY,
                opacity,
                zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 18,
              }}
              className="absolute w-[290px] sm:w-[350px] md:w-[380px] h-full"
            >
              {/* Individual Card */}
              <div
                onClick={() => {
                  if (!isActive) setActiveIndex(index);
                }}
                className={`w-full h-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col justify-between transition-colors duration-300 ${
                  isActive ? "cursor-default border-agrovista/10" : "cursor-pointer hover:border-agrovista-gold/40"
                }`}
              >
                {/* Card Header Media */}
                <div className="h-52 overflow-hidden relative">
                  <div className="absolute inset-0 bg-agrovista-dark/15 z-10" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full z-20 shadow-sm border border-agrovista-gold/20">
                    <p className="text-[10px] font-black uppercase text-agrovista tracking-wider">{item.tag}</p>
                  </div>
                </div>

                {/* Card Context Content */}
                <div className="p-6 md:p-8 flex flex-col flex-grow justify-between bg-gradient-to-b from-white to-gray-50/50">
                  <div>
                    <h3 className="text-2xl font-black text-agrovista-dark mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-6 font-light">
                      {item.desc}
                    </p>
                  </div>

                  {isActive && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      onClick={() => onNavigate(item.link)}
                      className="w-full bg-agrovista hover:bg-agrovista-dark text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300 border-b-2 border-agrovista-gold shadow-md hover:shadow-lg"
                    >
                      Explore Catalog <ArrowUpRight size={18} />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stack Navigation UI */}
      <div className="flex gap-6 mt-6">
        <MagneticButton strength={0.4}>
          <button
            onClick={handlePrev}
            className="p-4 bg-white hover:bg-agrovista hover:text-white text-agrovista-dark rounded-full border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            aria-label="Previous category"
          >
            <ArrowLeft size={18} />
          </button>
        </MagneticButton>
        <MagneticButton strength={0.4}>
          <button
            onClick={handleNext}
            className="p-4 bg-white hover:bg-agrovista hover:text-white text-agrovista-dark rounded-full border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            aria-label="Next category"
          >
            <ArrowRight size={18} />
          </button>
        </MagneticButton>
      </div>
    </div>
  );
}
