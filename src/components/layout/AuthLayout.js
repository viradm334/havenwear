"use client";

import React from "react";
import Footer from "../nav/Footer";
import Navbar from "../nav/Navbar";

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-emerald-500  to-teal-400">
      <Navbar />
      <main className="flex-grow flex justify-center items-center p-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
