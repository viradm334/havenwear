"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white flex justify-evenly p-5 mt-auto">
      <div className="flex w-1/3">
        <p className="font-bold text-center">Services</p>
      </div>
      <div className="flex w-1/3">
        <p className="font-bold text-center">About Us</p>
      </div>
      <div className="flex w-1/3">
        <p className="font-bold text-center">Find Us</p>
      </div>
    </footer>
  );
}
