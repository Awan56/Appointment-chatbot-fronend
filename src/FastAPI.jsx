import { useEffect, useState } from "react";

function ChatApp() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Declare async function inside useEffect
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/user/Usama");
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // Call the async function
  }, []);

  return (
    <div>
      {messages.map((msg, i) => (
        <p key={i}>{msg}</p>
      ))}
    </div>
  );
}

export default ChatApp;
