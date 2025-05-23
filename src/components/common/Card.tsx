"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Instagram } from "lucide-react";
import Link from "next/link";

const Card = ({ product }: { product: any }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="p-4 w-full max-h-[275px] min-h-[275px] max-w-[265px] flex cursor-pointer flex-col justify-between gap-3 items-center"
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
        <DialogDescription>{product?.description}</DialogDescription>
        <div className="flex justify-between mt-4">
          <Link
            href="https://www.instagram.com/records_sf"
            className="text-sm flex items-center gap-1.5 cursor-pointer font-semibold text-white bg-[#121212] rounded-sm px-3 py-1.5"
          >
            Contact <Instagram size={16} />
          </Link>
          <p className="font-medium">
            {product?.price}.00 <span className="text-xl">₪</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Card;
