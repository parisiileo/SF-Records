import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Card from "@/components/common/Card";
import { main } from "framer-motion/client";

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

  console.log(productsWithImages);

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl mt-20 font-bold mb-4 capitalize hover:opacity-85 transition-all duration-300">
        All Products
      </h1>
      <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center">
        {productsWithImages?.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
