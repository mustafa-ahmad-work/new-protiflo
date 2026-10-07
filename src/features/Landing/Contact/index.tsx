"use client";

import { motion } from "framer-motion";
import {
  Mail, Phone, Send, MessageCircle, CheckCircle2,
  AlertCircle, Loader2, Sparkles, Globe, Server,
  Layout, Code2, Wrench, Lightbulb, Clock, DollarSign
} from "lucide-react";
import { FaGithub, FaLinkedinIn } from "@/components/ui/Icons";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ServiceOption {
  id: string;
  icon: typeof Globe;
  labelAr: string;
  labelEn: string;
}

const serviceOptions: ServiceOption[] = [
  { id: "website", icon: Globe, labelAr: "موقع ويب متكامل", labelEn: "Full Website" },
  { id: "backend", icon: Server, labelAr: "باك إند و APIs", labelEn: "Backend & APIs" },
  { id: "frontend", icon: Code2, labelAr: "فرونت إند تفاعلي", labelEn: "Frontend UI" },
  { id: "erp", icon: Layout, labelAr: "نظام إداري / لوحة تحكم", labelEn: "Admin System / ERP" },
  { id: "custom", icon: Wrench, labelAr: "حل برمجي مخصص", labelEn: "Custom Solution" },
  { id: "consult", icon: Lightbulb, labelAr: "استشارة معمارية", labelEn: "Tech Consultation" },
];

const budgetOptions = [
  { id: "tier1", labelAr: "أقل من $500", labelEn: "< $500" },
  { id: "tier2", labelAr: "$500 - $1,500", labelEn: "$500 - $1,500" },
  { id: "tier3", labelAr: "$1,500 - $3,000", labelEn: "$1,500 - $3,000" },
  { id: "tier4", labelAr: "أكثر من $3,000", labelEn: "> $3,000" },
  { id: "flexible", labelAr: "مرنة / للمناقشة", labelEn: "Flexible / TBD" },
];

const timelineOptions = [
  { id: "urgent", labelAr: "عاجل (أقل من أسبوعين)", labelEn: "Urgent (< 2 weeks)" },
  { id: "month", labelAr: "خلال شهر", labelEn: "Within 1 month" },
  { id: "flexible", labelAr: "مرن حسب المتطلبات", labelEn: "Flexible schedule" },
];

export default function Contact() {
  const { t, isRTL } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "website",
    budget: "flexible",
    timeline: "month",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus("idle");
    setErrorMessage("");

    try {
      const selectedService = serviceOptions.find(s => s.id === formData.serviceType);
      const selectedBudget = budgetOptions.find(b => b.id === formData.budget);
      const selectedTimeline = timelineOptions.find(tm => tm.id === formData.timeline);

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: isRTL ? selectedService?.labelAr : selectedService?.labelEn,
        budget: isRTL ? selectedBudget?.labelAr : selectedBudget?.labelEn,
        timeline: isRTL ? selectedTimeline?.labelAr : selectedTimeline?.labelEn,
        subject: formData.subject || (isRTL ? `طلب ${selectedService?.labelAr}` : `Inquiry for ${selectedService?.labelEn}`),
        message: formData.message,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "فشل إرسال الطلب، يرجى المحاولة لاحقاً");
      }

      setSubmissionStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceType: "website",
        budget: "flexible",
        timeline: "month",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "حدث خطأ غير متوقع";
      setErrorMessage(msg);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppForward = () => {
    const selectedService = serviceOptions.find(s => s.id === formData.serviceType);
    const serviceName = isRTL ? selectedService?.labelAr : selectedService?.labelEn;
    const whatsappMsg = isRTL
      ? `مرحباً مصطفى، أنا ${formData.name}%0Aنوع الطلب: ${serviceName}%0Aالموضوع: ${formData.subject || "طلب مشروع"}%0Aالرسالة: ${formData.message}`
      : `Hi Mustafa, I am ${formData.name}%0AService: ${serviceName}%0ASubject: ${formData.subject || "Project Inquiry"}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/201120354592?text=${whatsappMsg}`, '_blank');
  };

  return (
    <section className="py-24 bg-bg-main relative overflow-hidden border-t border-border-subtle">
      {/* Background Lighting */}
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[350px] bg-primary/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-6 sm:p-10 lg:p-12 bg-bg-surface border border-white/10 rounded-3xl relative overflow-hidden shadow-2xl backdrop-blur-xl"
        >
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14 items-start">

            {/* Left Column: Direct Info & Socials */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-primary border border-white/20 text-xs font-bold text-white shadow-lg shadow-primary/30 mb-4 sm:mb-6">
                <Sparkles size={14} />
                <span>{t("contact.badge")}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                {t("contact.title")}
              </h2>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md mb-8">
                {t("contact.subtitle")}
              </p>

              {/* Direct channels grid */}
              <div className="w-full space-y-4 max-w-lg mb-8">
                {contactChannels.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={i}
                      href={item.href}
                      target={item.href.startsWith("mailto:") ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={`${item.label}: ${item.value}`}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-bg-main/80 border border-white/10 hover:border-primary/50 transition-colors group shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <div className="w-10 h-10 rounded-xl bg-bg-surface flex items-center justify-center text-primary shrink-0 border border-white/10 group-hover:scale-105 transition-transform shadow-xs">
                        <Icon size={18} />
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{item.label}</p>
                        <p className="text-white font-bold text-xs truncate group-hover:text-primary transition-colors">{item.value}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Direct WhatsApp Action */}
              <a
                href="https://wa.me/201120354592"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("contact.whatsappDirect")}
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold px-7 py-3.5 rounded-2xl transition-all shadow-xl shadow-[#25D366]/20 text-xs sm:text-sm hover:scale-[1.02] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <MessageCircle size={18} />
                <span>{t("contact.whatsappDirect")}</span>
              </a>
            </div>

            {/* Right Column: Professional Resend Contact Form */}
            <div className="bg-bg-main/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
              {submissionStatus === "success" ? (
                /* Success Card */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-5"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">
                      {isRTL ? "تم إرسال طلبك بنجاح!" : "Request Sent Successfully!"}
                    </h3>
                    <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                      {isRTL
                        ? `شكراً لتواصلك يا ${formData.name}. تم إرسال تفاصيل مشروعك إلى بريدي الإلكتروني، وسأقوم بالرد عليك خلال أقل من 24 ساعة.`
                        : `Thank you ${formData.name}. Your project request has been dispatched to my inbox. I will reply within 24 hours.`}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleWhatsAppForward}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#25D366]/90 text-white text-xs sm:text-sm font-bold px-6 py-3 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <MessageCircle size={16} />
                      <span>{isRTL ? "إرسال نسخة عبر واتساب أيضاً" : "Also send a copy via WhatsApp"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSubmissionStatus("idle");
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          serviceType: "website",
                          budget: "flexible",
                          timeline: "month",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="w-full sm:w-auto text-xs text-text-muted hover:text-white px-4 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    >
                      {isRTL ? "إرسال طلب آخر" : "Send another request"}
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Main Form */
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* 1. Request Type Selector */}
                  <div className="space-y-2">
                    <label id="service-type-label" className="text-xs font-bold text-gray-200 flex items-center justify-between">
                      <span>{isRTL ? "نوع المشروع / الخدمة المطلوبة *" : "Project Type / Service *"}</span>
                      <span className="text-[10px] text-primary">{isRTL ? "حدد نوع طلبك" : "Select one"}</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="service-type-label"
                      className="flex flex-wrap gap-2.5"
                    >
                      {serviceOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = formData.serviceType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, serviceType: opt.id })}
                            className={`px-3.5 py-2.5 rounded-xl border text-start transition-all inline-flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected
                              ? "bg-primary/20 border-primary text-white shadow-sm shadow-primary/30"
                              : "bg-bg-surface/80 border-white/10 text-gray-300 hover:border-white/30"
                              }`}
                          >
                            <Icon size={16} className={`shrink-0 ${isSelected ? "text-primary" : "text-text-muted"}`} />
                            <span className="text-xs font-semibold whitespace-normal leading-snug">
                              {isRTL ? opt.labelAr : opt.labelEn}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Budget Range Selector */}
                  <div className="space-y-2">
                    <label id="budget-label" className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                      <DollarSign size={14} className="text-emerald-400" />
                      <span>{isRTL ? "الميزانية التقديرية" : "Estimated Budget"}</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="budget-label"
                      className="flex flex-wrap gap-2"
                    >
                      {budgetOptions.map((b) => {
                        const isSelected = formData.budget === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, budget: b.id })}
                            className={`px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer whitespace-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected
                              ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold"
                              : "bg-bg-surface border-white/10 text-text-muted hover:border-white/30"
                              }`}
                          >
                            {isRTL ? b.labelAr : b.labelEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 3. Timeline Selector */}
                  <div className="space-y-2">
                    <label id="timeline-label" className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
                      <Clock size={14} className="text-cyan-400" />
                      <span>{isRTL ? "الإطار الزمني المتوقع" : "Project Timeline"}</span>
                    </label>
                    <div
                      role="radiogroup"
                      aria-labelledby="timeline-label"
                      className="flex flex-wrap gap-2"
                    >
                      {timelineOptions.map((tm) => {
                        const isSelected = formData.timeline === tm.id;
                        return (
                          <button
                            key={tm.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setFormData({ ...formData, timeline: tm.id })}
                            className={`px-3 py-2 rounded-xl border text-xs transition-all cursor-pointer whitespace-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSelected
                              ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold"
                              : "bg-bg-surface border-white/10 text-text-muted hover:border-white/30"
                              }`}
                          >
                            {isRTL ? tm.labelAr : tm.labelEn}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Basic Inputs: Name, Email, Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-bold text-gray-200">
                        {t("contact.fullName")} *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t("contact.fullNamePlaceholder")}
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-bold text-gray-200">
                        {t("contact.email")} *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t("contact.emailPlaceholder")}
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-phone" className="text-xs font-bold text-gray-200">
                        {isRTL ? "رقم الهاتف / واتساب" : "WhatsApp / Phone"}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+20 123 456 789"
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-subject" className="text-xs font-bold text-gray-200">
                        {t("contact.subject")}
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={t("contact.subjectPlaceholder")}
                        className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  {/* 5. Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-bold text-gray-200">
                      {t("contact.message")} *
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isRTL ? "اشرح فكرة مشروعك، المتطلبات الرئيسية، أو أي تفاصيل ترغب بمناقشتها..." : "Describe your project ideas, key requirements, or questions..."}
                      className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3 focus:border-primary outline-none transition-all text-white text-xs sm:text-sm resize-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>

                  {/* Error Alert */}
                  {errorMessage && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400"
                    >
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-primary/50 hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>{isRTL ? "جاري إرسال الطلب " : "Sending"}</span>
                      </>
                    ) : (
                      <>
                        <span>{isRTL ? "إرسال طلب المشروع الآن" : "Submit Project Inquiry"}</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-text-muted">
                    {isRTL ? "سرية كاملة لبياناتك ومشروعك • رد مباشر خلال 24 ساعة" : "100% confidential • Direct response within 24 hours"}
                  </p>
                </form>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
