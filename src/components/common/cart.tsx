"use client";

import { RootState } from "@/lib/store";
import { Instagram, ShoppingCart, X } from "lucide-react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { removePackage } from "@/lib/store/slices/cart";

const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const productsWithQuantity = useMemo(() => {
    const products: {
      [id: string]: { product: Product; quantity: number; imageUrl: string };
    } = {};
    cart.data.forEach((product) => {
      const imageUrl = `https://boyutxpagmnxawcpshkt.supabase.co/storage/v1/object/public/images/${product.image_path.trimEnd()}`;
      if (products[product.id]) {
        products[product.id].quantity++;
      } else {
        products[product.id] = { product, quantity: 1, imageUrl };
      }
    });
    return Object.values(products);
  }, [cart.data]);

  const totalPrice = useMemo(
    () =>
      productsWithQuantity.reduce(
        (acc, { product, quantity }) => acc + product.price * quantity,
        0
      ),
    [productsWithQuantity]
  );

  const cartEmptyNotify = () => {
    toast.error("Cart is empty");
  };

  const removeProduct = (id: Number) => {
    dispatch(removePackage(id.toString()));
  };

  return (
    <>
      {cart.data.length > 0 ? (
        <Popover>
          <PopoverTrigger asChild className="relative cursor-pointer">
            <div className="relative">
              <ShoppingCart size={22} />
              <span className="absolute text-sm -top-3 -right-3 bg-[#acacac] text-[#3b3b3b] rounded-full w-4 h-4 flex items-center justify-center">
                {cart.data.length}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              {productsWithQuantity.map(({ product, quantity, imageUrl }) => (
                <div key={product.id} className="flex relative">
                  <div className="absolute z-50 top-2 bg-[#c4c4c4] p-[2px] rounded-sm -right-[6px] cursor-pointer">
                    <X size={16} onClick={() => removeProduct(product.id)} />
                  </div>
                  <Image
                    src={imageUrl}
                    alt={product.title}
                    width={200}
                    height={125}
                    priority
                    className="max-w-[135px] max-h-[110px] object-cover"
                  />
                  <div className="flex flex-col py-5 w-full">
                    <span className="font-medium line-clamp-1">
                      {product.title.slice(0, 25).concat("...")}
                    </span>
                    <div className="w-full flex justify-between">
                      <span className="font-medium">{product.price}₪</span>
                      <span>{quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between font-medium mt-4">
                <span>Total:</span>
                <span>{totalPrice}₪</span>
              </div>
              <Link
                target="_blank"
                href="https://www.instagram.com/records_sf"
                className="w-full cursor-pointer text-white flex items-center font-medium justify-center gap-2 py-2 bg-[#121212] rounded-lg"
              >
                Contact us <Instagram size={20} />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="relative cursor-pointer" onClick={cartEmptyNotify}>
          <ShoppingCart size={22} />
        </div>
      )}
    </>
  );
};

export default Cart;
