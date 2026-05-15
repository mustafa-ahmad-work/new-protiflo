"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Shield, Lock, User, ArrowRight } from "lucide-react";
import bcrypt from "bcryptjs";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error: fetchError } = await supabase
        .from('admins')
        .select('*')
        .eq('username', username.trim())
        .maybeSingle();

      if (fetchError || !data) {
        throw new Error("Invalid username or password");
      }

      // 2. مقارنة كلمة المرور
      let isPasswordMatch = false;
      const storedPassword = data.password_hash;

      // إذا كانت كلمة المرور في الداتابيز مشفرة (تبدأ بـ $2a$ أو $2b$)
      if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$')) {
        try {
          isPasswordMatch = bcrypt.compareSync(password, storedPassword);
        } catch (e) {
          isPasswordMatch = false;
        }
      } else {
        // إذا كانت نصاً عادياً
        isPasswordMatch = storedPassword === password;
      }

      if (!isPasswordMatch) {
        throw new Error("Invalid username or password");
      }

      // Success
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="grid-overlay" />
      <div className="glow-orb top-[-10%] right-[-10%] opacity-20" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-10 border-white/10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
              <Shield className="text-purple-500" size={32} />
            </div>
            <h1 className="text-3xl font-black mb-2">Secure Access</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to access the command center.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Terminal Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 focus:border-purple-500/50 outline-none transition-all text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-5 py-4 focus:border-purple-500/50 outline-none transition-all text-white"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center font-bold bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-purple-600/20"
            >
              Initialize Session <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <button 
              onClick={() => router.push("/")}
              className="text-gray-500 hover:text-white text-xs font-bold transition-colors"
            >
              ← Back to Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
