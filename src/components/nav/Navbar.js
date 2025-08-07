"use client";
import Image from "next/image";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white sticky flex p-3 justify-between">
      <Link href={'/'}>
      <Image src={"/havenwear.png"} alt="logo" width={120} height={60} />
      </Link>
      <div className="">
        <ul className="flex gap-2">
          <Link href={'/login'} className="text-slate-600 font-medium">Login</Link>
          <Link href={'/cart'} className="text-slate-600 font-medium">
          <ShoppingCartIcon className="size-6"/>
          </Link>
        </ul>
      </div>
    </nav>
  );
}
