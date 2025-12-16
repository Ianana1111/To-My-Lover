"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnvelopeProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
    onOpen?: () => void;
}

export default function Envelope({ children, title = "To: My Babe", className, onOpen }: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        onOpen?.();
    };

    return (
        <div className={cn("relative flex items-center justify-center w-full", className)}>
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="envelope"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.2, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        onClick={handleOpen}
                        className="cursor-pointer flex items-center justify-center p-8 bg-[#fdfbf6] shadow-xl rounded-lg border-2 border-[#e8dfcf] w-full max-w-sm aspect-[4/3] relative overflow-hidden group"
                    >
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <motion.div
                                animate={{ rotate: [0, -5, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, repeatDelay: 2 }}
                            >
                                <Mail size={80} className="text-[#d4c5a9] group-hover:text-[#c4b599] transition-colors" />
                            </motion.div>

                            <div className="text-center">
                                <div className="font-serif text-xl tracking-widest text-[#8a8170]">
                                    {title}
                                </div>
                                <div className="mt-2 text-xs text-[#b8b0a0] uppercase tracking-wider">
                                    Click to Open
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full flex items-center justify-center"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
