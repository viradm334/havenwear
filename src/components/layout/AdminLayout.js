"use client";

import React from "react";
import Sidebar from "../nav/Sidebar";
import { useState, useEffect } from "react";

export default function AdminLayout({ title = "Dashboard", children }) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  return (
    <div className="flex">
      {user && (<Sidebar role={user.role} />)}
      <main className="w-5/6 p-10 bg-gray-100">
        <header className="mb-3">
          <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
        </header>
        {children}
      </main>
    </div>
  );
}
