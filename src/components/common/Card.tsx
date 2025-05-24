"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, CircleAlert, Instagram, Plus } from "lucide-react";
import Link from "next/link";
import classNames from "classnames";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";

const Card = ({ product }: { product: any }) => {
  const [added, setAdded] = React.useState(false);

  const addToCart = () => {
    if (product?.category == "Out Of Stock") {
      toast.error("Product is out of stock");
      return;
    }
    if (product?.category == "Back Order") {
      toast.error("Product not available yet, contact us for more info");
      return;
    }
    if (product?.category == "Pre Order") {
      toast.error("Product not available yet, contact us for more info");
      return;
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  const locale = useLocale();
  const t = useTranslations("Other");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="p-4 w-full relative max-h-[275px] min-h-[275px] max-w-[265px] flex cursor-pointer flex-col justify-between gap-3 items-center"
          key={product?.id}
        >
          <Image
            src={product.imageUrl}
            alt={product.title}
            width={200}
            height={125}
            priority
            className="max-w-[200px] max-h-[125px] object-cover"
          />
          {product?.badge_tooltip && (
            <div
              className={classNames(
                product?.category == "Out Of Stock"
                  ? "bg-red-500/90 text-white"
                  : "bg-white",
                "flex gap-1.5 px-2 py-1 rounded-sm font-normal justify-between items-center absolute right-0 top-1/2 translate-y-[-50%]"
              )}
            >
              <span className="text-xs font-medium">
                {product?.badge_tooltip}
              </span>
              {product?.category == "Out Of Stock" && <CircleAlert size={15} />}
            </div>
          )}
          <h1 className="text-sm font-medium text-center max-w-3/4 line-clamp-2">
            {product?.title}
          </h1>
          <p className="font-medium">
            {product?.price}.00 <span className="text-xl">₪</span>
          </p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{product?.title}</DialogTitle>
        </DialogHeader>
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={400}
          height={250}
          priority
          className="max-w-[300px] max-h-[175px] object-cover mx-auto"
        />
        <DialogDescription>
          {locale == "en" ? product?.description : product?.description_he}
        </DialogDescription>
        <div className="flex justify-between mt-4">
          <Link
            href="https://www.instagram.com/records_sf"
            className="text-sm flex items-center gap-1.5 cursor-pointer font-semibold text-white bg-[#121212] rounded-sm px-3 py-1.5"
          >
            {t("Contact")} <Instagram size={16} />
          </Link>
          <p className="font-medium">
            {product?.price}.00 <span className="text-xl">₪</span>
          </p>
        </div>
        <button
          disabled={added}
          onClick={addToCart}
          className={classNames(
            (added || !product?.availability_status) && "bg-[#121212]/75",
            "w-full cursor-pointer text-white flex items-center font-medium justify-center gap-2 py-2 bg-[#121212] rounded-lg"
          )}
        >
          {added ? (
            <>
              {t("Added")} <Check size={16} />
            </>
          ) : (
            <>
              {t("Add to cart")} <Plus size={16} />
            </>
          )}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
