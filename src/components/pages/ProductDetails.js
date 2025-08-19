"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ProductDetails({ user }) {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSize] = useState("");
  const [cart, setCart] = useState(null);
  const [isWishlisted, setIsWishListed] = useState(false);
  const params = useParams();
  const { slug } = params;
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.product));
  }, [slug]);

  useEffect(() => {
    if (!user || !product) return;
    fetch(`/api/wishlist/check?userId=${user.id}&productId=${product.id}`)
      .then((res) => res.json())
      .then((data) => setIsWishListed(data.wishlisted));
  }, [user, product]);

  const addToWishList = async (productId) => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`/api/wishlist/create`, {
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsWishListed(true);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteFromWishList = async (productId) => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(
        `/api/wishlist/delete?userId=${user.id}&productId=${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setIsWishListed(false);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
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

  const insertCartItem = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch("/api/cart/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cart.id,
          productSizeId: selectedSize,
          quantity: quantity,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
      }
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  return (
    <>
      <div className="main w-full flex justify-center items-center">
        <div className="max-w-6xl w-full p-6 md:p-10 flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="img w-full md:w-1/2 flex justify-center items-center">
            <Image
              src="/placeholder.jpg"
              height={800}
              width={700}
              alt="product-image"
              className="rounded-lg object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="product-details w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">{product?.name}</h1>

            {/* Quantity Selector */}
            <div className="qty-box flex items-center gap-2 w-40">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="w-8 h-8 border border-gray-400 rounded flex justify-center items-center font-bold"
              >
                -
              </button>
              <div className="w-12 h-8 border border-gray-400 rounded flex justify-center items-center">
                {quantity}
              </div>
              <button
                type="button"
                onClick={addQuantity}
                className="w-8 h-8 border border-gray-400 rounded flex justify-center items-center font-bold"
              >
                +
              </button>
            </div>

            {/* Size Selector */}
            <div className="sizes-box flex flex-wrap gap-2">
              {product?.productSizes.map((size, index) => {
                const isOutOfStock = size.stock < 1;
                const isSelected = selectedSize === size.id;

                return (
                  <button
                    key={index}
                    onClick={() => !isOutOfStock && setSize(size.id)}
                    disabled={isOutOfStock}
                    className={`px-4 py-2 rounded border transition-colors duration-200
        ${
          isSelected
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-800 hover:bg-gray-100"
        }
        ${isOutOfStock ? "opacity-50 cursor-not-allowed hover:bg-white" : ""}
      `}
                  >
                    {size.name}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              {/* Add to Cart Button */}
              <button
                className="w-full md:w-1/2 text-white bg-emerald-700 hover:bg-emerald-800 rounded px-4 py-2 font-medium"
                type="button"
                onClick={insertCartItem}
              >
                Tambah ke Keranjang
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                className={`p-2 rounded border ${
                  isWishlisted
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                title={
                  isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"
                }
                onClick={() => {
                  isWishlisted
                    ? deleteFromWishList(product.id)
                    : addToWishList(product.id);
                }}
              >
                <HeartIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-bold text-lg mb-1">Deskripsi</h2>
              <p className="text-gray-700">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
