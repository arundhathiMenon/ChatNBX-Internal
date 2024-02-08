"use client";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { PiChatsDuotone } from "react-icons/pi";
import { IoMdLogIn } from "react-icons/io";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import MenuItems from "./MenuItems";
import { BiLogOutCircle } from "react-icons/bi";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [path, setPath] = useState("/" || null);
  const router = useRouter()
  const regularMenus = [
    {
      title: "New Chat",
      icon: <IoMdAdd />,
      path: "/",
    },
    {
      title: "Recent Chats",
      icon: <PiChatsDuotone />,
      path: "/",
    },
  ];

  const loginMenu = {
    title: "Logout",
    icon: <BiLogOutCircle />,
    path: "/login",
  };
  const handleEvent = (link) => {
    router.push(link);
  };

  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div
      className={`bg-dark-purple h-auto p-5 pt-8  ${open ? "w-72" : "w-20"
        } duration-300 relative`}
    >
      <IoIosArrowBack
        onClick={() => setOpen(!open)}
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"
          } `}
      />
      <div className="flex justify-center">
        <Image
          src={"https://chat.tune.app/NimbleBox.svg"}
          alt="NimbleBox"
          width={112}
          height={28}
        />
      </div>
      <ul className="pt-2">
        {regularMenus.map((menu, index) => (
          <li key={index}>
            <MenuItems
              menu={menu}
              open={open}
              index={index}
              onClick={() => handleEvent(menu.path)} // Pass menu path to handleEvent
            />
          </li>
        ))}
      </ul>
      <div className="absolute bottom-4 left-0 text-center py-2 px-4 w-full" onClick={handleLogout}>
        <MenuItems
          menu={loginMenu}
          open={open}
          index={regularMenus.length}
          onClick={() => handleEvent(loginMenu.path)}
        />
      </div>
    </div>
  );
};

export default Sidebar;
