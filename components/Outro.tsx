"use client";

import { motion } from "framer-motion";

interface OutroProps {
    message: string;
}

export default function Outro({ message }: OutroProps) {
    return (
        <section className="h-screen flex flex-col items-center justify-center relative bg-white/50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="max-w-2xl w-full bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-sm border border-foreground/5 mx-4"
            >
                <div className="font-serif text-lg md:text-xl text-foreground whitespace-pre-line leading-loose text-justify tracking-wide">
                    {message}
                </div>
            </motion.div>

            <footer className="absolute bottom-6 text-sm text-foreground/32 font-sans">
                © 2025 For My Babe
            </footer>
        </section>
    );
}
