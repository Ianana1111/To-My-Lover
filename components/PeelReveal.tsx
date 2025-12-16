"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface PeelRevealProps {
    children: React.ReactNode | ((isRevealed: boolean) => React.ReactNode);
    overlayContent: React.ReactNode;
    onReveal?: () => void;
}

export default function PeelReveal({ children, overlayContent, onReveal }: PeelRevealProps) {
    const targetRef = useRef<HTMLDivElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    // Monitor scroll to trigger reveal state
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest > 0.95 && !isRevealed) {
            setIsRevealed(true);
            onReveal?.();
        }
    });

    // Simplified Peel Effect:
    // Instead of dissolving/clipping the content (which looks digital),
    // we Physically move the whole page off-screen to the top-left.
    // This simulates "tearing the page off" the pad.

    // 1. Rotation: Tilts up as if pulled from the corner.
    const rotate = useTransform(scrollYProgress, [0, 1], [0, -35]);

    // 2. Translation: Moves diagonally up and left.
    // Use vh/vw to ensure it exits completely.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "-120%"]);

    // 3. Shadow: Increases intensity as it lifts
    const shadowOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.5]);
    const boxShadow = useTransform(shadowOpacity, (val) => `10px 10px 30px rgba(0,0,0,${val})`);

    // 4. Opacity: Fades out only at the very end to prevent abrupt disappearance
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    // Static Clip Path for "Torn Edge" look? 
    // Let's keep it clean paper for now, but the motion is the key.
    // If we want a jagged edge, we'd apply it to the bottom/right permanently.
    // But a clean "Slide off" is more elegant for this design.

    return (
        <div ref={targetRef} className="relative h-[250vh]">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

                {/* Back Layer (Revealed) */}
                <div className="absolute inset-0 z-0 flex items-center justify-center bg-background w-full h-full">
                    <div className="w-full h-full flex items-center justify-center relative scale-95 opacity-80 animate-in fade-in duration-1000">
                        {typeof children === 'function' ? children(isRevealed) : children}
                    </div>
                </div>

                {/* Front Layer (Overlay - Being Peeled) */}
                <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center bg-[#fdfbf6] origin-top-left border border-gray-100/20"
                    style={{
                        x,
                        y,
                        rotate,
                        opacity,
                        boxShadow
                    }}
                >
                    <div className="relative w-full h-full flex items-center justify-center p-8 md:p-20">
                        {overlayContent}

                        {/* Visual cue for scrolling */}
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-pulse">
                            <span className="text-xs font-serif tracking-widest uppercase text-gray-400">Scroll to Reveal</span>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
