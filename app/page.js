"use client";
import { useRouter } from "next/navigation";
import ChatInterface from "./components/ChatInterface";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import '../app/globals.css'

export default function Home() {
  const [isAuth, setIsAuth] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("userDetails");
    if (storedToken) {
      setIsAuth(true);
    } else {
      router.push("/login");
    }
  }, [router]);

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
