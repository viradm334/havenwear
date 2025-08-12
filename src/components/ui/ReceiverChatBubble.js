"use client";

import dayjs from "dayjs";

export default function ReceiverChatBubble({ content, timestamp }) {
  return (
    <div className="flex justify-start mb-2">
      <div className="receiver-bubble max-w-[50%] bg-white outline-gray-300 outline-1 rounded-md p-2 shadow-sm">
        <div>{content}</div>
        <div className="text-right text-xs text-gray-500 mt-1">
          {dayjs(timestamp).format("HH:mm")}
        </div>
      </div>
    </div>
  );
}
