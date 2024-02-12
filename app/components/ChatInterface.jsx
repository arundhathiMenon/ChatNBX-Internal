"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRef } from "react";
import styles from "../Styles/Layout.module.css";
import { isUser } from "./Logics/ChatLogic";
import { useChat } from "../layout";

const ChatInterface = () => {
  const messageRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [conversionChat, setConversionChat] = useState([]);

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSendMessage();
    }
  };
  
  const getMessage = async (msg) => {
  
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = {
      name: "You",
      timestamp: new Date().toLocaleString(),
      content: newMessage,
    };

    const assistantMessage = {
      name: "chatBNX",
      timestamp: new Date().toLocaleString(),
      content: " Chat response from API",
    };

    const newMessages = [...messages, userMessage, assistantMessage];
    setMessages(newMessages);

    const newChat = {
      title: newMessage,
      userId: "12345",
      content: [
        {
          senderMsg: userMessage.content,
          assistantMsg: assistantMessage.content,
        },
      ],
      timestamp: new Date().toLocaleString(),
    };

    setConversionChat([...conversionChat, newChat]);

    setNewMessage("");
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  });

  return (
    <div className={styles.chat}>
      <div className="w-[80%] m-auto">
        <div className={styles.chatMessages}>
          <div
            className="flex-1 p-10 rounded-3xl h-90vh overflow-y-scroll scrollbar-none"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col items-start">
                <div
                  className={`${
                    isUser(message.name) ? "bg-[#89acff]" : "bg-[#20a7db]"
                  }
            ${
              isUser(message.name) ? "text-white" : "text-black"
            } rounded-2xl p-2 md:p-4 max-w-3/4 mt-2`}
                >
                  <p className="text-xs mb-1">{message.name}</p>
                  <p className="font-semibold mb-1">{message.content}</p>
                  <p className="text-xs text-right">{message.timestamp}</p>
                </div>
                <div ref={messageRef} />
              </div>
            ))}
            {loading && (
              <div className="flex">
                <p className="text-pink-500 font-semibold">
                  Please wait, processing your request...
                </p>
                <div className="flex items-center justify-center">
                  Loading..
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            placeholder="Type your message..."
            className={styles.inputField}
            value={newMessage}
            onKeyPress={(e) => handleEnter(e)}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
