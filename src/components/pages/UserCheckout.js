"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

export default function UserCheckout({user}) {
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    province: "",
    phoneNumber: "",
    paymentMethod: ''
  });

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

  useEffect(() => {
    if (user?.id) {
      fetch(`/api/auth/data/${user.id}`)
        .then((res) => res.json())
        .then((item) =>
          setFormData({
            name: item.user.name,
            address: item.user.address,
            email: item.user.email,
            phoneNumber: item.user.phoneNumber,
            city: item.user.city,
            province: item.user.province,
          })
        );
    }
  }, [cart]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.userId = user.id;
    formData.cartId = cart.id;
    formData.productSizes = cartItems;
    try{
        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if(res.ok){
            alert(data.message);
        }else{
            alert(data.message);
            console.error(data.message);
        }
    }catch(err){
        alert(err.message);
        console.error(err.message);
    }
  };

  return (
    <>
      <div className="main flex">
        <div className="flex mt-3 p-5 w-full">
          <form className="flex flex-col outline-1 outline-gray-300 p-5 w-1/2 rounded shadow-md" onSubmit={handleSubmit}>
            <h1 className="font-bold mb-3 text-center">Biodata Pelanggan</h1>
            <label className="text-sm text-emerald-700 font-bold mb-1.5">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              placeholder="Enter your name here"
              value={formData?.name || ''}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-emerald-700 font-bold mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              placeholder="Enter your name here"
              value={formData?.email || ''}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-emerald-700 font-bold mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              placeholder="Enter your name here"
              value={formData?.phoneNumber || ''}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-emerald-700 font-bold mb-1.5">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              placeholder="Enter your address here"
              value={formData?.address || ""}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-emerald-700 font-bold mb-1.5">
              City
            </label>
            <input
              type="text"
              name="city"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              placeholder="Enter your city here"
              value={formData?.city || ""}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-emerald-700 font-bold mb-1.5">
              Province
            </label>
            <input
              type="text"
              name="province"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              placeholder="Enter your province here"
              value={formData?.province || ""}
              onChange={handleChange}
              required
            />
            <label className="text-sm text-emerald-700 font-bold mb-1.5">
              Payment Method
            </label>
            <select name="paymentMethod" className="outline-1 outline-gray-400 focus:outline-emerald-600 rounded p-2" onChange={handleChange} value={formData?.paymentMethod || ""} required>
                <option value={'TRANSFER'}>Transfer</option>
                <option value={'CREDITCARD'}>Kartu Kredit</option>
                <option value={'INDOMARET'}>Indomaret</option>
            </select>

            <button type="submit" className="text-white text-center bg-emerald-800 rounded hover:bg-900 w-full px-3 py-2 mt-4 cursor-pointer">Buat Pesanan</button>
          </form>
          <div className="flex flex-col w-1/2">
          <h1 className="font-bold mb-3 text-center">Barang yang Dipesan</h1>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="outline-1 outline-gray-300 rounded p-3 m-2 w-full flex gap-4"
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
                <h4 className="font-medium text-sm text-slate-700">
                  {item.productSize.name}
                </h4>
                <h5 className="text-gray-800 font-semibold mb-2">
                  {formatCurrency(item.productSize.product.price)}
                </h5>
                <h5 className="text-gray-800 font-semibold mb-2">
                  {item.quantity}x
                </h5>
                <h5 className="text-gray-800 font-semibold mb-2">Subtotal</h5>
                <h5 className="text-gray-800 font-medium mb-2">
                  {formatCurrency(
                    item.productSize.product.price * item.quantity
                  )}
                </h5>
              </div>
            </div>
          ))}
          <h1 className="text-center">
            Total:
            {formatCurrency(
              cartItems.reduce(
                (acc, item) =>
                  acc + item.quantity * item.productSize.product.price,
                0
              )
            )}
          </h1>
          </div>
        </div>
      </div>
    </>
  );
}
