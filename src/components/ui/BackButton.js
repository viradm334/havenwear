"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function BackButton({ destination }) {
  return (
    <div className="px-5 w-full">
      <Link
        href={destination}
        className="flex items-center gap-2 text-gray-700"
      >
        <ArrowLeftIcon className="size-5" />
        <p>Kembali</p>
      </Link>
    </div>
  );
}
