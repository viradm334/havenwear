"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  useEffect(() => {
    if (cart?.id) {
      fetch(`/api/cart/get-items/${cart.id}`)
        .then((res) => res.json())
        .then((item) => setCartItems(item.data));
    }
  }, [cart]);

  const handleDelete = async (id) => {
    const confirmed = confirm(
      "Apa anda yakin untuk menghapus barang dari keranjang?"
    );

    if (confirmed) {
      const res = await fetch(`/api/cart/delete-item/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        window.location.reload();
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } else {
      return;
    }
  };

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="main flex">
      <div className="flex flex-col p-5 w-full">
        {cartItems.length !== 0 ? (
          <div className="flex flex-col">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="outline-1 outline-gray-300 rounded p-3 m-2 w-full md:w-1/2 flex gap-4"
              >
                {/* Image Section */}
                <Link href={`/${item.slug}`}>
                  <Image
                    src="/placeholder.jpg"
                    width={300}
                    height={300}
                    alt="item-image"
                  />
                </Link>

                {/* Info + Qty Section */}
                <div className="flex flex-col justify-between w-full">
                  {/* Title & Price */}
                  <h4 className="font-medium text-sm text-slate-700">
                    {item.productSize.product.name}
                  </h4>
                  <h5 className="text-gray-800 font-semibold mb-2">
                    {formatCurrency(item.productSize.product.price)}
                  </h5>

                  {/* Qty Box directly below price */}
                  <div className="qty-box flex w-2/3 h-9 items-center">
                    <button
                      type="button"
                      onClick={decreaseQuantity}
                      className="outline-1 outline-gray-400 w-8 h-8 flex justify-center items-center font-bold"
                    >
                      −
                    </button>
                    <div className="outline-1 outline-gray-400 px-4 py-1">
                      {item.quantity}
                    </div>
                    <button
                      type="button"
                      onClick={addQuantity}
                      className="outline-1 outline-gray-400 w-8 h-8 flex justify-center items-center font-bold"
                    >
                      +
                    </button>
                    <button onClick={() => handleDelete(item.id)}>
                      <TrashIcon className="size-5 text-red-600 ml-4 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center">
            <Link
              href={"/checkout"}
              className="text-white text-center bg-emerald-800 rounded hover:bg-emerald-900 px-3 py-2 mt-4 cursor-pointer"
            >
              Check Out
            </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="mb-3 text-center text-lg font-medium text-gray-700">
              Cart is Empty
            </p>
            <Link
              href="/"
              className="text-white bg-emerald-800 hover:bg-emerald-900 rounded px-4 py-2 w-40 text-center"
            >
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
