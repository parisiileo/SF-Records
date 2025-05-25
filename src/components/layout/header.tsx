"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import categories from "@/data/headerCategories.json";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import SearchBar from "../common/SearchBar";
import Cart from "../common/cart";
import { useDispatch } from "react-redux";
import { loadCartFromLocalStorage, setCart } from "@/lib/store/slices/cart";

const Header = () => {
  const logo =
    "https://boyutxpagmnxawcpshkt.supabase.co/storage/v1/object/public/logo/logo.svg";

  const path = usePathname();
  const t = useTranslations("Other");
  const locale = useLocale();
  const newCategories: Category[] = [...categories];

  if (locale == "en") {
    newCategories.push({
      id: categories.length + 1,
      key: "Hebrew",
      locale: "he",
      url: "/",
    });
  } else {
    newCategories.push({
      id: categories.length + 1,
      key: "English",
      locale: "en",
      url: "/",
    });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const storedCart = loadCartFromLocalStorage();
    dispatch(setCart({ type: "data", error: null, data: storedCart }));
  }, [dispatch]);

  return (
    <div className="flex flex-col px-6 gap-3 pb-4 fixed top-0 left-0 right-0 z-50 bg-[#bbbbbb] xl:max-w-10/12 lg:max-w-11/12 w-full mx-auto">
      <nav className="md:grid md:grid-cols-3 flex items-center justify-between">
        <Link href="/" className="w-fit md:hidden">
          <Image
            src={logo}
            alt="logo"
            width={125}
            height={125}
            draggable={false}
            className="select-none min-w-[110px] max-sm:max-w-[90px]"
          />
        </Link>
        <section className="flex items-center sm:gap-8 gap-4 uppercase">
          {newCategories.map((category: Category) => (
            <Link
              key={category.id}
              href={category.url}
              locale={category.locale ?? locale}
              className={`sm:text-[17px] text-base font-bold transition-all duration-300 ${
                category.url === path
                  ? "opacity-100"
                  : "opacity-75 hover:opacity-100"
              }`}
            >
              {t(category.key)}
            </Link>
          ))}
          <Cart />
        </section>
        <div className="flex justify-center max-md:hidden">
          <Link href="/" className="w-fit">
            <Image
              src={logo}
              alt="logo"
              width={125}
              height={125}
              draggable={false}
              className="select-none min-w-[110px] max-sm:max-w-[90px]"
            />
          </Link>
        </div>
        <div className="flex justify-end w-full max-md:hidden">
          <SearchBar />
        </div>
      </nav>
      <div className="flex justify-center w-full md:hidden">
        <SearchBar />
      </div>
    </div>
  );
};

export default Header;
