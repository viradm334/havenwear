"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import BackButton from "../ui/BackButton";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import dayjs from "dayjs";

export default function UserComplaints({ user }) {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/complaint/my/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaints(data.complaints);
        setIsLoading(false);
      });
  }, [user]);

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
      {complaints.map((complaint, index) => (
        <div
          key={complaint.id}
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
    </div>
  );
}
