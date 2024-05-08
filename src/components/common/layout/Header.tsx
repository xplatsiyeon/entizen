/** @format */

"use client";

import React, { useState } from "react";
import Logo from "/public/components/header/XPLAT_logo_type_black.svg";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";

const Header = () => {
  const [nav, setNav] = useState(false);
  const path = usePathname();

  const links = [
    {
      id: 1,
      link: "about",
    },
    {
      id: 2,
      link: "consulting",
    },
    // {
    //   id: 3,
    //   link: 'work',
    // },
    {
      id: 4,
      link: "contact",
    },
  ];

  const adminLinks = [
    {
      id: 11,
      link: "admin",
    },
  ];

  return (
    <div className="bg-black font-Pretendard fixed w-full z-[999]">
      <div className="flex justify-between items-center py-6 w-9/12 mx-auto md:w-11/12 sm:py-2">
        <Link className="link-underline link-underline-black" href="/">
          {/* <Image src={Logo} alt="Logo" className="sm:w-14" /> */}
        </Link>
        <ul className="flex justify-center items-center gap-1 md:hidden">
          {path.includes("admin")
            ? adminLinks.map(({ id, link }) => (
                <li
                  key={id}
                  className="nav-links px-4 cursor-pointer uppercase font-normal text-white hover:scale-105 duration-200 link-underline"
                >
                  <Link href={link} className="">
                    {link}
                  </Link>
                </li>
              ))
            : links.map(({ id, link }) => (
                <li
                  key={id}
                  className="nav-links px-4 cursor-pointer uppercase font-normal text-white hover:scale-105 duration-200 link-underline"
                >
                  <Link href={link} className="">
                    {link}
                  </Link>
                </li>
              ))}
        </ul>
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer z-50 text-white hidden md:block"
        >
          {nav ? (
            <IoMdClose size={30} className="sm:w-5" />
          ) : (
            <RxHamburgerMenu size={30} className="sm:w-5" />
          )}
        </div>
        {nav && (
          <ul className="flex flex-col justify-center top-0 left-0 w-full h-screen bg-black text-white fixed sm:justify-start sm:py-16 sm:h-auto z-40">
            {path.includes("admin")
              ? adminLinks.map(({ id, link }) => (
                  <li
                    key={id}
                    className="px-8 cursor-pointer uppercase py-6 text-4xl sm:text-base sm:py-0 sm:pt-7"
                  >
                    <Link onClick={() => setNav(!nav)} href={link}>
                      {link}
                    </Link>
                  </li>
                ))
              : links.map(({ id, link }) => (
                  <li
                    key={id}
                    className="px-8 cursor-pointer uppercase py-6 text-4xl sm:text-base sm:py-0 sm:pt-7"
                  >
                    <Link onClick={() => setNav(!nav)} href={link}>
                      {link}
                    </Link>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
