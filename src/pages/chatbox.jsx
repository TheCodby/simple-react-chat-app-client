import React, { Fragment, useLayoutEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import Messages from "../components/messages";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
const socket = io("https://simple-react-chat-app.vercel.app", { port: 3001 });
export default function Chatbox() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageBox, setMessageBox] = useState("");
  const navigate = useNavigate();
  useLayoutEffect(() => {
    setLoading(true);
    socket.emit("messages:fetch");
    if (!localStorage.getItem("nickname")) {
      navigate("/");
    }
    setLoading(false);
  }, []);
  useEffect(() => {
    socket.on("messages:get", (data) => setMessages(data.messages));
    socket.on("messages:response", (data) =>
      setMessages([...messages, data.message])
    );
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageBox !== "") {
      socket.emit("messages:send", {
        message: {
          nickname: localStorage.getItem("nickname"),
          message: messageBox,
        },
      });
      setMessageBox("");
    }
  };
  const keyPressed = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      sendMessage(e);
    }
  };
  return (
    <div className="bg-neutral-800 grow h-full lg:rounded-3xl flex flex-col p-3 lg:p-10 justify-between space-y-4">
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <Messages messages={messages} />
          <div className="flex flex-row gap-2 items-center">
            <textarea
              onKeyDown={keyPressed}
              onChange={(e) => setMessageBox(e.target.value)}
              wrap="soft"
              type="text"
              value={messageBox}
              rows={1}
              placeholder="Write your message"
              className="grow bg-neutral-700 w-full rounded-lg outline-none p-3 resize-none text-white placeholder-gray-300 whitespace-normal"
            ></textarea>
            <button onClick={sendMessage}>
              <AiOutlineSend size={24} />
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
}
