"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Carousel from "../ui/Carousel";
import { InboxIcon } from "@heroicons/react/24/solid";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Pagination from "../ui/Pagination";

export default function UserHome() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });

  useEffect(() => {
    fetch(`/api/products?page=${page}&category=${selectedCategory}`)
      .then((res) => res.json())
      .then((prd) => {
        setProducts(prd.data);
        setMeta({
          total: prd.meta.total,
          page: prd.meta.page,
          lastPage: prd.meta.lastPage
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products:", err.message);
        setIsLoading(false);
      });
  }, [page, selectedCategory]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((ctg) => setCategories(ctg.data));
  }, []);

  const handleChange = (slug) => {
    const selectedCategory = slug;
    setSelectedCategory(selectedCategory);

    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategory) {
      params.set("category", selectedCategory);
      params.set("page", "1");
    } else {
      params.delete("category");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilter = () => {
    setSelectedCategory("");
    router.push(pathname);
  };

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
      {/* Category card */}
      <div className="outline-1 outline-gray-300 shadow-md p-5 flex flex-col gap-2 mt-8">
        <h1 className="text-xl text-gray-700 font-bold">Kategori</h1>
        <div className="flex gap-4 justify-center">
          {categories.map((ctg, index) => {
            const isSelected = ctg.slug === selectedCategory;
            return (
              <div
                key={index}
                className={`flex flex-col p-3 outline-1 ${
                  isSelected ? "outline-emerald-500" : "outline-gray-100"
                } shadow-md rounded w-[120px] h-[160px] cursor-pointer`}
                onClick={() => handleChange(ctg.slug)}
              >
                <div className="relative w-[100px] h-[100px] overflow-hidden">
                  <Image
                    src={ctg.imageUrl}
                    fill
                    alt="ctg-image"
                    className="object-contain rounded-md"
                  />
                </div>

                <h1 className="text-center text-sm text-gray-700 mb-2 font-bold">
                  {ctg.name.toUpperCase()}
                </h1>
              </div>
            );
          })}
        </div>
        {selectedCategory && (
          <button
            onClick={clearFilter}
            className="w-fit self-center mt-3 px-3 py-2 text-sm bg-emerald-500 text-white rounded hover:bg-emerald-600 transition"
          >
            Clear Filter
          </button>
        )}
      </div>
      {/* End of category card */}
      <h1 className=" text-gray-700 text-xl font-bold mt-6">Rekomendasi</h1>
      <div className="flex flex-wrap mb-6 p-10">
        {products.length > 0 ? (
          products.map((product, index) => (
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
          ))
        ) : (
          <div className="flex flex-col text-gray-400 w-full justify-center items-center">
            <InboxIcon className="size-20 mb-5" />
            <h4 className="font-light">Produk tidak ditemukan</h4>
          </div>
        )}
      </div>
      <Pagination page={page} lastPage={meta.lastPage}/>
    </div>
  );
}
