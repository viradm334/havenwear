"use client";

import Link from "next/link";
import { ArrowLeftStartOnRectangleIcon, ChatBubbleLeftIcon, UsersIcon, EnvelopeIcon, ShoppingBagIcon, InboxArrowDownIcon, HomeIcon } from "@heroicons/react/24/solid";

export default function Sidebar() {
  return (
    <div className="flex flex-col w-1/5 bg-gray-800 text-gray-300 min-h-screen pt-3">
      <ul>
        <li></li>
        <li className="font-medium px-3 py-2 hover:bg-gray-900">
          <Link href={"/admin"} className="flex items-center gap-4 mb-1.5">
            <HomeIcon className="size-5" />
            Home
          </Link>
        </li>
        <li className="font-medium px-3 py-2 hover:bg-gray-900">
          <Link href={"/admin/product"} className="flex items-center gap-4 mb-1.5">
            <ShoppingBagIcon className="size-5" />
            Products
          </Link>
        </li>
        <li className="font-medium px-3 py-2 hover:bg-gray-900">
          <Link href={"/product"} className="flex items-center gap-4 mb-1.5">
            <InboxArrowDownIcon className="size-5" />
            Orders
          </Link>
        </li>
        <li className="font-medium px-3 py-2 hover:bg-gray-900">
          <Link href={"/product"} className="flex items-center gap-4 mb-1.5">
            <ChatBubbleLeftIcon className="size-5" />
            Chats
          </Link>
        </li>
        <li className="font-medium px-3 py-2 hover:bg-gray-900">
          <Link href={"/product"} className="flex items-center gap-4 mb-1.5">
            <UsersIcon className="size-5" />
            Users
          </Link>
        </li>
        <li className="font-semimedium  px-3 py-2 hover:bg-gray-900">
          <Link href={"/product"} className="flex items-center gap-4 mb-1.5">
            <EnvelopeIcon className="size-5" />
            Complaints
          </Link>
        </li>
        <li className="font-medium  px-3 py-2 hover:bg-gray-900">
          <Link href={"/product"} className="flex items-center gap-4 mb-1.5">
            <ArrowLeftStartOnRectangleIcon className="size-5" />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
