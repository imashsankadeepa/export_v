import React from "react";
import { motion } from "framer-motion";

export default function TextReveal({ text, className = "", delay = 0 }) {
  // Split into words, then split words into characters to preserve word wrapping
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.015,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: {
      y: "110%",
      rotate: 4,
    },
    visible: {
      y: "0%",
      rotate: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 140,
      },
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`inline-block reveal-wrapper ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.25em] overflow-hidden py-[0.1em] -my-[0.1em]">
          {word.split("").map((char, charIdx) => (
            <span key={charIdx} className="inline-block overflow-hidden relative">
              <motion.span
                variants={charVariants}
                className="inline-block reveal-char origin-bottom-left"
              >
                {char}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
