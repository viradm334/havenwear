"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import Image from "next/image";
import Pagination from "../ui/Pagination";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function AdminOrders() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [payment, setPayment] = useState(searchParams.get("payment") || "");
  const [orderNumber, setOrderNumber] = useState(
    searchParams.get("orderNumber") || ""
  );
  const [inputOrderNumber, setInputOrderNumber] = useState("");

  useEffect(() => {
    fetch(
      `/api/orders?page=${page}&status=${status}&payment=${payment}&orderNumber=${orderNumber}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.ordersWithTotal);
        setIsLoading(false);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage,
        });
      });
  }, [page, status, payment, orderNumber]);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    if (inputOrderNumber) {
      setOrderNumber(inputOrderNumber);
      params.set("orderNumber", inputOrderNumber);
      params.set("page", "1");
    } else {
      params.delete("orderNumber");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push("/admin/orders");
    setInputOrderNumber("");
    setOrderNumber("");
    setStatus("");
    setPayment("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3">
        <form onSubmit={handleSearch} className="flex flex-col gap-1">
          <label className="text-sm">Search Product</label>
          <div className="relative w-full mb-3">
            <input
              type="text"
              className="w-full pr-12 p-2 rounded-sm outline-1 outline-gray-300 placeholder:text-sm focus:outline-emerald-600"
              placeholder="Search..."
              value={inputOrderNumber}
              name="inputOrderNumber"
              onChange={(e) => setInputOrderNumber(e.target.value)}
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 size-5" />
          </div>
        </form>
        <div className="flex flex-col justify-center">
          <button
            onClick={handleReset}
            className="bg-amber-500 hover:bg-amber-600 text-white transition rounded px-4 py-1"
          >
            Clear Search
          </button>
        </div>
      </div>

      <div className="mb-3">
        <form className="flex items-end gap-5">
          <div className="flex flex-col gap-1 w-1/4">
            <label className="text-sm">Order Status</label>
            <select
              className="outline-1 outline-gray-300 rounded-sm p-1.5 focus:outline-emerald-600"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSED">Processed</option>
              <option value="SENT">Sent</option>
              <option value="FINISHED">Finished</option>
              <option value="CANCELED">Canceled</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-1/4">
            <label className="text-sm">Payment Status</label>
            <select
              className="outline-1 outline-gray-300 rounded-sm p-1.5 focus:outline-emerald-600"
              name="status"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </form>
      </div>
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
              <td className="border border-gray-300 p-2">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="border border-gray-300 p-2">
                <OrderStatusBadge status={order.payment} />
              </td>
              <td className="border border-gray-300 p-2">
                {formatCurrency(order.totalPrice)}
              </td>
              <td className="border border-gray-300 p-2">
                {dayjs(order.created_at).format("DD-MM-YYYY")}
              </td>
              <td className="border border-gray-300 p-2">
                <Link
                  href={`/admin/orders/${order.orderNumber}`}
                  className="outline-none rounded bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}
