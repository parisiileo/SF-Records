import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import React from "react";

export default async function Page({ params }: any) {
  const { policy } = params;
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);
  const { data, error } = await supabase
    .from("footer")
    .select("title, content")
    .eq("slug", policy);

  console.log(data);
  return (
    <div className="flex flex-col items-center gap-4">
      {data?.length === 0 ? (
        <p>Path not found</p>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{data?.[0]?.title}</h1>
          <p className="whitespace-pre-wrap">{data?.[0]?.content}</p>
        </>
      )}
    </div>
  );
}
