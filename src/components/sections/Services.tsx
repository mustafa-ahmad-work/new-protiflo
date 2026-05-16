"use client";

import { motion } from "framer-motion";
import { Layout, Database, Code2, ShoppingCart, ShieldCheck, RefreshCw, ChevronRight } from "lucide-react";
import Section from "../layout/Section";
import SectionHeader from "../layout/SectionHeader";
import { StaggerContainer, StaggerItem } from "../layout/Reveal";

const services = [
  {
    title: "Frontend Engineering",
    desc: "Building immersive, high-performance user interfaces using React, Next.js, and modern CSS frameworks.",
    icon: Layout,
    features: ["SPA & SSR Applications", "Interactive Dashboards", "Advanced Animations"],
    color: "from-blue-600/10 to-purple-600/10"
  },
  {
    title: "Backend Architecture",
    desc: "Developing robust server-side systems with Laravel, focusing on security, scalability, and performance.",
    icon: Database,
    features: ["Complex Database Design", "Queue Systems & Redis", "Server Optimization"],
    color: "from-purple-600/10 to-pink-600/10"
  },
  {
    title: "API Development",
    desc: "Crafting secure and well-documented RESTful and GraphQL APIs for mobile and web integrations.",
    icon: Code2,
    features: ["JWT & OAuth Security", "Swagger Documentation", "Microservices Logic"],
    color: "from-emerald-600/10 to-teal-600/10"
  },
  {
    title: "E-Commerce Ecosystems",
    desc: "Building complete online stores with integrated payment gateways and inventory management.",
    icon: ShoppingCart,
    features: ["Multi-Vendor Systems", "Custom Checkout Flows", "Stripe & PayPal Setup"],
    color: "from-orange-600/10 to-red-600/10"
  },
  {
    title: "Security Intelligence",
    desc: "Ensuring your application is safe from vulnerabilities and meets industry security standards.",
    icon: ShieldCheck,
    features: ["Pentesting & Scans", "Data Encryption", "GDPR Compliance"],
    color: "from-red-600/10 to-purple-600/10"
  },
  {
    title: "Systems Maintenance",
    desc: "Providing continuous monitoring and updates to keep your platforms running smoothly.",
    icon: RefreshCw,
    features: ["24/7 Server Monitoring", "Bug Fixing & Updates", "Performance Reports"],
    color: "from-blue-600/10 to-cyan-600/10"
  },
];

export default function Services() {
  return (
    <Section id="services" className="bg-[var(--bg-main)]">
      <SectionHeader 
        subtitle="SOLUTIONS" 
        title="Specialized Services" 
        description="Providing end-to-end technical excellence for modern digital products."
      />

      <StaggerContainer>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
            {services.map((service, i) => (
            <StaggerItem key={i}>
                <div className="glass-card p-10 hover:border-purple-500/30 group transition-all duration-500 relative overflow-hidden h-full border-[var(--border-main)] shadow-sm hover:shadow-md bg-[var(--bg-card)]">
                    {/* Background Accent - More subtle in Light Mode */}
                    <div className={`absolute top-[-20%] right-[-20%] w-[60%] h-[60%] bg-gradient-to-br ${service.color} blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-8 group-hover:scale-110 transition duration-500">
                            <service.icon className="text-purple-600 dark:text-purple-400 w-7 h-7" />
                        </div>
                        
                        <h3 className="text-2xl font-black mb-4 text-[var(--text-main)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors tracking-tighter">
                            {service.title}
                        </h3>
                        
                        <p className="text-[var(--text-muted)] dark:text-gray-400 text-sm leading-relaxed mb-8 font-medium">
                            {service.desc}
                        </p>
                        
                        <div className="space-y-4 mb-8">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500/40 group-hover:bg-purple-500 transition-colors" />
                                    {feature}
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-500">
                            Learn more <ChevronRight size={14} />
                        </div>
                    </div>
                </div>
            </StaggerItem>
            ))}
        </div>
      </StaggerContainer>
    </Section>
  );
}
