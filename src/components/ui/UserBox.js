"use client";

import Image from "next/image";

export default function UserBox({ username, latestMessage, imageUrl }) {
  return (
    <div className="user-box w-full flex items-center gap-3 p-2 border-b border-gray-200">
      <div className="user-avatar w-[40px] h-[40px] shrink-0">
        <Image
          src={imageUrl}
          width={40}
          height={40}
          alt="user-avatar"
          className="rounded-full object-cover w-full h-full"
        />
      </div>
      <div className="user-text flex flex-col w-0 flex-grow">
        <div className="username text-gray-700 font-semibold text-xs truncate">
          {username}
        </div>
        <div className="user-chat text-gray-500 text-xs truncate">
          {latestMessage}
        </div>
      </div>
    </div>
  );
}
