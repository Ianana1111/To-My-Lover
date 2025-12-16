"use client";

import { motion } from "framer-motion";
import Envelope from "./Envelope";
import TypewriterText from "./TypewriterText";

interface IntroCardProps {
    message: string;
    onOpen?: () => void;
}

export default function IntroCard({ message, onOpen }: IntroCardProps) {
    return (
        <section className="min-h-[80vh] flex items-center justify-center py-20 bg-background/50">
            <Envelope title="" onOpen={onOpen}>
                <motion.div
                    className="relative bg-white max-w-md w-full p-8 md:p-12 shadow-2xl rounded-sm transform md:rotate-[-1deg]"
                >
                    <div className="absolute top-0 left-0 w-full h-full border border-gray-100/50 pointer-events-none rounded-sm" />
                    <div className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 whitespace-pre-line min-h-[200px]">
                        <TypewriterText text={message} speed={0.08} startOnView={false} delay={0.5} />
                    </div>
                </motion.div>
            </Envelope>
        </section>
    );
}
