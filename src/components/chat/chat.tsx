import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios from "axios";
import Markdown from "react-markdown";

interface ChatMessage {
  party: "bot" | "user";
  message: string;
}

interface ChatResponse {
  data: string;
}

export default function Chat({ videoId }: { videoId: string | undefined }) {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      party: "bot",
      message: "Hello! How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) {
      alert("Please enter a message.");
      return;
    }

    const newMessage: ChatMessage = {
      party: "user",
      message: input,
    };
    const lastChats = messages.slice(-5);
    setMessages((prev) => [...prev, newMessage]);
    const chatResponse = await axios.post<ChatResponse>(
      `${BACKEND_URL}/api/v1/app/chat`,
      {
        link: `https://www.youtube.com/watch?v=${videoId}`,
        lastChats,
        currMessage: input,
      }
    );

    console.log(chatResponse.data);
    setMessages((prev) => [
      ...prev,
      {
        party: "bot",
        message: chatResponse.data.data,
      },
    ]);
    setInput("");
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full h-160 flex flex-col items-center justify-between rounded-2xl overflow-hidden bg-gray-50 shadow-lg">
      <div
        ref={chatContainerRef}
        className="flex-1 w-full overflow-y-auto p-4 space-y-4"
        role="log"
        aria-live="polite"
      >
        {messages.map((chat, index) => (
          <div
            key={index}
            className={`flex ${
              chat.party === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                chat.party === "bot"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <strong className="text-sm">
                  {chat.party === "bot" ? "Bot" : "You"}:
                </strong>
              </div>
              <Markdown>{chat.message}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 w-full p-4 bg-white border-t">
        <Input
          className="flex-1"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Chat input"
        />
        <Button
          onClick={handleSendMessage}
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
