"use client";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white sticky flex p-3 justify-between">
      <Image src={"/havenwear.png"} alt="logo" width={120} height={60} />
      <div className="">
        <ul className="flex gap-2">
          <li className="text-slate-600 font-medium">Products</li>
          <Link href={'/login'} className="text-slate-600 font-medium">Login</Link>
          <li className="text-slate-600 font-medium"><ShoppingCartIcon className="size-6"/></li>
        </ul>
      </div>
    </nav>
  );
}
