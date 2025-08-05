"use client";

import { handleLogout } from "@/lib/handleLogout";
import { useRouter } from "next/navigation";

export default function UserHome() {
  const router = useRouter();
  return (
    <>
      <h1>Halo user</h1>
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
