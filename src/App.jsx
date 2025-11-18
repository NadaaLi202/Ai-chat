import React, { useState } from "react";
import Header from "./components/Header.jsx";
import ChatMessage from "./components/ChatMessage.jsx";
import { formatTime, getRandomResponse } from "../utils/chatUtils.js";
import LoadingIndicator from "./components/LoadingIndicator.jsx";
import ChatInput from "./components/ChatInput.jsx";
import { generateContent } from "./Services/geminiApi.js"

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setinput] = useState("");
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Hello, how can I help you today?",
    sender: "bot",
    timestamp: new Date(),
  }])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const messageText = input;

    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setinput("");
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const botText = await generateContent(messageText);

        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: botText,
          sender: "bot",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        console.error(err);
        const errorMessage = {
          id: (Date.now() + 2).toString(),
          text: "Failed to get response from API.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {messages.map((message) => {
            return (
              <ChatMessage
                key={message.id}
                darkMode={darkMode}
                messages={message}
                formatTime={formatTime}
              />
            );
          })}
          {isLoading && <LoadingIndicator darkMode={darkMode} />}
        </div>
      </div>
      <ChatInput
        darkMode={darkMode}
        input={input}
        setinput={setinput}
        loading={isLoading}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

export default App;