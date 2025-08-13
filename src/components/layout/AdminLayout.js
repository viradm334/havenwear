"use client";

import React from "react";
import Sidebar from "../nav/Sidebar";
import { useState, useEffect } from "react";
import ChatBox from "../ui/ChatBox";

export default function AdminLayout({ title = "Dashboard", children }) {
  const [user, setUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="flex">
      {user && (<Sidebar onToggleChat={() => setIsOpen((prev) => !prev)} />)}
      <main className="w-5/6 p-10 bg-gray-100">
        <header className="mb-3">
          <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
        </header>
        {children}
      </main>
      <ChatBox role={"ADMIN"} isOpen={isOpen} onClose={() => {setIsOpen(false)}} userId={user.id} />
    </div>
  );
}
