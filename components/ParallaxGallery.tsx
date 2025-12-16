"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

interface ParallaxGalleryProps {
    images: string[];
    className?: string;
}

export default function ParallaxGallery({ images, className }: ParallaxGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    // Use springs for smooth following
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    // Split images into 3 columns
    const col1 = images.filter((_, i) => i % 3 === 0);
    const col2 = images.filter((_, i) => i % 3 === 1);
    const col3 = images.filter((_, i) => i % 3 === 2);

    // Parallax transforms
    // Column 1 moves faster (upwards)
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const springY1 = useSpring(y1, springConfig);

    // Column 2 moves slower (creates depth, maybe moves downwards relative to scroll or just less upwards)
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const springY2 = useSpring(y2, springConfig);

    // Column 3 moves slightly upwards
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const springY3 = useSpring(y3, springConfig);

    return (
        <div ref={containerRef} className={cn("min-h-screen py-20 px-4 md:px-8 overflow-hidden", className)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-start">
                <Column images={col1} y={springY1} />
                <Column images={col2} y={springY2} className="md:mt-24" />
                <Column images={col3} y={springY3} className="md:mt-12" />
            </div>
        </div>
    );
}


function Column({ images, y, className }: { images: string[]; y: any, className?: string }) {
    return (
        <motion.div style={{ y }} className={cn("flex flex-col gap-6", className)}>
            {images.map((src, idx) => {
                const isVideo = src.toLowerCase().endsWith(".mp4");
                return (
                    <div key={idx} className="relative rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 w-full">
                        {isVideo ? (
                            <VideoItem src={src} />
                        ) : (
                            <div className="relative aspect-[3/4]">
                                <Image
                                    src={src}
                                    alt="Memory"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </motion.div>
    );
}

function VideoItem({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            // If currently muted, we are about to unmute, so set volume
            if (videoRef.current.muted) {
                videoRef.current.volume = 0.2;
            }
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    return (
        <div onClick={toggleMute} className="cursor-pointer relative group">
            <video
                ref={videoRef}
                src={src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover"
            />
            <div className={cn(
                "absolute bottom-3 right-3 bg-black/50 p-2 rounded-full text-white transition-opacity duration-300",
                isMuted ? "opacity-0 group-hover:opacity-100" : "opacity-100"
            )}>
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </div>
        </div>
    );
}
