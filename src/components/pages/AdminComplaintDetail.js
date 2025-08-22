"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import Modal from "../ui/Modal";
import AdminComplaintForm from "../form/AdminComplaintForm";
import BackButton from "../ui/BackButton";
import OrderStatusBadge from "../ui/OrderStatusBadge";

export default function AdminComplaintDetail() {
  const [complaint, setComplaint] = useState({});
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/complaint/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComplaint(data.complaint);
        setIsLoading(false);
      });
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
      <Modal
        title="Complaint Resolve Form"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AdminComplaintForm complaintId={complaint.id} />
      </Modal>
      <BackButton destination={"/admin/complaints"} />
      <div className="flex flex-col p-5 text-sm gap-2">
        <div className="flex gap-5 mb-3">
          <div>
            <h4 className="font-bold">No. Order</h4>
            <p className="mb-2">
              {complaint.orderItem?.order?.orderNumber || ""}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Komplain</h4>
            <p className="mb-2">
              {dayjs(complaint.created_at).format("DD-MM-YYYY HH:mm")}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Cancel</h4>
            <p className="mb-2">
              {complaint.canceled_at
                ? dayjs(complaint.canceled_at).format("DD-MM-YYYY HH:mm")
                : "-"}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Status Komplain</h4>
            <OrderStatusBadge status={complaint.status} />
          </div>
        </div>
        <div className="flex gap-5 mb-3">
          <div>
            <h4 className="font-bold">Nama Pembeli</h4>
            <p className="mb-2">{complaint.orderItem?.order.user.name}</p>
          </div>
          <div>
            <h4 className="font-bold">Catatan dari Pembeli</h4>
            <p className="mb-2">{complaint.message}</p>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <h4 className="font-bold">Catatan dari Admin</h4>
            <p className="mb-2">{complaint.adminMessage || "-"}</p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Review</h4>
            <p className="mb-2">
              {complaint.reviewed_at
                ? dayjs(complaint.reviewed_at).format("DD-MM-YYYY HH:mm")
                : "-"}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Resolve</h4>
            <p className="mb-2">
              {complaint.resolved_at
                ? dayjs(complaint.resolved_at).format("DD-MM-YYYY HH:mm")
                : "-"}
            </p>
          </div>
        </div>
        {/* Product Picture */}
        <div className="fle flex-col">
          <h1 className="font-bold">Barang yang Dikomplain</h1>
          <div className="outline-1 outline-gray-300 bg-white shadow-sm rounded p-3 m-2 w-1/2 flex gap-4">
            <div className="relative w-[150px] h-[100px] mx-auto">
              <Image
                src={
                  complaint.orderItem.productSize.product.productPhotos.length >
                  0
                    ? complaint.orderItem.productSize.product.productPhotos[0]
                        .imageUrl
                    : "/placeholder.jpg"
                }
                fill
                alt="item-image"
                className="rounded-md object-cover"
              />
            </div>

            <div className="flex flex-col justify-between w-full">
              <h4 className="font-medium text-sm text-slate-700">
                {complaint.orderItem?.productSize?.product?.name || ""}
              </h4>
              <h5 className="text-gray-800 font-semibold mb-2">
                {formatCurrency(
                  complaint.orderItem?.productSize?.product?.price || 0
                )}
              </h5>
              <h5 className="text-gray-800 font-medium mb-2">
                Ukuran: {complaint.orderItem?.productSize.name || ""}
              </h5>
              <h5 className="text-gray-800 font-semibold mb-2">
                {complaint.orderItem?.quantity || 0}x
              </h5>
              <h5 className="text-gray-800 font-medium mb-2">
                {formatCurrency(
                  (complaint.orderItem?.productSize?.product?.price || 0) *
                    (complaint.orderItem?.quantity || 0)
                )}
              </h5>
            </div>
          </div>
        </div>
        {/* End of Product Picture */}
        <div className="flex gap-4">
          {complaint.status === "REVIEWED" && (
            <button
              className="px-3 py-1 rounded text-white bg-green-500 hover:bg-green-600 cursor-pointer"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Selesaikan Komplain
            </button>
          )}
        </div>
      </div>
    </>
  );
}
