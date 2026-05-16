"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminContextType {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
