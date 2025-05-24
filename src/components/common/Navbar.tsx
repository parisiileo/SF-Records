"use client";

import Link from "next/link";
import SearchBar from "@/components/common/SearchBar";
import categories from "@/data/headerCategories.json";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

export const Navbar = () => {
  const path = usePathname();
  const [activeCategory, setActiveCategory] = useState("");

  const t = useTranslations("Other");
  const locale = useLocale();
  const newCategories: Category[] = [...categories];

  if (locale == "en") {
    newCategories.push({
      id: categories.length + 1,
      key: "Hebrew",
      locale: "he",
      url: "/he",
    });
  } else {
    newCategories.push({
      id: categories.length + 1,
      key: "English",
      locale: "en",
      url: "/en",
    });
  }

  const router = useRouter();

  const handleLocaleSwitch = (url: string, locale: string) => {
    console.log("Switching locale to:", locale);
    router.push("/", { locale: locale });
  };

  useEffect(() => {
    console.log("Current locale:", locale);
  }, [locale]);

  return (
    <nav className="w-full bg-[#bbbbbb] xl:max-w-9/12 lg:max-w-10/12 max-w-11/12">
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-4 py-4 items-center">
        <section className="flex items-center sm:gap-8 gap-4 uppercase">
          {newCategories.map((category: Category) => (
            <Link
              key={category.id}
              href={category.url}
              className={`sm:text-[17px] text-base font-bold transition-all duration-300 ${
                category.url === path
                  ? "opacity-100"
                  : "opacity-75 hover:opacity-100"
              }
              ${
                activeCategory === category.key
                  ? "opacity-100"
                  : "opacity-75 hover:opacity-100"
              }`}
              onClick={() => {
                if (category.locale) {
                  handleLocaleSwitch(category.url, category.locale);
                }
                setActiveCategory(category.key);
              }}
            >
              {t(category.key)}
            </Link>
          ))}
        </section>
        <Suspense fallback={<h1>Loading...</h1>}>
          <SearchBar />
        </Suspense>
      </div>
    </nav>
  );
};
