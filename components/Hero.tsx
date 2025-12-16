"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="h-screen flex flex-col items-center justify-center text-center relative overflow-hidden">
            <motion.div
                layout
                className="z-10 flex flex-col items-center"
            >
                <motion.h1
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-8xl md:text-9xl font-serif text-foreground"
                >
                    寶寶
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, height: 0, y: 20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                    className="text-xl md:text-4xl font-sans text-accent tracking-widest uppercase overflow-hidden"
                >
                    <span className="block pt-4">生日快樂！</span>
                </motion.p>
            </motion.div>
        </section>
    );
}
