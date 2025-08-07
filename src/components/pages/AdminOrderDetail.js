"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";

export default function AdminOrderDetail() {
  const [order, setOrder] = useState({});
  const params = useParams();
  const { orderNumber } = params;

  useEffect(() => {
    fetch(`/api/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.orderWithTotal));
  }, []);

  const confirmPayment = async () => {
    try {
      const confirmed = confirm("Anda yakin untuk konfirmasi pembayaran?");

      if (!confirmed) {
        return;
      } else {
        const res = await fetch(`/api/pay/confirm/${order.orderNumber}`, {
          method: "PATCH",
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
        } else {
          console.error(data.message);
          alert(data.message);
        }
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col p-2">
      <div className="flex gap-5 mb-3">
        <div>
          <h4 className="font-bold">No. Order</h4>
          <p className="mb-2">{order.orderNumber}</p>
        </div>
        <div>
          <h4 className="font-bold">Tanggal Pesan</h4>
          <p className="mb-2">{dayjs(order.created_at).format("DD-MM-YYYY")}</p>
        </div>
        <div>
          <h4 className="font-bold">Status Pesanan</h4>
          <p className="mb-2">{order.status}</p>
        </div>
        <div>
          <h4 className="font-bold">Status Pembayaran</h4>
          <p className="mb-2">{order.payment}</p>
        </div>
        <div>
          <h4 className="font-bold">Metode Pembayaran</h4>
          <p className="mb-2">{order.paymentMethod}</p>
        </div>
      </div>
      <div className="flex gap-5 mb-3">
        <div>
          <h4 className="font-bold">Nama Pembeli</h4>
          <p className="mb-2">{order.user?.name}</p>
        </div>
        <div>
          <h4 className="font-bold">Email</h4>
          <p className="mb-2">{order.email}</p>
        </div>
        <div>
          <h4 className="font-bold">No. HP</h4>
          <p className="mb-2">{order.phoneNumber}</p>
        </div>
      </div>
      <div className="flex gap-5">
        <div>
          <h4 className="font-bold">Alamat</h4>
          <p className="mb-2">{order.address}</p>
        </div>
        <div>
          <h4 className="font-bold">Kota</h4>
          <p className="mb-2">{order.city}</p>
        </div>
        <div>
          <h4 className="font-bold">Provinsi</h4>
          <p className="mb-2">{order.province}</p>
        </div>
      </div>
      <h1 className="font-bold">Barang yang Dipesan</h1>
      {order.orderItems?.map((item, index) => (
        <div
          key={index}
          className="outline-1 outline-gray-300 rounded p-3 m-2 w-1/2 flex gap-4"
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
              {formatCurrency(item.price)}
            </h5>
            <h5 className="text-gray-800 font-semibold mb-2">
              {item.quantity}x
            </h5>
            <h5 className="text-gray-800 font-semibold mb-2">Subtotal</h5>
            <h5 className="text-gray-800 font-medium mb-2">
              {formatCurrency(item.price * item.quantity)}
            </h5>
          </div>
        </div>
      ))}
      <h1 className="font-bold mb-3">
        Total Price: {formatCurrency(order.totalPrice)}
      </h1>

      <div className="flex gap-4">
        <button className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 cursor-pointer">
          Kembali
        </button>
        {order.paid_at && !order.payment_confirmed_at && (
          <button
            className="px-6 py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
            onClick={confirmPayment}
          >
            Bayar
          </button>
        )}
        {order.status === "PROCESSED" && (
          <button
            className="px-6 py-1 rounded text-white bg-green-500 hover:bg-green-600 cursor-pointer"
            onClick={confirmPayment}
          >
            Kirim Barang
          </button>
        )}
      </div>
    </div>
  );
}
