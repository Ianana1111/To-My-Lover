"use client";

import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackgroundMusicProps {
    shouldPlay?: boolean;
}

export default function BackgroundMusic({ shouldPlay = false }: BackgroundMusicProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() => {
        // Trigger from External Prop (Envelope Click)
        if (shouldPlay && audioRef.current && !isPlaying && !error) {
            audioRef.current.volume = 0.2;
            audioRef.current.play()
                .then(() => setIsPlaying(true))
                .catch((err) => console.log("External play blocked:", err));
        }
    }, [shouldPlay, isPlaying, error]);

    useEffect(() => {
        // Attempt auto-play on mount (often blocked by browser)
        const playAudio = async () => {
            if (audioRef.current && !error) {
                try {
                    audioRef.current.volume = 0.2;
                    // Only auto-play if explicitly told to or via standard autoplay attribute (if we wanted that)
                    // Here we rely on 'shouldPlay' mostly.
                    if (shouldPlay) {
                        await audioRef.current.play();
                        setIsPlaying(true);
                    }
                } catch (err) {
                    console.log("Auto-play blocked, waiting for interaction");
                }
            }
        };
        if (!error) playAudio();

        // Add global interaction listener to start music if muted
        const handleInteraction = () => {
            if (!hasInteracted && audioRef.current && audioRef.current.paused && !error && shouldPlay) {
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
    }, [hasInteracted, error, shouldPlay]);

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
    );
}
