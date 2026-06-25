import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position coordinates for the immediate inner dot
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Position coordinates for the trailing outer ring
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  // Smooth trailing spring behavior (slower spring config for lag effect)
  const springX = useSpring(trailX, { stiffness: 220, damping: 28, mass: 0.6 });
  const springY = useSpring(trailY, { stiffness: 220, damping: 28, mass: 0.6 });

  useEffect(() => {
    // Check if device is touch or screen is small
    const checkDevice = () => {
      const mobile = 
        window.innerWidth < 1024 || 
        ("ontouchstart" in window) || 
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
      
      if (!mobile) {
        document.documentElement.classList.add("custom-cursor-active");
      } else {
        document.documentElement.classList.remove("custom-cursor-active");
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    const handleMouseMove = (e) => {
      if (isMobile) return;
      if (!isVisible) setIsVisible(true);

      dotX.set(e.clientX);
      dotY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Global listener for interactive hover changes
    const handleMouseOver = (e) => {
      if (isMobile) return;
      const target = e.target;
      const hoverInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".interactive-hover") ||
        target.classList.contains("interactive-hover");

      setIsInteractive(!!hoverInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Precision Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-2 h-2 bg-agrovista-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* Trailing Ambient Aura Ring */}
      <motion.div
        animate={{
          scale: isInteractive ? 2.5 : 1,
          backgroundColor: isInteractive ? "rgba(212, 178, 111, 0.25)" : "transparent",
          borderColor: isInteractive ? "rgba(212, 178, 111, 0)" : "#144B27",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-agrovista pointer-events-none z-[9998] mix-blend-exclusion"
      />
    </>
  );
}
