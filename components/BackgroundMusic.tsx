"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        // Attempt auto-play on mount (often blocked by browser)
        const playAudio = async () => {
            if (audioRef.current && !error) {
                try {
                    audioRef.current.volume = 0.2;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Auto-play blocked, waiting for interaction");
                }
            }
        };
        if (!error) playAudio();

        // Add global interaction listener to start music if muted
        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current && audioRef.current.paused && !error) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => { });
                setHasInteracted(true);
            }
        };

        // Listen for ANY interaction to start music
        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('keydown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
        };
    }, [hasInteracted, error]);

    const togglePlay = () => {
        if (audioRef.current && !error) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    if (error) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
            {!isPlaying && (
                <div className="animate-bounce bg-white/90 text-foreground px-3 py-1 rounded-full text-sm font-serif shadow-md border border-accent/20">
                    按我
                </div>
            )}
            <audio
                ref={audioRef}
                src="/audio.mp3"
                loop
                onError={() => {
                    console.error("Audio file not found: /audio.mp3");
                    setError(true);
                }}
                className="hidden"
            />
            <button
                onClick={togglePlay}
                className={cn(
                    "bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 border border-accent/20",
                    isPlaying ? "text-accent animate-spin-slow" : "text-gray-400"
                )}
            >
                {isPlaying ? <Music size={24} /> : <VolumeX size={24} />}
            </button>
        </div>
    );
}
