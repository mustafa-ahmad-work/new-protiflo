"use client";

import { motion } from "framer-motion";
import { Layout, Database, Code2, ShoppingCart, ShieldCheck, RefreshCw } from "lucide-react";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";

const services = [
  {
    title: "Frontend Development",
    desc: "Building immersive, high-performance user interfaces using React, Next.js, and modern CSS frameworks.",
    icon: Layout,
    features: ["SPA & SSR Applications", "Interactive Dashboards", "Animation & GSAP"],
  },
  {
    title: "Backend Architecture",
    desc: "Developing robust server-side systems with Laravel, focusing on security, scalability, and performance.",
    icon: Database,
    features: ["Complex Database Design", "Queue Systems & Caching", "Server Optimization"],
  },
  {
    title: "API Development",
    desc: "Crafting secure and well-documented RESTful and GraphQL APIs for mobile and web integrations.",
    icon: Code2,
    features: ["JWT & OAuth Security", "Swagger Documentation", "Microservices Logic"],
  },
  {
    title: "E-Commerce Solutions",
    desc: "Building complete online stores with integrated payment gateways and inventory management.",
    icon: ShoppingCart,
    features: ["Multi-Vendor Systems", "Custom Checkout Flows", "Stripe & PayPal Setup"],
  },
  {
    title: "Security Audits",
    desc: "Ensuring your application is safe from vulnerabilities and meets industry security standards.",
    icon: ShieldCheck,
    features: ["Pentesting & Scans", "Data Encryption", "GDPR Compliance"],
  },
  {
    title: "Support & Maintenance",
    desc: "Providing continuous monitoring and updates to keep your platforms running smoothly.",
    icon: RefreshCw,
    features: ["24/7 Server Monitoring", "Bug Fixing & Updates", "Performance Reports"],
  },
];

export default function Services() {
  return (
    <Section id="services">
      <SectionHeader 
        subtitle="SOLUTIONS" 
        title="Specialized Services" 
        description="Providing end-to-end technical excellence for modern digital products."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass-card p-10 hover:border-purple-500/30 group transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition duration-500">
              <service.icon className="text-purple-500 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-[var(--text-main)]">{service.title}</h3>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">{service.desc}</p>
            <ul className="text-[11px] text-[var(--text-muted)] space-y-2 font-mono">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
