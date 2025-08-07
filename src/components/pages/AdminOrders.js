"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.ordersWithTotal));
  }, []);

  return (
    <>
      <table className="border-collapse border border-gray-400 w-full text-center">
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
              <td className="border border-gray-300 p-2">{order.status}</td>
              <td className="border border-gray-300 p-2">{order.payment}</td>
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
