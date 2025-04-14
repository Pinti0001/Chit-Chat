import React, { useEffect, useState, useCallback } from "react";
import ChatContainer from "./MessageBar.jsx";
import ChatInput from "./ChatInput.jsx";
import { loadMessages, saveMessages } from "./Utils.jsx";

const Chat = () => {
  const [messages, setMessages] = useState(loadMessages);

  const addMessage = useCallback((text, sender = "user", file = null) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date().toISOString(),
      file,
    };
    setMessages((prev) => {
      const updated = [...prev, newMessage];
      saveMessages(updated);
      return updated;
    });
  }, []);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.sender === "user") {
      const timeout = setTimeout(() => {
        addMessage("Hi, I’m your chatbot. How can I help you?", "bot");
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [messages, addMessage]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md h-[90vh] bg-gray-800 rounded-2xl shadow-lg flex flex-col">
        <div className="flex justify-center items-center px-4 py-3 border-b border-gray-700 bg-gray-800 rounded-t-2xl">
          <h1 className="text-lg font-semibold text-white">Chat</h1>
        </div>

        <ChatContainer messages={messages} />
        <ChatInput onSend={addMessage} />
      </div>
    </div>
  );
};

export default Chat;
