import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Card from "@/components/common/Card";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
  }

  const productsWithImages = products?.map((product) => ({
    ...product,
    imageUrl: `https://boyutxpagmnxawcpshkt.supabase.co/storage/v1/object/public/images/${product.image_path}`,
  }));

  return (
    <main className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center">
      {productsWithImages?.map((product) => (
        <Card key={product.id} product={product} />
      ))}
    </main>
  );
}
