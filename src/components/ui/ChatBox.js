"use client";

import { useState, useEffect, useRef } from "react";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ReceiverChatBubble from "@/components/ui/ReceiverChatBubble";
import SenderChatBubble from "@/components/ui/SenderChatBubble";
import UserBox from "@/components/ui/UserBox";
import { pusherClient } from "@/lib/pusherClient";
import { v4 as uuidv4 } from "uuid";

export default function ChatBox({ role, isOpen, onClose, userId }) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [targetUserId, setTargetUserId] = useState(null);
  const [chatPartnerName, setChatPartnerName] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [channel, setChannel] = useState(null);
  const [latestMessages, setLatestMessages] = useState({});
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [userInput]);

  useEffect(() => {
    if (!userId) return;

    const newchannel = pusherClient.subscribe(`chat-${userId}`);
    setChannel(newchannel);
    console.log(userId);

    newchannel.bind("pusher:subscription_succeeded", () => {
      console.log("Successfully subscribed to channel:", newchannel.name);
    });

    newchannel.bind("pusher:subscription_error", (status) => {
      console.error("Subscription failed:", status);
    });

    newchannel.bind("test-event", (data) => {
      console.log("Event hit!", data.note);
    });

    newchannel.bind("new-message", (data) => {
      console.log("Received new-message:", data);
      setMessages((prev) => {
        const exists = prev.some((msg) => msg.id === data.id);
        return exists ? prev : [...prev, data];
      });
      setLatestMessages({
        ...latestMessages, 
        [data.senderId] : data.content
      });
    });
  }, [userId]);

  useEffect(() => {
    return () => {
      // channel.unbind_all();
      // channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userId) return;

    if (role === "USER") {
      fetch(`/api/chat/user/messages/${userId}`)
        .then((res) => res.json())
        .then((data) => setMessages(data.messages));
    } else if (role === "ADMIN") {
      fetch(`/api/chat/admin/messages`)
        .then((res) => res.json())
        .then((data) => {
          setChatList(data.latestMessages);
          data.latestMessages.forEach(element => {
            console.log(element);
            setLatestMessages((prev) => ({
              ...prev, 
              [element.senderId] : element.content
            }))
          });
        });
    }
  }, [userId]);

  if (!isOpen) return null;

  const getConversationWithUser = async (id) => {
    const res = await fetch(`/api/chat/admin/${id}`);
    const data = await res.json();
    setMessages(data.messages);
    setTargetUserId(id);
    setChatPartnerName(data.chatPartnerName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tempId = uuidv4();

    const newMessage = {
      id: tempId,
      content: userInput,
      senderId: userId,
      created_at: new Date().toISOString(),
    };

    // Optimistically update UI
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await fetch(`/api/chat/create`, {
        method: "POST",
        body: JSON.stringify({
          content: userInput,
          senderId: userId,
          role: role,
          targetUserId: targetUserId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempId ? data.chat : msg))
        );
        setLatestMessages({
          ...latestMessages, 
          [targetUserId] : userInput
        });
        setUserInput("");
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

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
            onClick={onClose}
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>

        {/* Body */}
        <div className="chat-body flex flex-grow overflow-hidden">
          {/* Chat List */}
          {role === "ADMIN" && (
            <div className="chat-list w-1/3 h-full outline-1 outline-gray-300 flex flex-col overflow-y-auto">
              {chatList.map((chat, index) => (
                <UserBox
                  onClick={() => getConversationWithUser(chat.senderId)}
                  key={index}
                  imageUrl={"/placeholder.jpg"}
                  username={chat.sender.name}
                  latestMessage={latestMessages[chat.senderId]}
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
            <div className="receiver-box h-[10%] outline-1 outline-gray-300 text-xs text-gray-800 font-semibold p-2 truncate">
              {role === "USER" ? "Admin" : chatPartnerName}
            </div>

            {/* Messages */}
            <div className="main flex-grow p-2 flex flex-col text-xs text-gray-800 overflow-y-auto">
              {/* Chat bubbles */}
              {messages.map((message, index) => {
                if (message.senderId === userId) {
                  return (
                    <SenderChatBubble
                      content={message.content}
                      timestamp={message.created_at}
                      key={index}
                    />
                  );
                } else {
                  return (
                    <ReceiverChatBubble
                      content={message.content}
                      timestamp={message.created_at}
                      key={index}
                    />
                  );
                }
              })}
            </div>

            {/* Input */}
            <div className="user-input w-full outline-1 outline-gray-300 p-2 text-xs text-gray-800 bg-white">
              <form className="flex items-end gap-2" onSubmit={handleSubmit}>
                <textarea
                  ref={textareaRef}
                  className="w-full max-h-[80px] overflow-y-auto resize-none border-none outline-none focus:ring-0 text-xs text-gray-800 placeholder:text-gray-400 overflow-hidden"
                  placeholder="Ketik pesan anda disini..."
                  value={userInput}
                  name="userInput"
                  onChange={(e) => setUserInput(e.target.value)}
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
