"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminProvider, useAdmin } from "@/components/providers/AdminProvider";

function AdminLayoutContent({ children, theme, toggleTheme }: { children: React.ReactNode, theme: string, toggleTheme: () => void }) {
  const { isSidebarOpen, setSidebarOpen } = useAdmin();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("isAdmin");
    if (auth !== "true") {
      router.push("/login");
    } else {
      setIsAdmin(true);
    }
  }, []);

  if (!isAdmin) return null;

  const activeTab = pathname.split("/").pop() || "dashboard";

  return (
    <div className={`min-h-screen flex overflow-hidden transition-colors duration-500 bg-[var(--admin-bg)] text-[var(--admin-text)]`}>
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={(tab) => router.push(`/admin/${tab}`)}
        onLogout={() => {
          localStorage.removeItem("isAdmin");
          router.push("/");
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        theme={theme as any}
        toggleTheme={toggleTheme}
      />

      <main className="flex-grow h-screen overflow-y-auto w-full relative">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") document.documentElement.classList.add("light-theme");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-theme", newTheme);
    if (newTheme === "light") {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  };

  return (
    <AdminProvider>
      <AdminLayoutContent theme={theme} toggleTheme={toggleTheme}>
        {children}
      </AdminLayoutContent>
    </AdminProvider>
  );
}
