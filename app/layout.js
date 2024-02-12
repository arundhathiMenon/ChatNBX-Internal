"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { createContext, useState, useContext } from "react";

const ChatContext = createContext();
const inter = Inter({ subsets: ["latin"] });

export const ChatProvider = ({ children }) => {
  const [historyChat, setHistoryChat] = useState([]);

  return (
    <ChatContext.Provider value={{ historyChat, setHistoryChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

export default function RootLayout({ children }) {
  return (
    <ChatProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex">{children}</div>
        </body>
      </html>
    </ChatProvider>
  );
}
