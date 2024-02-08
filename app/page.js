"use client"
import { useRouter } from "next/navigation";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useRouter()

  useEffect(() => {
    const storedToken = localStorage.getItem('userDetails');
    if (storedToken) {
      setIsAuth(true);
    } else {
      navigate.push("/login"); 
    }
  }, [navigate]);

  return (
    <>
      {isAuth ? ( 
        <>
          <Sidebar />
          <ChatInterface />
        </>
      ) : null}
    </>
  );
}
