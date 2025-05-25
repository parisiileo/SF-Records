"use client";

import { div } from "framer-motion/client";
import { SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.replace(`/${locale}?${params.toString()}`);
    });

    return () => clearTimeout(timeout);
  }, [value]);

  const t = useTranslations("Other");

  return (
    <div className="flex justify-center items-center px-4 py-2 md:w-[60%] min-w-[250px] w-full md:max-w-[369px] max-w-[305px] bg-[#0a0a0a]/2 rounded-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("Search")}
        className="w-full max-w-md focus:outline-none placeholder:text-stone-700"
      />
      <SearchIcon size={18} />
    </div>
  );
}
