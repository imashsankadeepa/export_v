import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ThreeDCard({ children, className = "" }) {
  const cardRef = useRef(null);
  
  // Motion values for normalized cursor positions (-0.5 to 0.5 relative to center)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for buttery smooth transitions
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [12, -12]),
    { stiffness: 120, damping: 20 }
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-12, 12]),
    { stiffness: 120, damping: 20 }
  );

  // Glare position coordinates (0% to 100% across the card)
  const glareX = useSpring(
    useTransform(x, [-0.5, 0.5], [0, 100]),
    { stiffness: 120, damping: 20 }
  );
  const glareY = useSpring(
    useTransform(y, [-0.5, 0.5], [0, 100]),
    { stiffness: 120, damping: 20 }
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of cursor relative to card top-left
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    
    // Normalize to [-0.5, 0.5] range
    x.set(cursorX / width - 0.5);
    y.set(cursorY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Convert glare coordinates to a linear background style string
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 250px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 80%)`
  );

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full h-full transition-shadow duration-300 ${
          isHovered ? "shadow-2xl" : "shadow-md"
        } ${className}`}
      >
        {/* Card Content container with preserve-3d so nested translateZ elements pop out */}
        <div 
          style={{ 
            transform: isHovered ? "translateZ(25px)" : "translateZ(0px)", 
            transformStyle: "preserve-3d",
            transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"
          }} 
          className="w-full h-full"
        >
          {children}
        </div>

        {/* Glossy Glare effect overlay */}
        <motion.div
          style={{
            background: glareBackground,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease-out",
            pointerEvents: "none",
          }}
          className="absolute inset-0 rounded-3xl z-30"
        />
      </motion.div>
    </div>
  );
}
