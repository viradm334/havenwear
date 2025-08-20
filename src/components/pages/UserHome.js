"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Carousel from "../ui/Carousel";

export default function UserHome() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((prd) => {
        setProducts(prd.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-3">
      <Carousel />
      <h1 className="text-center text-gray-700 text-2xl font-bold mt-6">
        Browse Our Products
      </h1>
      <div className="flex flex-wrap justify-start mt-3 mb-6 p-10">
        {products.map((product, index) => (
          <Link href={`/${product.slug}`} key={product.id}>
            {/* Image section */}
            <div className="outline-1 outline-gray-300 rounded m-2 w-[250px] h-[250px] flex flex-col overflow-hidden">
              {/* Image section */}
              <div className="relative w-full h-[150px]">
                <Image
                  src={
                    product.productPhotos.length > 0
                      ? product.productPhotos[0].imageUrl
                      : "/placeholder.jpg"
                  }
                  fill
                  alt="product-image"
                  className="object-cover"
                />
              </div>

              {/* product title and price section */}
              <div className="flex flex-col justify-between flex-grow p-2">
                <div className="product-title max-w-44">
                  <h4 className="font-medium text-md text-slate-700 mb-1">
                    {product.name}
                  </h4>
                  {product.totalStock <= 5 && (
                    <p className="font-medium text-xs text-red-500">
                      Hanya {product.totalStock} lagi!
                    </p>
                  )}
                </div>
                <h5 className="text-gray-800 font-semibold text-sm">
                  {formatCurrency(product.price)}
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
