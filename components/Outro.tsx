"use client";

import { motion } from "framer-motion";
import TypewriterText from "./TypewriterText";
import PeelReveal from "./PeelReveal";

interface OutroProps {
    message: string;
    message2?: string;
}

export default function Outro({ message, message2 }: OutroProps) {
    if (message2) {
        return (
            <section className="relative bg-background">
                <PeelReveal
                    overlayContent={
                        <div className="max-w-2xl px-8 md:px-0">
                            <div className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 whitespace-pre-line">
                                <TypewriterText text={message} speed={0.05} />
                            </div>
                        </div>
                    }
                >
                    {(isRevealed) => (
                        <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl px-8 md:px-0 relative">
                            <div className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 whitespace-pre-line">
                                <TypewriterText
                                    text={message2}
                                    speed={0.05}
                                    startOnView={false} // Use manual trigger
                                    delay={0.5}
                                    // We trigger it by rendering it conditionally or passing prop?
                                    // TypewriterText uses `animate={!startOnView ? "visible" : undefined}`
                                    // If we conditionally render this component ONLY when `isRevealed` is true, it works.
                                    // Or we can pass a `trigger` prop to TypewriterText if we modify it.
                                    // FOR NOW: Let's rely on conditional rendering from the parent's logic if possible,
                                    // but here typeWriterText is mounted. 
                                    // Actually, if we use `startOnView={true}` (default) inside the container, 
                                    // it works because the container is in view?
                                    // But we want it to start specifically when revealed.
                                    // Let's rely on basic "startOnView={true}" because the container IS the viewport.
                                    // Wait, the back layer is technically "in view" even when covered?
                                    // Yes, `opacity: 1` z-index 0.
                                    // So `whileInView` might trigger early.

                                    // Hack: Key change forces remount/restart.
                                    key={isRevealed ? "revealed" : "hidden"}
                                />
                            </div>

                            {/* Footer only on the very last view */}
                            <footer className="absolute bottom-8 left-0 w-full text-center py-8 opacity-60">
                                <p className="text-xs font-serif tracking-widest text-muted-foreground">
                                    CREATED FOR YOU • 2025
                                </p>
                            </footer>
                        </div>
                    )}
                </PeelReveal>
            </section>
        );
    }

    // Legacy single message behavior (fallback)
    return (
        <section className="min-h-[50vh] flex flex-col items-center justify-center py-20 bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl px-8 text-center"
            >
                <div className="font-serif text-lg md:text-xl leading-relaxed text-foreground/80 whitespace-pre-line mb-20">
                    <TypewriterText text={message} speed={0.05} />
                </div>
            </motion.div>

            <footer className="w-full text-center py-8 opacity-60">
                <p className="text-xs font-serif tracking-widest text-muted-foreground">
                    CREATED FOR YOU • 2025
                </p>
            </footer>
        </section>
    );
}
