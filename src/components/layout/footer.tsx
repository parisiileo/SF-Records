"use client";
import Link from "next/link";
import React from "react";
import footerCategories from "@/data/footerCategories.json";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 py-6 mb-16 max-w-10/12 mx-auto">
      <div className="flex items-center justify-between ">
        <Link
          href="/"
          className="flex max-sm:flex-wrap items-center gap-x-1 text-nowrap text-base font-medium"
        >
          <span className="text-nowrap underline-offset-2 hover:underline">
            © {new Date().getFullYear()} SF Records
          </span>
        </Link>
        <div className="flex max-sm:justify-center max-sm:flex-wrap items-center gap-x-1 text-nowrap text-base font-medium">
          Built by
          <Link href="https://lparisi.it" target="_blank">
            <span className="text-nowrap underline-offset-2 hover:underline">
              ❤️ Leonardo Parisi
            </span>
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-12">
        <div className="flex flex-col flex-wrap">
          <div className="font-bold">Policies</div>
          <div className="flex flex-col mt-3">
            {footerCategories.Policies.map((policy) => (
              <Link
                key={policy.id}
                href={policy.url}
                className="text-nowrap underline-offset-2 hover:underline"
              >
                {policy.key}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="font-bold">Information</div>
          <div className="flex flex-col mt-3">
            {footerCategories.Information.map((info) => (
              <Link
                key={info.id}
                href={info.url}
                className="text-nowrap underline-offset-2 hover:underline"
              >
                {info.key}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col flex-wrap">
          <div className="font-bold">Contact & About Us</div>
          <div className="flex flex-col mt-3">
            {footerCategories.More.map((info) => (
              <Link
                key={info.id}
                href={info.url}
                className="text-nowrap underline-offset-2 hover:underline"
              >
                {info.key}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
