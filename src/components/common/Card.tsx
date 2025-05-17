"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const Card = ({ product }: any) => {
  console.log(product);
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="p-4 max-w-full max-h-[275px] min-h-[275px] flex cursor-pointer flex-col justify-between gap-3 items-center bg-gradient-to-t from-[#2c2c2c]/40 to-transparent"
      key={product?.id}
    >
      <Image
        src={product.imageUrl}
        alt={product.title}
        width={200}
        height={125}
        className="max-w-[200px] max-h-[125px] object-cover"
      />
      <h1 className="text-sm font-medium text-center max-w-3/4 line-clamp-2">
        {product?.title}
      </h1>
      <p className="font-medium">
        {product?.price}.00 <span className="text-xl">₪</span>
      </p>
    </motion.div>
  );
};

export default Card;
