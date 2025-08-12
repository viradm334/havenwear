"use client";

import { useState, useEffect, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ReceiverChatBubble from "@/components/ui/ReceiverChatBubble";
import SenderChatBubble from "@/components/ui/SenderChatBubble";
import UserBox from "@/components/ui/UserBox";

export default function ChatBox({ role }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set to scroll height
    }
  }, [message]);

  const dummyUsers = Array.from({ length: 20 }, (_, i) => ({
    name: `User ${i + 1}`,
    message: `This is a message from user ${i + 1}`,
  }));

  return (
    <>
      <div
        className={`fixed bottom-0 right-0 h-[90%] flex flex-col outline-1 outline-gray-300 shadow-md bg-white ${
          role === "ADMIN" ? "w-1/2" : "w-[350px]"
        }`}
      >
        {/* Header */}
        <div className="chat-header flex justify-between items-center px-3 py-2 border-b border-gray-300 text-sm font-semibold bg-gray-100">
          <span>Chat</span>
          <button
            className="text-red-500 hover:text-red-600 font-bold cursor-pointer"
            title="Close"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="chat-body flex flex-grow overflow-hidden">
          {/* Chat List */}
          {role === "ADMIN" && (
            <div className="chat-list w-1/3 h-full outline-1 outline-gray-300 flex flex-col overflow-y-auto">
              {dummyUsers.map((user, index) => (
                <UserBox
                  key={index}
                  imageUrl={"/placeholder.jpg"}
                  username={user.name}
                  latestMessage={user.message}
                />
              ))}
            </div>
          )}

          {/* Chat Box */}
          <div
            className={`chat-box flex flex-col relative h-full ${
              role === "ADMIN" ? "w-2/3" : "w-full"
            }`}
          >
            {/* Receiver Info */}
            <div className="receiver-box h-[8%] outline-1 outline-gray-300 text-xs text-gray-800 font-semibold p-2 truncate">
              Username
            </div>

            {/* Messages */}
            <div className="main flex-grow p-2 flex flex-col text-xs text-gray-800 overflow-y-auto">
              {/* Chat bubbles */}
              {/* Chat bubbles sender */}
              <SenderChatBubble
                content={"Hello world lorem ipsum lorem ipsum lorem ipdum"}
                timestamp={"2025-08-12T18:52:00.000Z"}
              />
              {/* Chat bubbles receiver */}
              <ReceiverChatBubble
                content={"Hello world lorem ipsum lorem ipsum lorem ipdum"}
                timestamp={"2025-08-12T18:52:00.000Z"}
              />
              <SenderChatBubble
                content={"Hello world lorem ipsum lorem ipsum lorem ipdum"}
                timestamp={"2025-08-12T18:52:00.000Z"}
              />
            </div>

            {/* Input */}
            <div className="user-input w-full outline-1 outline-gray-300 p-2 text-xs text-gray-800 bg-white">
              <form className="flex items-end gap-2">
                <textarea
                  ref={textareaRef}
                  className="w-full max-h-[80px] overflow-y-auto resize-none border-none outline-none focus:ring-0 text-xs text-gray-800 placeholder:text-gray-400 overflow-hidden"
                  placeholder="Ketik pesan anda disini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">
                  <PaperAirplaneIcon className="size-4 text-blue-400 cursor-pointer" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
