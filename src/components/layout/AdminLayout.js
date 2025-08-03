"use client";

import React from "react";
import Sidebar from "../nav/Sidebar";

export default function AdminLayout({ title = "Dashboard", children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="w-4/5 p-10 bg-gray-100">
        <header className="mb-3">
          <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
