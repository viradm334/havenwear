"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import BackButton from "../ui/BackButton";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import dayjs from "dayjs";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Pagination from "../ui/Pagination";

export default function UserComplaints({ user }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });

  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/complaint/my/${user.id}?page=${page}&status=${status}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data.complaints);
        setMeta({
          total: data.meta.total,
          page: data.meta.page,
          lastPage: data.meta.lastPage,
        });
        setIsLoading(false);
      });
  }, [user, page, status]);

  const cancelComplaint = async (id) => {
    const confirmed = confirm("Anda yakin untuk membatalkan komplain?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/complaint/cancel/${id}`, {
          method: "PATCH",
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          window.location.reload();
        } else {
          console.error(err.message);
          alert(data.message);
        }
      } catch (err) {
        console.error(err.message);
        alert("Gagal untuk membatalkan komplain!");
      }
    } else {
      return;
    }
  };

  const handleChange = (e) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);

    const params = new URLSearchParams(searchParams.toString());
    if (selectedStatus) {
      params.set("status", selectedStatus);
      params.set("page", "1");
    } else {
      params.delete("status");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilter = () => {
    setStatus("");
    router.push(pathname);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col p-3 items-center gap-4">
      <BackButton destination={"/"} />
      <div className="flex gap-5">
        <h4 className="text-gray-700 font-semibold">Status</h4>
        <button
          className="outline-1 outline-emerald-600 bg-white rounded text-emerald-600 px-3 py-1 cursor-pointer"
          value={"OPEN"}
          onClick={handleChange}
        >
          Open
        </button>
        <button
          className="outline-1 outline-emerald-600 bg-white rounded text-emerald-600 px-3 py-1 cursor-pointer"
          value={"REVIEWED"}
          onClick={handleChange}
        >
          Reviewed
        </button>
        <button
          className="outline-1 outline-emerald-600 bg-white rounded text-emerald-600 px-3 py-1 cursor-pointer"
          value={"RESOLVED"}
          onClick={handleChange}
        >
          Resolved
        </button>
        <button
          className="outline-1 outline-emerald-600 bg-white rounded text-emerald-600 px-3 py-1 cursor-pointer"
          value={"CANCELED"}
          onClick={handleChange}
        >
          Canceled
        </button>
        <button
          className=" text-emerald-600 font-semibold px-3 py-1 cursor-pointer"
          onClick={clearFilter}
        >
          Clear Filters
        </button>
      </div>
      {complaints.map((complaint, index) => (
        <div
          key={index}
          className="w-3/4 border border-gray-300 rounded-lg p-4 bg-white shadow-md"
        >
          <div className="flex gap-3 px-2 mb-3">
            <h3 className="text-sm font-semibold text-gray-800">
              {complaint.orderItem.order.orderNumber}
            </h3>
            <h3 className="text-sm text-gray-800">
              {dayjs(complaint.created_at).format("DD MMM YYYY")}
            </h3>
            <OrderStatusBadge status={complaint.status} />
          </div>

          <div className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-gray-50">
            {/* Image Section */}
            <Link
              href={`/${complaint.orderItem.productSize.product.slug ?? ""}`}
              className="shrink-0"
            >
              <div className="relative w-[150px] h-[100px]">
                <Image
                  src={
                    complaint.orderItem.productSize.product.productPhotos
                      .length > 0
                      ? complaint.orderItem.productSize.product.productPhotos[0]
                          .imageUrl
                      : "/placeholder.jpg"
                  }
                  fill
                  alt="item-image"
                  className="rounded-md object-cover"
                />
              </div>
            </Link>

            {/* Info + Qty Section */}
            <div className="flex flex-col justify-between w-full">
              <div>
                <h4 className="font-semibold text-sm text-gray-700">
                  {complaint.orderItem.productSize.product.name} -{" "}
                  {complaint.orderItem.productSize.name}
                </h4>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-800">
                  Price: {formatCurrency(complaint.orderItem.price)}
                </p>
                <p className="text-sm text-gray-800">
                  Quantity: {complaint.orderItem.quantity}x
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  Subtotal:{" "}
                  {formatCurrency(
                    complaint.orderItem.price * complaint.orderItem.quantity
                  )}
                </p>
                <hr className="border-gray-400"></hr>
                <h4 className="text-sm font-bold text-gray-700">
                  Detail Komplain
                </h4>
                <h4 className="text-sm text-gray-700">
                  Catatan dari pembeli: {complaint.message}
                </h4>
                <h4 className="text-sm text-gray-700">
                  Catatan dari admin: {complaint.adminMessage || "-"}
                </h4>
              </div>
            </div>
          </div>
          {complaint.status === "OPEN" && (
            <div className="flex justify-end">
              <button
                className="inline-block mt-4 px-4 py-2 outline-1 outline-emerald-500 bg-white hover:bg-emerald-500 hover:text-white text-emerald-500 text-sm font-medium rounded transition cursor-pointer"
                onClick={() => cancelComplaint(complaint.id)}
              >
                Batalkan Komplain
              </button>
            </div>
          )}
        </div>
      ))}
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}
