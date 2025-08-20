"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function UserCart() {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  useEffect(() => {
    if (cart?.id) {
      fetch(`/api/cart/get-items/${cart.id}`)
        .then((res) => res.json())
        .then((item) => {
          setCartItems(item.data);
          setIsLoading(false);
        });
    }
  }, [cart]);

  const updateQuantity = (itemId, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

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

  const addQuantity = async (cartItemId, quantity) => {
    try {
      const addedQty = quantity + 1;
      const res = await fetch(`/api/cart/update-quantity/${cartItemId}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: addedQty }),
      });

      const data = await res.json();

      if (res.ok) {
        updateQuantity(cartItemId, addedQty);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const decreaseQuantity = async (cartItemId, quantity) => {
    if (quantity === 1) {
      const confirmed = confirm(
        "Apa anda mau menghapus item ini dari keranjang?"
      );

      if (confirmed) {
        try {
          const res = await fetch(`/api/cart/delete-item/${cartItemId}`, {
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
        } catch (err) {
          console.error(err.message);
        }
      }
    } else {
      try {
        const decreasedQty = quantity - 1;
        const res = await fetch(`/api/cart/update-quantity/${cartItemId}`, {
          method: "PATCH",
          body: JSON.stringify({ quantity: decreasedQty }),
        });

        const data = await res.json();

        if (res.ok) {
          updateQuantity(cartItemId, decreasedQty);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="main flex gap-10">
      <div className="flex flex-col w-2/3">
        {cartItems.length !== 0 ? (
          <div className="flex flex-col">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="outline-1 outline-gray-300 rounded p-3 mb-3 w-full flex gap-4 shadow-sm"
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
                <div className="flex w-full justify-between items-center">
                  {/* Title & Price */}
                  <div className="flex flex-col">
                    <h4 className="font-medium text-sm text-slate-700">
                      {item.productSize.product.name}
                    </h4>
                    <h5 className="text-gray-800 font-semibold mb-2">
                      {formatCurrency(item.productSize.product.price)}
                    </h5>
                    <h4 className="font-medium text-sm text-slate-700">
                      Ukuran: {item.productSize.name}
                    </h4>
                  </div>

                  {/* Qty Box directly below price */}
                  <div className="flex items-center">
                    <div className="qty-box flex w-full h-9 items-center justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          decreaseQuantity(item.id, item.quantity);
                        }}
                        className="outline-1 outline-gray-400 w-8 h-8 flex justify-center items-center font-bold"
                      >
                        −
                      </button>
                      <div className="outline-1 outline-gray-400 px-4 py-1">
                        {item.quantity}
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          addQuantity(item.id, item.quantity);
                        }}
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
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 outline-1 outline-gray-300">
            <p className="mb-3 text-center text-lg font-medium text-gray-700">
              Keranjang belanjamu kosong!
            </p>
            <Link
              href="/"
              className="text-white bg-emerald-800 hover:bg-emerald-900 rounded px-4 py-2 w-40 text-center"
            >
              Mulai belanja
            </Link>
          </div>
        )}
      </div>
      <div className="outline-1 outline-gray-300 bg-white rounded p-5 flex flex-col w-1/3 h-1/2 shadow-md">
        <h1 className="font-bold text-xl text-gray-700 mb-3">
          Ringkasan Belanja
        </h1>
        <h1 className="font-medium text-md text-gray-700">
          Total belanja:{" "}
          {formatCurrency(
            cartItems.reduce(
              (acc, item) =>
                acc + item.quantity * item.productSize.product.price,
              0
            )
          )}
        </h1>
        <div className="flex justify-center">
          {cartItems.length > 0 ? (          <Link
            href={"/checkout"}
            className="text-white text-center bg-emerald-800 rounded hover:bg-emerald-900 px-3 py-2 mt-4 cursor-pointer w-full"
          >
            Check Out
          </Link>): (<button className="text-white text-center bg-gray-300 rounded px-3 py-2 mt-4 w-full" disabled>Checkout</button>)}

        </div>
      </div>
    </div>
  );
}
