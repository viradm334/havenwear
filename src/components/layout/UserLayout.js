"use client";

import React from "react";
import Sidebar from "../nav/Sidebar";
import { useState, useEffect } from "react";
import Navbar from "../nav/Navbar";
import Footer from "../nav/Footer";

export default function UserLayout({ title = "Home", children }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
        <main className="flex-grow max-w-6xl p-6">
          <header className="mb-3">
            <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
          </header>
          {React.cloneElement(children, { user })}
        </main>
        <Footer/>
    </div>
  );
}
