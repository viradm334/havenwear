"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/nav/Navbar";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import Sidebar from "@/components/nav/Sidebar";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);


  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  useEffect(() => {
    if (cart?.id) {
      fetch(`/api/cart/get-items/${cart.id}`)
        .then((res) => res.json())
        .then((item) => setCartItems(item.data));
    }
  }, [cart]);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      return;
    } else {
      setQuantity(quantity - 1);
      console.log(cart.id);
      console.log(typeof(cart.id))
      console.log(size);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main flex">
        <Sidebar role={user?.role} />
        <div className="flex flex-col mt-3 p-5 w-5/6">
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
        </div>
      </div>
    </div>
  ))}
    <Link href={'/checkout'} className="text-white text-center bg-emerald-800 rounded hover:bg-900 w-1/2 px-3 py-2 mt-4 cursor-pointer">
    Check Out
    </Link>
</div>
      </div>
    </>
  );
}
