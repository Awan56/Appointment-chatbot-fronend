import React from "react";
import { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-amber-400 text-center text-2xl font-bold mb-4  ">
        Appointment ChatBot
      </h2>

      <div className="border border-gray-300 h-72 overflow-y-scroll p-3 mb-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border border-gray-300 outline-none  px-3 py-2 focus:outline-none focus:ring-2 rounded-l-2xl focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-amber-500 text-white px-4 py-2  hover:bg-blue-600 rounded-r-2xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
