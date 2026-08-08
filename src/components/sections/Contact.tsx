"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactInfo = [
    { icon: MapPin, label: "الموقع الجغرافي", value: "مصر، القاهرة / قنا" },
    { icon: Phone, label: "الهاتف والواتساب", value: "(+20) 01092434027" },
    { icon: Mail, label: "البريد الإلكتروني", value: "mustafa.ahmad.work@gmail.com" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMsg = `مرحباً مصطفى، أنا ${formData.name}%0Aالموضوع: ${formData.subject}%0Aالرسالة: ${formData.message}`;
    window.open(`https://wa.me/201092434027?text=${whatsappMsg}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-bg-main relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8 sm:p-14 bg-bg-surface border border-white/10 rounded-[24px] relative overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Direct Info */}
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest bg-primary px-5 py-2 rounded-full border border-white/20 shadow-lg shadow-primary/30 mb-6">
                <span>تواصل معنا</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white leading-snug mb-4">
                ابدأ رحلتك معنا وسنحوّل <br />
                <span className="text-primary">فكرتك إلى واقع رقمي!</span>
              </h2>
              <p className="text-text-muted text-base leading-relaxed max-w-md mb-8">
                يسعدنا مناقشة التفاصيل التقنية لمشروعك، وتقديم الاستشارة والمساعدة اللازمة لبناء نظام برمجي متكامل ومميز.
              </p>

              <div className="space-y-6 pt-4">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-[15px] bg-bg-main border border-white/10">
                      <div className="w-12 h-12 rounded-xl bg-bg-surface flex items-center justify-center text-primary shrink-0 border border-white/10">
                        <Icon size={22} />
                      </div>
                      <div>
                        <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{item.label}</p>
                        <p className="text-white font-bold text-sm sm:text-base">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href="https://wa.me/201092434027"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-[#25D366]/20"
              >
                <MessageCircle size={20} />
                <span>المحادثة المباشرة على الواتساب</span>
              </a>
            </div>

            {/* Form */}
            <div className="bg-bg-main border border-white/10 rounded-[20px] p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-200">الاسم بالكامل</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="مصطفى أحمد"
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary outline-none transition-all text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-200">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@domain.com"
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary outline-none transition-all text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-200">موضوع المشروع</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="تطوير موقع أو تطبيق هاتف"
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary outline-none transition-all text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-200">تفاصيل الرسالة</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="اكتب تفاصيل مشروعك هنا..."
                    className="w-full bg-bg-surface border border-white/10 rounded-xl px-4 py-3.5 focus:border-primary outline-none transition-all text-white text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#5337FF]/30"
                >
                  <span>إرسال الرسالة</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
