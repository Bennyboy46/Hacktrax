"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import { sendMessage } from "@/lib/api";
import TypingAnimation from "../components/TypingAnimation";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI legal assistant specialized in Indian women's rights. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage(userMessage.content);

      if (response.status === "success") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response.response,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              response.message ||
              "Sorry, I encountered an error. Please try again.",
          },
        ]);
      }
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting to the server. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#7D0D2C]">
      <Navbar />
      <div className="container mx-auto px-4 py-6 mt-16">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg h-[calc(100vh-8rem)] flex flex-col">
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-gray-200/20">
            <h2 className="text-lg font-semibold text-[#450C1C]">
              Legal Assistant
            </h2>
            <p className="text-sm text-gray-600">
              Ask questions about women&apos;s legal rights in India
            </p>
          </div>

          {/* Chat messages */}
          <div className="flex-1 px-6 py-4 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-[#7D0D2C] scrollbar-track-gray-100">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } ${index > 0 ? "mt-2" : ""}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-4 shadow-sm ${
                    message.role === "user"
                      ? "bg-[#D2042D] text-white rounded-tr-none"
                      : "bg-white text-[#450C1C] rounded-tl-none border border-gray-100"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <TypingAnimation
                      text={message.content}
                      className="whitespace-pre-wrap text-[15px] leading-relaxed space-y-2"
                    />
                  ) : (
                    <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                      {message.content}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-[#450C1C] rounded-lg p-3 animate-pulse border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#450C1C] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#450C1C] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#450C1C] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input form */}
          <div className="border-t border-gray-200/20 p-4 bg-white/50">
            <form onSubmit={handleSubmit} className="flex gap-4 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about women's legal rights in India..."
                className="flex-1 rounded-lg border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#7D0D2C] focus:border-transparent text-gray-800 placeholder-gray-500 bg-white"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#D2042D] text-white px-6 py-3 rounded-lg hover:bg-[#A8092D] disabled:bg-opacity-70 transition-colors duration-200 font-medium flex-shrink-0 shadow-sm hover:shadow-md"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
