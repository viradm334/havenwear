"use client";
import Image from "next/image";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { handleLogout } from "@/lib/handleLogout";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ user = null, onToggleChat }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-white sticky top-0 z-50 flex p-3 justify-between shadow-md">
      <Link href={"/"}>
        <Image src={"/havenwear.png"} alt="logo" width={120} height={60} />
      </Link>

      <div className="relative">
        <ul className="flex gap-2 items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(prev => !prev)}
                className="text-gray-700 font-medium flex gap-1 items-center cursor-pointer"
              >
                <UserCircleIcon className="size-5" />
                {user.name}
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-50">
                  <ul className="flex flex-col text-sm text-slate-700">
                    <Link href="/user/profile" className="px-4 py-2 hover:bg-slate-100">Profile</Link>
                    <Link href="/user/orders" className="px-4 py-2 hover:bg-slate-100">Orders</Link>
                    <Link href="/user/wishlist" className="px-4 py-2 hover:bg-slate-100">Wishlist</Link>
                    <Link href="/user/complaints" className="px-4 py-2 hover:bg-slate-100">Complaints</Link>
                    <button className="w-full px-4 py-2 text-start hover:bg-slate-100 cursor-pointer" onClick={onToggleChat}>Chat</button>
                    <p
                      className="px-4 py-2 hover:bg-slate-100 text-red-500 cursor-pointer"
                      onClick={() => {handleLogout(router)}}
                    >
                      Logout
                    </p>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link href={"/login"} className="text-slate-600 font-medium">
              Login
            </Link>
          )}

          <Link href={"/cart"} className="text-gray-700 font-medium">
            <ShoppingCartIcon className="size-6" />
          </Link>
        </ul>
      </div>
    </nav>
  );
}