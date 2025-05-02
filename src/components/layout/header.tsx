"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <nav className="grid grid-cols-3 w-full py-5">
      <section className="flex w-full items-center"></section>
      <section className="flex w-full items-center justify-center">
        <Image src={logo} alt="logo" width={120} height={120} />
      </section>
      <section className="flex w-full items-center justify-end"></section>
    </nav>
  );
};

export default Header;
