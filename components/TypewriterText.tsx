"use client";

import { motion } from "framer-motion";

// Update TypewriterText with startOnView support

interface TypewriterTextProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    startOnView?: boolean; // New prop
    onComplete?: () => void;
}

export default function TypewriterText({
    text,
    className,
    speed = 0.05,
    delay = 0,
    startOnView = true, // Default to true
    onComplete,
}: TypewriterTextProps) {
    const characters = Array.from(text);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: speed,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    return (
        <motion.div
            className={className}
            variants={containerVariants}
            initial="hidden"
            whileInView={startOnView ? "visible" : undefined}
            animate={!startOnView ? "visible" : undefined}
            viewport={{ once: true }}
            onAnimationComplete={() => onComplete?.()}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
}
