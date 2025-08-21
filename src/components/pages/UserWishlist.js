"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import BackButton from "../ui/BackButton";

export default function UserWishlist({ user }) {
  const [wishlists, setWishlists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    fetch(`/api/wishlist/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setWishlists(data.wishlist);
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <BackButton destination={"/"} />
      <div className="flex flex-wrap gap-2 p-3">
        {wishlists.length > 0 ? (
          wishlists.map((wishlist, index) => (
            <Link href={`/${wishlist.product.slug}`} key={index}>
              <div className="outline-1 outline-gray-300 rounded gap-4 m-2">
                <div className="relative w-[150px] h-[100px]">
                  <Image
                    src={
                      wishlist.product.productPhotos.length > 0
                        ? wishlist.product.productPhotos[0].imageUrl
                        : "/placeholder.jpg"
                    }
                    fill
                    alt="item-image"
                    className="object-cover"
                  />
                </div>
                <div className="product-title p-2 max-w-44">
                  <h4 className="font-medium text-sm text-slate-700 mb-3">
                    {wishlist.product.name}
                  </h4>
                  <h5 className="text-gray-800 font-semibold align-bottom">
                    {formatCurrency(wishlist.product.price)}
                  </h5>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex justify-center items-center w-full h-64">
            <div className="text-center text-gray-500">Wishlist is empty</div>
          </div>
        )}
      </div>
    </div>
  );
}
