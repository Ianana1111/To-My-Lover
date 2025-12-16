"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NarrativeTextProps {
    text: string;
    className?: string;
}

export default function NarrativeText({ text, className }: NarrativeTextProps) {
    const lines = text.split("\n");

    return (
        <div className={cn("py-32 flex flex-col items-center justify-center text-center px-6", className)}>
            <div className="w-px h-12 bg-accent/30 mb-8" />
            <div className="max-w-xl space-y-4">
                {lines.map((line, i) => (
                    <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.2 }}
                        viewport={{ once: true, margin: "-10%" }}
                        className="font-serif text-xl md:text-2xl text-foreground"
                    >
                        {line}
                    </motion.p>
                ))}
            </div>
            <div className="w-px h-12 bg-accent/30 mt-8" />
        </div>
    );
}
