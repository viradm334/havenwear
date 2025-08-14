"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-gray-900 py-10 px-6 mt-auto">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col md:w-1/3">
          <p className="font-bold text-sm mb-3">Services</p>
          <ul className="text-sm space-y-2">
            <li>Purchases</li>
            <li>Shipping</li>
            <li>Complaints</li>
          </ul>
        </div>

        <div className="flex flex-col md:w-1/3">
          <p className="font-bold text-sm mb-3">About Us</p>
          <p className="text-sm leading-relaxed">
            Havenwear offers effortlessly stylish women's clothing with a
            down-to-earth, casual vibe—comfortable pieces designed for everyday
            living, from cozy mornings to laid-back outings.
          </p>
        </div>

        <div className="flex flex-col md:w-1/3">
          <p className="font-bold text-sm mb-3">Find Us</p>
          <div className="flex gap-4">
            <Image
              src="/facebook.svg"
              width={30}
              height={30}
              alt="facebook-logo"
            />
            <Image src="/tiktok.svg" width={30} height={30} alt="tiktok-logo" />
            <Image
              src="/instagram.svg"
              width={30}
              height={30}
              alt="instagram-logo"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
