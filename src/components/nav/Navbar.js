"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white sticky flex p-3 justify-between">
      <Image src={"/havenwear.png"} alt="logo" width={120} height={60} />
      <div className="">
        <ul className="flex gap-2">
          <li className="text-slate-600 font-medium">Products</li>
          <li className="text-slate-600 font-medium">Categories</li>
        </ul>
      </div>
    </nav>
  );
}
