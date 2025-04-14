import React, { useState, useRef } from "react";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const fileInputRef = useRef();

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
    inputRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const isImage = file.type.startsWith("image/");
      const fileData = {
        url: reader.result,
        name: file.name,
        type: isImage ? "image" : "file",
      };
      onSend("", "user", fileData);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 border-t border-gray-700 bg-gray-800 flex items-center gap-2">
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-full bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Chat input"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        className="text-white text-xl hover:text-blue-400"
        title="Attach file"
      >
        📎
      </button>
      <button
        onClick={handleSend}
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition"
      >
        ➤
      </button>
    </div>
  );
};

export default React.memo(ChatInput);
