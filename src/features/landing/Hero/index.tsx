"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Download, ArrowLeft, ArrowRight, Terminal, Code2, Zap, Braces } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Hero() {
    const { t, isRTL } = useLanguage();

    return (
        <section className="min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative" id="hero">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-12 relative z-10">

                {/* Left / Info Column */}
                <section className="w-full lg:w-[54%] xl:w-[52%] flex flex-col justify-center text-center lg:text-start z-20">
                    <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal mb-2 tracking-wide">
                        {t("hero.greeting")}
                    </p>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2 sm:mb-3">
                        {t("hero.nameFirst")} <span className="text-primary">{t("hero.nameLast")}</span>
                    </h2>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-4.5xl font-extrabold text-white tracking-tight leading-[1.2] mb-4 sm:mb-5 max-w-2xl mx-auto lg:mx-0">
                        {t("hero.role")}
                    </h1>

                    <p className="text-slate-400 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 mb-7 sm:mb-8">
                        {t("hero.bio")}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-5 mb-8 lg:mb-0">
                        <a
                            href="#contact"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-semibold px-7 py-3.5 rounded-xl shadow-blue-glow border border-white/15 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            <span>{t("hero.downloadCV")}</span>
                            <Download size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                        </a>

                        <a
                            href="#projects"
                            className="group inline-flex items-center gap-2 text-white hover:text-primary text-sm sm:text-base font-medium py-3 px-3 transition-colors duration-200"
                        >
                            <span>{t("hero.moreAboutMe")}</span>
                            {isRTL ? (
                                <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
                            ) : (
                                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                            )}
                        </a>
                    </div>
                </section>

                {/* Right / Person with Scaled-Down Floating Programming Elements */}
                <section className="relative w-full lg:w-[46%] xl:w-[48%] flex justify-center items-end select-none z-10">
                    <div className="relative w-full max-w-60 xs:max-w-[270px] sm:max-w-[320px] md:max-w-87.5 lg:max-w-95 xl:max-w-100 flex items-end justify-center mx-auto">

                        {/* Glow Aura */}
                        <div
                            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[85%] sm:w-[90%] aspect-square rounded-full blur-2xl sm:blur-[60px] lg:blur-[80px] z-0 animate-pulse-glow pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(circle, rgba(0, 98, 255, 0.95) 0%, rgba(7, 83, 224, 0.5) 45%, transparent 72%)",
                            }}
                            aria-hidden="true"
                        />

                        {/* Light Rays Effect */}
                        <Image
                            width={420}
                            height={420}
                            src="/images/effect.png"
                            alt=""
                            className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 w-[125%] sm:w-[130%] max-w-none z-10 mix-blend-screen animate-float-slow pointer-events-none select-none"
                            aria-hidden="true"
                        />

                        {/* Person Image - Scaled Appropriately */}
                        <div className="relative z-20 w-full flex justify-center">
                            <Image
                                width={420}
                                height={420}
                                id="hero-person-img"
                                src="/images/profile.png"
                                alt="Mustafa Ahmad"
                                className="person-mask w-full h-auto object-contain block select-none pointer-events-none transition-transform duration-300 ease-out"
                                priority
                            />
                        </div>

                    </div>
                </section>

            </div>
        </section>
    );
}