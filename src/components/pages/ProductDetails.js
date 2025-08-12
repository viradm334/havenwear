"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSize] = useState("");
  const [cart, setCart] = useState(null);
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, []);

  useEffect(() => {
    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((pd) => setProduct(pd.data));
  }, [slug]);

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
    e.preventDefault()
    try{
        const res = await fetch('/api/cart/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                cartId: cart.id,
                productSizeId: selectedSize,
                quantity: quantity,
              }),            
        });

        const data = await res.json();

        if(res.ok){
            alert(data.message);
        }
    }catch(err){
        alert(err);
        console.error(err);
    }
  }

  return (
    <>
      <div className="main w-full flex justify-center items-center">
        <div className="p-10 flex">
          <div className="img w-1/2 p-5">
            <Image
              src="/placeholder.jpg"
              height={800}
              width={700}
              alt="product-image"
            />
          </div>
          <div className="product-details w-1/2 flex flex-col">
            <h1>{product?.name}</h1>
            <div className="qty-box flex w-1/4 mb-3">
              <button
                type="button"
                onClick={decreaseQuantity}
                className="decrease-box outline-1 outline-gray-400 w-1/4 p-1 flex justify-center items-center font-bold"
              >
                -
              </button>
              <div className="decrease-box outline-1 outline-gray-400 w-1/2 p-1 flex justify-center items-center">
                {quantity}
              </div>
              <button
                type="button"
                onClick={addQuantity}
                className="decrease-box outline-1 outline-gray-400 w-1/4 p-1 flex justify-center items-center font-bold"
              >
                +
              </button>
            </div>
            <div className="sizes-box flex w-full">
              {product?.productSizes.map((size, index) => (
                <button
                key={index}
                onClick={() => setSize(size.id)}
                className={`flex justify-center items-center px-3 py-2 m-2 rounded outline-1 ${
                  selectedSize === size.id
                    ? 'bg-gray-800 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {size.name}
              </button>              
              ))}
            </div>
            <button className="w-full text-white bg-emerald-700 hover:bg-emerald-800 rounded px-3 py-2 cursor-pointer mb-3" type="button" onClick={insertCartItem}>
              Tambah ke Keranjang
            </button>
            <h1 className="font-bold text-md">Deskripsi</h1>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}