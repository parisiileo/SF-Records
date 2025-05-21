"use client";

import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
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
      router.replace(`/?${params.toString()}`);
    });

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex justify-center items-center w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search for a product..."
        className="w-full max-w-md px-4 py-2 focus:outline-none"
      />
      <SearchIcon size={18} />
    </div>
  );
}
