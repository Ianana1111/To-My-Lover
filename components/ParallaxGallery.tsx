"use client";

import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

// Update ParallaxGallery to support object array and add hover effects.

// 1. Update Interface
interface GalleryItem {
    src: string;
    caption?: string;
    type?: 'image' | 'video'; // optional, can infer from src extension
}

interface ParallaxGalleryProps {
    images: (string | GalleryItem)[]; // Support both for backward compatibility
    className?: string;
}

// 2. Helper to normalize
function normalizeImages(images: (string | GalleryItem)[]): GalleryItem[] {
    return images.map(img => {
        if (typeof img === 'string') {
            return { src: img };
        }
        return img;
    });
}

export default function ParallaxGallery({ images, className }: ParallaxGalleryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const normalizedImages = normalizeImages(images);

    // Use springs for smooth following
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    // Split images into 3 columns
    const col1 = normalizedImages.filter((_, i) => i % 3 === 0);
    const col2 = normalizedImages.filter((_, i) => i % 3 === 1);
    const col3 = normalizedImages.filter((_, i) => i % 3 === 2);

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

function Column({ images, y, className }: { images: GalleryItem[]; y: any, className?: string }) {
    return (
        <motion.div style={{ y }} className={cn("flex flex-col gap-6", className)}>
            {images.map((item, idx) => (
                <GalleryItemComponent key={idx} item={item} />
            ))}
        </motion.div>
    );
}

function GalleryItemComponent({ item }: { item: GalleryItem }) {
    const isVideo = item.src.toLowerCase().endsWith(".mp4");
    const [isClicked, setIsClicked] = useState(false);

    // Toggle click state
    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <motion.div
            whileHover={{ y: -5, rotate: 1, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={handleClick}
            className={cn(
                "relative rounded-sm overflow-hidden shadow-md transition-all duration-500 w-full group cursor-pointer",
                isClicked ? "scale-[1.02] -translate-y-1 rotate-1 shadow-2xl" : "hover:shadow-2xl"
            )}
        >
            {isVideo ? (
                <VideoItem src={item.src} />
            ) : (
                <div className="relative aspect-[3/4]">
                    <Image
                        src={item.src}
                        alt="Memory"
                        fill
                        className="object-cover transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            )}

            {/* Hidden Caption Overlay */}
            {item.caption && (
                <div
                    className={cn(
                        "absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-end justify-center pb-6",
                        isClicked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                >
                    <p
                        className={cn(
                            "text-white/90 text-sm font-serif tracking-widest px-4 text-center transform transition-transform duration-300 delay-100",
                            isClicked ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"
                        )}
                    >
                        {item.caption}
                    </p>
                </div>
            )}
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
