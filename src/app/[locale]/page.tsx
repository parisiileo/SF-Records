import { createSupabaseServerClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Card from "@/components/common/Card";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawSearch = (await searchParams)?.search ?? "";
  const search =
    typeof rawSearch === "string"
      ? rawSearch.toLowerCase()
      : Array.isArray(rawSearch) && rawSearch.length > 0
      ? rawSearch[0].toLowerCase()
      : "";
  const cookieStore = cookies();
  const supabase = createSupabaseServerClient(cookieStore);

  const { data: products, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error.message);
  }

  const productsWithImages: Product[] = (products ?? []).map((product) => ({
    ...product,
    imageUrl: `https://boyutxpagmnxawcpshkt.supabase.co/storage/v1/object/public/images/${product.image_path.trimEnd()}`,
  }));

  const filteredProducts = productsWithImages.filter((product) =>
    product.title.toLowerCase().includes(search)
  );

  const groupedByCategory: Record<string, Product[]> = filteredProducts.reduce(
    (acc, product) => {
      const category = product.category || "More";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    },
    {} as Record<string, Product[]>
  );

  const cat = await getTranslations("Categories");
  const other = await getTranslations("Other");

  return (
    <main className="flex flex-col items-center w-full justify-center gap-24">
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <section
          key={category}
          id={category}
          className="flex flex-col relative w-full mt-24 items-center justify-center max-md:max-w-10/12 max-xs:max-w-full mx-auto"
        >
          <div className="flex items-center gap-1.5">
            <h1 className="text-3xl font-bold mb-4 capitalize hover:opacity-85 transition-all duration-300">
              {cat(category)}
            </h1>
            <Link href={`/all`} className="text-sm font-medium underline">
              {other("View More")}
            </Link>
          </div>
          <div className="flex justify-center w-full flex-wrap max-xl:hidden gap-4">
            {items.slice(0, 8).map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center w-full flex-wrap xl:hidden max-lg:hidden gap-4">
            {items.slice(0, 8).map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <div className="grid w-full lg:hidden md:grid-cols-3 max-md:hidden gap-4">
            {items.slice(0, 6).map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <div className="grid w-full md:hidden sm:grid-cols-2 items-center max-sm:hidden gap-4">
            {items.slice(0, 4).map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <div className="flex flex-col w-full sm:hidden items-center justify-center gap-4">
            {items.slice(0, 4).map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
