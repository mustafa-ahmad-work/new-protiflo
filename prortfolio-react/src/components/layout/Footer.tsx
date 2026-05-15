import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-[var(--border-main)] bg-[var(--bg-main)] relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-left">
            <h3 className="text-2xl font-black mb-2 text-[var(--text-main)]">
              MOSTAFA <span className="text-purple-500">AHMED</span>
            </h3>
            <p className="text-[var(--text-muted)] text-sm font-mono tracking-widest uppercase">
              Software Engineer
            </p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: FaFacebookF, href: "#" },
              { icon: FaLinkedinIn, href: "#" },
              { icon: FaGithub, href: "#" },
              { icon: FaWhatsapp, href: "#" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                className="w-10 h-10 rounded-xl bg-[var(--bg-card)] border border-[var(--border-main)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>

          <div className="text-[var(--text-muted)] text-[10px] font-mono tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
