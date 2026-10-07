"use client";

import Image from "next/image";
import { Download, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Hero() {
  const { t, isRTL } = useLanguage();

  return (
    <section className="min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden relative" id="hero">
      {/* 1. Circuit Board & Developer Grid Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Cyber Code Grid */}
        <div
          className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-size-[3.5rem_3.5rem] mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)]"
        />

        {/* Ambient Glows
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-primary/15 rounded-full blur-[140px]"
        /> */}
        {/* <div
          className="absolute bottom-10 left-10 w-100 h-100 bg-blue-600/10 rounded-full blur-[120px]"
        /> */}

        {/* Tech Circuit SVG Boards */}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-14 relative z-10">

        {/* Left Column: Info & Bio */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center text-center lg:text-start z-20">

          <p className="text-text-muted text-base sm:text-lg lg:text-xl font-normal mb-2 tracking-wide">
            {t("hero.greeting")}
          </p>

          <h1 className="tracking-tight mb-4 sm:mb-5">
            <span className="block text-3xl sm:text-4xl lg:text-5xl font-black text-text-main mb-2 sm:mb-3">
              {t("hero.nameFirst")} <span className="text-primary">{t("hero.nameLast")}</span>
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl xl:text-4.5xl font-extrabold text-text-main leading-tight max-w-2xl mx-auto lg:mx-0">
              {t("hero.role")}
            </span>
          </h1>

          <p className="text-text-muted text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
            {t("hero.bio")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8 lg:mb-0">
            <a
              download
              href="/Mustafa_Ahmad_Full-Stack Web Developer _resume.pdf"
              aria-label={t("hero.downloadCV")}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-hover text-white text-sm sm:text-base font-semibold px-7 py-3.5 rounded-xl shadow-blue-glow border border-white/15 transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{t("hero.downloadCV")}</span>
              <Download size={16} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#about"
              aria-label={t("hero.moreAboutMe")}
              className="group inline-flex items-center gap-2 text-text-main hover:text-primary text-sm sm:text-base font-medium py-3 px-4 rounded-xl hover:bg-bg-surface/50 transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>{t("hero.moreAboutMe")}</span>
              {isRTL ? (
                <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
              ) : (
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              )}
            </a>
          </div>
        </div>

        {/* Right Column: Person with Floating Programming Boards */}
        <div className="relative w-full lg:w-[48%] flex justify-center items-end select-none z-10">

          {/* Main Visual Wrapper */}
          <div className="relative w-full max-w-70 xs:max-w-[320px] sm:max-w-90 md:max-w-100 lg:max-w-107.5 flex items-end justify-center mx-auto">

            {/* Ambient Aura */}
            <div
              className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full blur-2xl sm:blur-[70px] lg:blur-[90px] z-0 animate-pulse-glow pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(0, 98, 255, 0.95) 0%, rgba(7, 83, 224, 0.45) 45%, transparent 72%)",
              }}
              aria-hidden="true"
            />

            {/* Light Rays Effect */}
            {/* <Image
              width={420}
              height={420}
              src="/images/effect.png"
              alt=""
              className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 w-[130%] max-w-none z-10 mix-blend-screen animate-float-slow pointer-events-none select-none"
              aria-hidden="true"
            /> */}

            {/* Person Image - Completely Clear and Unobstructed */}
            <div className="relative z-20 w-full flex justify-center">
              <Image
                width={420}
                height={420}
                id="hero-person-img"
                src="/images/mustafa.webp"
                alt={isRTL ? "مصطفى أحمد - مهندس برمجيات ومطور Full-Stack" : "Mustafa Ahmad - Full-Stack Software Engineer"}
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 420px"
                className="w-full h-auto max-h-200 object-contain block select-none pointer-events-none transition-transform duration-300 ease-out"
                priority
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}