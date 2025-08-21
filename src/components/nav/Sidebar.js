"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleLogout } from "@/lib/handleLogout";
import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftIcon,
  UsersIcon,
  EnvelopeIcon,
  ShoppingBagIcon,
  InboxArrowDownIcon,
  HomeIcon,
  Squares2X2Icon
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function Sidebar({ onToggleChat }) {
  const router = useRouter();

  return (
    <div className="flex flex-col w-1/6 bg-gray-800 text-gray-300 min-h-screen pt-3">
      <ul>
          <>
            <li className="font-medium px-3 py-2">
              <Link href={"/admin"} className="flex items-center gap-4 mb-3">
                <Image src={'/havenwear-white.png'} width={120} height={80} alt="havenwear-logo"/>
              </Link>
            </li>
            <li className="font-medium px-3 py-2 hover:bg-gray-900">
              <Link href={"/admin"} className="flex items-center gap-4 mb-1.5">
                <HomeIcon className="size-5" />
                Home
              </Link>
            </li>
            <li className="font-medium px-3 py-2 hover:bg-gray-900">
              <Link
                href={"/admin/product"}
                className="flex items-center gap-4 mb-1.5"
              >
                <ShoppingBagIcon className="size-5" />
                Products
              </Link>
            </li>
            <li className="font-medium px-3 py-2 hover:bg-gray-900">
              <Link
                href={"/admin/orders"}
                className="flex items-center gap-4 mb-1.5"
              >
                <InboxArrowDownIcon className="size-5" />
                Orders
              </Link>
            </li>
            <li className="font-medium px-3 py-2 hover:bg-gray-900">
              <button
                className="flex w-full items-center gap-4 mb-1.5 cursor-pointer"
                onClick={onToggleChat}
              >
                <ChatBubbleLeftIcon className="size-5" />
                Chats
              </button>
            </li>
            <li className="font-medium px-3 py-2 hover:bg-gray-900">
              <Link
                href={"/admin/users"}
                className="flex items-center gap-4 mb-1.5"
              >
                <UsersIcon className="size-5" />
                Users
              </Link>
            </li>
            <li className="font-medium px-3 py-2 hover:bg-gray-900">
              <Link
                href={"/admin/categories"}
                className="flex items-center gap-4 mb-1.5"
              >
                <Squares2X2Icon className="size-5" />
                Categories
              </Link>
            </li>
            <li className="font-medium  px-3 py-2 hover:bg-gray-900">
              <Link
                href={"/admin/complaints"}
                className="flex items-center gap-4 mb-1.5"
              >
                <EnvelopeIcon className="size-5" />
                Complaints
              </Link>
            </li>
          </>
        <li className="font-medium  px-3 py-2 hover:bg-gray-900">
          <button
            type="button"
            onClick={() => handleLogout(router)}
            className="flex items-center gap-4 mb-1.5 cursor-pointer w-full"
          >
            <ArrowLeftStartOnRectangleIcon className="size-5" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
