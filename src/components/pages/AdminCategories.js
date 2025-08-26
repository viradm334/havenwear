"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Pagination from "../ui/Pagination";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });

  useEffect(() => {
    fetch(`/api/categories/summary?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage,
        });
        setIsLoading(false);
      });
  }, [page]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Gambar</th>
            <th className="border border-gray-300 p-2">Jumlah Produk</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((ctg, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{ctg.name}</td>
              <td className="border border-gray-300 p-2 text-center">
                <div className="relative w-[80px] h-[80px] mx-auto">
                  <Image
                    src={ctg.imageUrl}
                    fill
                    alt="category-image"
                    className="rounded-md object-cover"
                  />
                </div>
              </td>
              <td className="border border-gray-300 p-2">
                {ctg.productsCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}
