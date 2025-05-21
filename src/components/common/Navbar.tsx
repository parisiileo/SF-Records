"use client";

import Link from "next/link";
import SearchBar from "@/components/common/SearchBar";
import categories from "@/data/headerCategories.json";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";

export const Navbar = () => {
  const path = usePathname();
  const [activeCategory, setActiveCategory] = useState("");

  console.log(path);
  return (
    <nav className="w-full bg-[#5f5f5f] xl:max-w-9/12 lg:max-w-10/12 max-w-11/12">
      <div className="mx-auto grid grid-cols-3 gap-4 py-4 items-center">
        <section className="flex items-center gap-8 uppercase">
          {categories.map((category: Category) => (
            <Link
              key={category.id}
              href={category.url}
              className={`text-[17px] font-bold transition-all duration-300 ${
                category.url === path
                  ? "opacity-100"
                  : "opacity-75 hover:opacity-100"
              }
              ${
                activeCategory === category.label
                  ? "opacity-100"
                  : "opacity-75 hover:opacity-100"
              }`}
              onClick={() => setActiveCategory(category.label)}
            >
              {category.label}
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
