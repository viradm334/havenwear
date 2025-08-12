"use client";

import dayjs from "dayjs";

export default function SenderChatBubble({ content, timestamp }) {
  return (
    <div className="flex justify-end mb-2">
      <div className="sender-bubble max-w-[50%] bg-green-200 rounded-md p-2 shadow-sm">
        <div>{content}</div>
        <div className="text-right text-xs text-gray-500 mt-1">
          {dayjs(timestamp).format("HH:mm")}
        </div>
      </div>
    </div>
  );
}
