import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Welcome() {
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const startChatting = (e) => {
    e.preventDefault();
    if (nickname !== "") {
      localStorage.setItem("nickname", nickname);
      navigate("/chat");
    }
  };
  return (
    <div className="bg-neutral-800 grow lg:grow-0 lg:basis-1/3 h-1/2 lg:rounded-3xl flex flex-col justify-center open-animation p-4">
      <div className="flex flex-col gap-2 items-center">
        <p className="font-light text-white text-3xl">Welcome to demo chat</p>
        <input
          onChange={(e) => setNickname(e.target.value)}
          type="text"
          value={nickname}
          placeholder="Your nickname"
          className="grow bg-neutral-700 rounded-lg outline-none p-3 text-white placeholder-gray-300"
        />
        <button onClick={startChatting}>Start Chatting!</button>
      </div>
    </div>
  );
}
