"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import Image from "next/image";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {setOrders(data.ordersWithTotal); setIsLoading(false)});
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
      <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">No. Order</th>
            <th className="border border-gray-300 p-2">Customer</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Status Pesanan</th>
            <th className="border border-gray-300 p-2">Status Pembayaran</th>
            <th className="border border-gray-300 p-2">Total Harga Pesanan</th>
            <th className="border border-gray-300 p-2">Tanggal Order</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                {order.orderNumber}
              </td>
              <td className="border border-gray-300 p-2">{order.user.name}</td>
              <td className="border border-gray-300 p-2">{order.email}</td>
              <td className="border border-gray-300 p-2"><OrderStatusBadge status={order.status}/></td>
              <td className="border border-gray-300 p-2"><OrderStatusBadge status={order.payment}/></td>
              <td className="border border-gray-300 p-2">{formatCurrency(order.totalPrice)}</td>
              <td className="border border-gray-300 p-2">
                {dayjs(order.created_at).format("DD-MM-YYYY")}
              </td>
              <td className="border border-gray-300 p-2">
                <Link href={`/admin/orders/${order.orderNumber}`} className="outline-none rounded bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer">Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
