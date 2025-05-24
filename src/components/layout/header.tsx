"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Navbar } from "../common/Navbar";

const Header = () => {
  const logo =
    "https://boyutxpagmnxawcpshkt.supabase.co/storage/v1/object/public/logo/logo.svg";

  return (
    <nav className="flex flex-col gap-3 items-center justify-center fixed top-0 left-0 right-0 z-50 bg-[#bbbbbb]">
      <section className="w-full flex items-center py-5">
        <section className="flex w-full items-center justify-center">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={125}
              height={125}
              draggable={false}
              className="select-none"
            />
          </Link>
        </section>
      </section>
      <Navbar />
    </nav>
  );
};

export default Header;
