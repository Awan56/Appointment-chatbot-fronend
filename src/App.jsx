import React, { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-md px-4 py-2 rounded-2xl shadow-lg text-white text-sm break-words ${
          isUser ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);

  // Handle session UUID using localStorage
  useEffect(() => {
    let sessionId = localStorage.getItem("session_uuid");
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem("session_uuid", sessionId);
    }
  }, []);

  // Auto scroll
  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const sessionId = localStorage.getItem("session_uuid");
      const res = await fetch("https://appointment-chatbot.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_text: input, session_id: sessionId }),
      });
      const data = await res.json();
      const botMessage = { role: "bot", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-2xl h-[80vh] bg-gray-800 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div
          className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-700"
          ref={chatContainerRef}
        >
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} role={msg.role} content={msg.content} />
          ))}
        </div>
        <div className="p-4 bg-gray-700">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            rows="2"
            placeholder="Type your message..."
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
          ></textarea>
          <button
            onClick={sendMessage}
            className="mt-2 w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
