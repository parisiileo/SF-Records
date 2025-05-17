"use client";
import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.svg";
import Link from "next/link";
import categories from "@/data/headerCategories.json";

const Header = () => {
  return (
    <nav className="flex flex-col gap-3 items-center justify-center">
      <section className="grid grid-cols-3 w-full py-5">
        <section className="flex w-full items-center"></section>
        <section className="flex w-full items-center justify-center">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={105}
              height={105}
              draggable={false}
              className="select-none"
            />
          </Link>
        </section>
        <section className="flex w-full items-center justify-end"></section>
      </section>
      <section className="flex justify-center items-center gap-8">
        {categories.map((category: Category) => (
          <Link
            key={category.id}
            href={`${category.url}`}
            className="font-medium hover:underline"
          >
            {category.label}
          </Link>
        ))}
      </section>
    </nav>
  );
};

export default Header;
