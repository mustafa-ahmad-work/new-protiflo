"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export const Reveal = ({ children, width = "fit-content", delay = 0 }: RevealProps) => {
  return (
    <div style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        initial={{ opacity: 0, y: 75, filter: "blur(10px)", scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
            duration: 0.8, 
            delay: delay,
            ease: [0.16, 1, 0.3, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const StaggerContainer = ({ children, staggerDelay = 0.1 }: { children: React.ReactNode, staggerDelay?: number }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: staggerDelay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" }
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};
