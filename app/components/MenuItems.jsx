"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useMemo } from "react";
import Link from "next/link";
const MenuItems = ({ menu, open }) => {
  const { path, title, icon } = menu;
  const router = useRouter();
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return path === pathname;
  }, [path, pathname]);
  return (
    <>
      <Link
        href={menu.path}
        className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2 hover:text-dark-purple ${
          isActive && "text-dark-purple bg-light-white rounded-md mt-2"
        }`}
      >
        <span className="text-2xl block float-left duration-200">
          {menu.icon}
        </span>
        <span
          className={`text-base font-medium flex-1 duration-200 ${
            !open && "hidden"
          }`}
        >
          {menu.title}
        </span>
      </Link>
    </>
  );
};

export default MenuItems;
