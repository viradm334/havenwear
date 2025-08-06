"use client";

import Sidebar from "@/components/nav/Sidebar";
import { handleLogout } from "@/lib/handleLogout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserHome() {
  const router = useRouter();
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);
  return (
    <>
      <h1>Halo user</h1>
      {user && <p>{user.name}</p>}
      <Sidebar/>
      <button
        type="button"
        onClick={() => handleLogout(router)}
        className="cursor-pointer outline-1 outline-gray-700 rounded-md px-3 py-2"
      >
        Logout
      </button>
    </>
  );
}
