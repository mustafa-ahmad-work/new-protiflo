"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Theme, ThemeContextType } from "@/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const activeTheme: Theme = savedTheme || (mediaQuery.matches ? "dark" : "light");

    document.documentElement.classList.toggle("dark", activeTheme === "dark");

    const timer = setTimeout(() => {
      setThemeState(activeTheme);
      setMounted(true);
    }, 0);

    const listener = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        const nextTheme: Theme = e.matches ? "dark" : "light";
        setThemeState(nextTheme);
        document.documentElement.classList.toggle("dark", e.matches);
      }
    };

    mediaQuery.addEventListener("change", listener);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <div className={!mounted ? "opacity-95" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

