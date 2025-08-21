"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/admin")
      .then((res) => res.json())
      .then((item) => {
        setProducts(item.data);
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
    <>
      <Link href={"/admin/product/create"}>
        <button className="outline-none rounded px-3 py-2 transition bg-emerald-600 text-white mb-6 cursor-pointer hover:bg-emerald-700">
          + Create New Product
        </button>
      </Link>
      <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Products Sold</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2 text-center">
                <div className="relative w-[150px] h-[100px] mx-auto">
                  <Image
                    src={
                      product.productPhotos.length > 0
                        ? product.productPhotos[0].imageUrl
                        : "/placeholder.jpg"
                    }
                    fill
                    alt="item-image"
                    className="rounded-md object-cover"
                  />
                </div>
              </td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">
                {product.category.name}
              </td>
              <td className="border border-gray-300 p-2">
                {product.totalStock}
              </td>
              <td className="border border-gray-300 p-2">
                {product.totalSold}
              </td>
              <td className="border border-gray-300 p-2">{product.status}</td>
              <td className="border border-gray-300 p-2">
                <Link
                  href={`/admin/product/edit/${product.slug}`}
                  className="outline-none bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
