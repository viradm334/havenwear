"use client";

import ChatBox from "@/components/ui/ChatBox";
import { useState } from "react";

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen">
        <button className="outline-none rounded-2xl px-3 py-2 cursor-pointer bg-green-600 hover:bg-green-700 transition text-white" onClick={() => setIsOpen(true)}>Chat</button>
      <ChatBox role={"ADMIN"} isOPen={isOpen} onClose={() => {setIsOpen(false)}} />
    </div>
  );
}
