"use client";

import React from "react";
import Sidebar from "../nav/Sidebar";
import { useState, useEffect } from "react";
import Navbar from "../nav/Navbar";
import Footer from "../nav/Footer";
import ChatBox from "../ui/ChatBox";

export default function UserLayout({ title = "Home", children }) {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} onToggleChat={() => setIsOpen((prev) => !prev)}  />
        <main className="flex-grow max-w-6xl p-6">
          <header className="mb-3">
            <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
          </header>
          {React.cloneElement(children, { user })}
        </main>
        <ChatBox role={"USER"} isOpen={isOpen} onClose={() => {setIsOpen(false)}} userId={user.id} />
        <Footer/>
    </div>
  );
}
