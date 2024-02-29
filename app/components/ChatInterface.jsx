"use client";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import styles from "../Styles/Layout.module.css";
import { isUser } from "./Logics/ChatLogic";
import { FaArrowUp } from "react-icons/fa";
import SnippetCode from "./SnippetCode";
import { IoMdCopy } from "react-icons/io";
import { IoMdDoneAll } from "react-icons/io";
import { BeatLoader } from "react-spinners";
import { v4 as uuid } from "uuid";
import { useChat } from "../layout";

const ChatInterface = () => {
  const messageRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [memos, setMemos] = useState([]);
  const [conversation_id, setConversation_id] = useState(uuid());

  const dataSet = async ({ title, conversation_id, query, response }) => {
    try {
      const result = await fetch("/api/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, conversation_id, query, response }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const obj = {
      title: "new title",
      conversation_id,
      query: memos
        .filter((message) => message.role === "user")
        .map((message) => message.content)
        .join(""),
      response: memos
        .filter((message) => message.role === "system")
        .map((message) => message.content)
        .join(""),
    };
    if (messages.length > 0) {
      dataSet(obj);
    }
  }, [memos]);

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      handleSendMessage();
    }
  };

  const getMessage = async (msg) => {
    setLoading(true);
    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({
          temperature: 0.5,
          messages: [
            {
              role: "user",
              content: msg,
            },
          ],
          model: "rohan/mixtral-8x7b-inst-v0-1-32k",
          stream: true,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }
      const reader = response.body.getReader();
      let chunks = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        chunks += new TextDecoder().decode(value);
        const lines = chunks.split("\n");
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            const lines = data.trim().split("\n");
            const validLines = lines.filter((line) =>
              line.trim().startsWith("data:")
            );
            const filteredLines = validLines.filter(
              (line) => !line.includes("data:[DONE]")
            );
            const arrayOfObjects = filteredLines
              .map((line) => {
                const jsonStartIndex = line.indexOf("{");
                const jsonString = line.substring(jsonStartIndex);
                try {
                  return JSON.parse(jsonString);
                } catch (error) {
                  console.error("Error parsing JSON:", error);
                  return null;
                }
              })
              .filter((obj) => obj !== null);

            const contentArray = arrayOfObjects.map((obj) => {
              try {
                return obj.choices[0].delta.content;
              } catch (error) {
                console.log(error);
              }
            });
            setLoading(false);
            return contentArray.join("");
          } catch (err) {
            console.error("Error parsing JSON:", err);
          }
        }
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    const userMessage = {
      role: "user",
      name: "You",
      timestamp: new Date().toLocaleString(),
      content: newMessage,
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage("");
    let chatResponse = await getMessage(newMessage);
    const assistantMessage = {
      role: "system",
      name: "chatBNX",
      timestamp: new Date().toLocaleString(),
      content: chatResponse,
    };
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    setMemos([userMessage, assistantMessage]);
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  });

  const renderMessageContent = (message) => {
    const regex = /```([^```]*)```/gm;
    const codeSnippets = message.content.split(regex);

    return (
      <>
        {codeSnippets.map((snippet, index) => {
          if (index % 2 === 0) {
            return <div key={index}>{snippet}</div>;
          } else {
            return (
              <pre className="whitespace-pre-wrap prose prose-invert">
                <SnippetCode code={snippet} />
              </pre>
            );
          }
        })}
      </>
    );
  };

  useEffect(() => {
    messageRef.current?.scrollIntoView();
  });

  return (
    <div className={styles.chat}>
      <div className="w-[80%] m-auto">
        <div className={styles.chatMessages}>
          <div
            className={` flex-1 p-10 rounded-3xl h-90vh overflow-y-auto h-full scrollbar `}
          >
            {messages.map((message, index) => (
              <div key={index} className="flex flex-col items-start">
                <div
                  className={`
            ${
              isUser(message.name) ? "text-white" : "text-white"
            } rounded-2xl p-2 md:p-4 max-w-3/4 mt-2`}
                >
                  <p className="text-xs mb-1">{message.name}</p>
                  <pre style={{ width: "800px", overflowX: "auto" }}>
                    <code
                      style={{
                        display: "block",
                        whiteSpace: "pre-wrap",
                        fontFamily: "monospace",
                      }}
                    >
                      {renderMessageContent(message)}
                    </code>
                  </pre>
                  <p className="text-xs text-right">{message.timestamp}</p>
                </div>
                <div ref={messageRef} />
              </div>
            ))}
            {loading ? (
              <div className="flex items-center justify-center">
                <BeatLoader color="#36d7b7" />
              </div>
            ) : null}
          </div>
        </div>
        <div className={`${styles.chatInput} relative`}>
          <input
            type="text"
            placeholder="Type your message..."
            className={`${styles.inputField} pr-[100px] pl-8 shadow-md  focus:border-blue-500 h-[50px] focus:outline-none `} // Add pr-12 for padding-right to accommodate the button
            value={newMessage}
            onKeyPress={(e) => handleEnter(e)}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSendMessage}
            className={`${styles.sendButton}text-white absolute end-5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-1  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
