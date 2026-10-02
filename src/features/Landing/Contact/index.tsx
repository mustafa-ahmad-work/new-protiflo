"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Contact() {
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactChannels = [
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: "mustafa.ahmad.work@gmail.com",
      href: "mailto:mustafa.ahmad.work@gmail.com"
    },
    {
      icon: Phone,
      label: t("contact.phoneLabel"),
      value: "(+20) 01120354592",
      href: "https://wa.me/201120354592"
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "mustafa-ahmad-work",
      href: "https://github.com/mustafa-ahmad-work"
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      value: "mustafa-ahmad-work",
      href: "https://linkedin.com/in/mustafa-ahmad-work"
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = isRTL
      ? `مرحباً مصطفى، أنا ${formData.name}%0Aالموضوع: ${formData.subject}%0Aالرسالة: ${formData.message}`
      : `Hi Mustafa, I am ${formData.name}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/201120354592?text=${whatsappMsg}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-bg-main relative overflow-hidden border-t border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-10 lg:p-14 bg-bg-surface border border-white/10 rounded-3xl relative overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Direct Info */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-6">
                <span>{t("contact.badge")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-snug mb-4">
                {t("contact.title")}
              </h2>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md mb-8">
                {t("contact.subtitle")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg mb-8">
                {contactChannels.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith("mailto:") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-bg-main border border-white/10 hover:border-primary/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-bg-surface flex items-center justify-center text-primary shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                        <Icon size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{item.label}</p>
                        <p className="text-white font-bold text-[0.60rem] truncate group-hover:text-primary transition-colors">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <a
                href="https://wa.me/201120354592"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-xl shadow-[#25D366]/20 text-xs sm:text-sm"
              >
                <MessageCircle size={18} />
                <span>{t("contact.whatsappDirect")}</span>
              </a>
            </div>

            {/* Form */}
            <div className="bg-bg-main border border-white/10 rounded-[20px] p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-200">{t("contact.fullName")}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t("contact.fullNamePlaceholder")}
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-200">{t("contact.email")}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t("contact.emailPlaceholder")}
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-200">{t("contact.subject")}</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t("contact.subjectPlaceholder")}
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-200">{t("contact.message")}</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 cursor-pointer text-xs sm:text-sm"
                >
                  <span>{t("contact.sendWhatsApp")}</span>
                  <Send size={16} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
