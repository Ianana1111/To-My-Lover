"use client";

import { Monitor, Smartphone } from "lucide-react";

export default function MobileWarning() {
    return (
        <div className="fixed inset-0 z-[9999] bg-[#F9F7F2] flex flex-col items-center justify-center p-8 text-center md:hidden">
            <div className="relative mb-8">
                <Monitor size={64} className="text-[#4A4238]" />
                <div className="absolute -bottom-2 -right-2 bg-[#D4A59A] p-2 rounded-full text-white">
                    <Smartphone size={20} className="line-through" />
                </div>
            </div>
            <h2 className="font-serif text-2xl mb-4 text-[#4A4238]">請使用電腦開啟</h2>
            <p className="font-sans text-[#4A4238]/60 text-sm max-w-xs leading-relaxed">
                {/* 為了獲得最佳的瀏覽體驗與動畫效果，<br /> */}
                請在電腦或較大的螢幕上觀看此頁面。
            </p>
        </div>
    );
}
