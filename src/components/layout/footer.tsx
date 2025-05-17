"use client";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between py-6 max-w-10/12 mx-auto">
      <Link
        href="/"
        className="flex max-sm:flex-wrap items-center gap-x-1 text-nowrap text-base font-medium"
      >
        <span className="text-nowrap underline-offset-2 hover:underline">
          © {new Date().getFullYear()} SF Records
        </span>
      </Link>
      <div className="flex max-sm:flex-wrap items-center gap-x-1 text-nowrap text-base font-medium">
        Built by
        <Link href="https://lparisi.it" target="_blank">
          <span className="text-nowrap underline-offset-2 hover:underline">
            ❤️ Leonardo Parisi
          </span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
