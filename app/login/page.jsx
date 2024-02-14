"use client";
import Link from "next/link";
import { useState } from "react";
import { useChat } from "../layout";

const Login = () => {
  const {userDetails,setUserDetails}=useChat()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem("userDetails", JSON.stringify({ token, user }));
        setUserDetails(JSON.stringify({ token, user }));
        window.location.href = "/";
      } else {
        console.error("Failed to log in:", await response.json());
      }
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => handleChange(e)}
              placeholder="Enter Email"
              required
              className=" text-gray-800 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-9 p-2 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onChange={(e) => handleChange(e)}
              id="password"
              required
              className="text-gray-800 mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-9 p-2 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-indigo-600">
            New user? <Link href="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
