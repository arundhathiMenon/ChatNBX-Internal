"use client";
import React, { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import MenuItems from "./MenuItems";
import { BiLogOutCircle } from "react-icons/bi";
import styles from "../Styles/Layout.module.css";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [path, setPath] = useState("/" || null);
  const router = useRouter();
  const regularMenus = [
    {
      title: "New Chat",
      icon: <IoMdAdd />,
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
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div
      className={`bg-['#242b4d'] h-auto p-5 pt-8  ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <IoIosArrowBack
        onClick={() => setOpen(!open)}
        className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
          !open && "rotate-180"
        } `}
      />
      <div className="flex">
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
              onClick={() => handleEvent(menu.path)}
            />
          </li>
        ))}
      </ul>
      <div className={`h-[450px] p-4 mt-4 ${open ? "block" : "hidden"}`}>
        <h2
          className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 text-center
            `}
        >
          RECENT CHATS
        </h2>
        <div className={`overflow-y-auto h-full scrollbar`}>
          <ul className={`${styles.recent_chats}`}>
            <li>Friend's Name</li>
            <li>Family Member's Name</li>
            <li>Work Colleague's Name</li>
            <li>Group Chat Name</li>
            <li>Another Friend's Name</li>
            <li>Project Team Name</li>
            <li>Study Group Name</li>
            <li>Roommate's Name</li>
            <li>Classmates' Group</li>
            <li>Hobby Club Name</li>
            <li>Friend's Name</li>
            <li>Family Member's Name</li>
            <li>Work Colleague's Name</li>
            <li>Group Chat Name</li>
            <li>Another Friend's Name</li>
            <li>Project Team Name</li>
            <li>Study Group Name</li>
            <li>Roommate's Name</li>
            <li>Classmates' Group</li>
            <li>Hobby Club Name</li>
          </ul>
        </div>
      </div>
      <div
        className="absolute bottom-6 left-0 text-center py-2 px-4 w-full"
        onClick={handleLogout}
      >
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
