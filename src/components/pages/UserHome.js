"use client";

import Image from "next/image";
import Navbar from "@/components/nav/Navbar";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";

export default function UserHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((prd) => setProducts(prd.data));
  }, []);

  return (
      <div className="flex mt-3">
        {
          products.map((product, index) => (
            <Link href={`/${product.slug}`} key={product.id}>
            <div
              className="outline-1 outline-gray-300 rounded gap-4 m-2"
            >
              <Image src={'/placeholder.jpg'} width={160} height={160} alt="product-image"/>
              <div className="product-title p-2 max-w-44">
                <h4 className="font-medium text-sm text-slate-700 mb-3">{product.name}</h4>
                <h5 className="text-gray-800 font-semibold align-bottom">{formatCurrency(product.price)}</h5>
              </div>
            </div>
            </Link>
          ))}
      </div>
  );
}
