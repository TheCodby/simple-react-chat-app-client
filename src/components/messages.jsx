import React from "react";
import { useRef, useEffect } from "react";
export default function Messages({ messages }) {
  console.log(messages);
  const messagesContainer = useRef();
  useEffect(() => {
    messagesContainer.current.scrollTo(
      0,
      messagesContainer.current.scrollHeight
    );
  }, [messages]);
  return (
    <div
      ref={messagesContainer}
      className="flex flex-col space-y-4 text-white text-lg overflow-y-auto"
    >
      {messages.map((messageData, index) => (
        <div
          key={index}
          className="w-full hover:bg-neutral-900 py-1 px-4 rounded-lg mt-auto h-auto whitespace-pre-line leading-9 flex flex-col"
        >
          {messages[index - 1]?.nickname !== messageData.nickname && (
            <span className="font-medium mb-3 text-emerald-400">
              {messageData.nickname}
            </span>
          )}
          <span>{messageData.message}</span>
        </div>
      ))}
    </div>
  );
}
