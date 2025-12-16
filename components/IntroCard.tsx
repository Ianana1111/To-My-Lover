"use client";

import { motion } from "framer-motion";

interface IntroCardProps {
    message: string;
}

export default function IntroCard({ message }: IntroCardProps) {
    return (
        <section className="min-h-[80vh] flex items-center justify-center py-20 bg-background/50">
            <motion.div
                initial={{ opacity: 0, rotate: -3, y: 50 }}
                whileInView={{ opacity: 1, rotate: -3, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                className="relative bg-white max-w-md w-[90%] p-8 md:p-12 shadow-2xl rounded-sm transform rotate-[-3deg]"
            >
                <div className="absolute top-0 left-0 w-full h-full border border-gray-100/50 pointer-events-none rounded-sm" />
                <p className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 whitespace-pre-line">
                    {message}
                </p>
            </motion.div>
        </section>
    );
}
