"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import Modal from "../ui/Modal";
import AdminComplaintForm from "../form/AdminComplaintForm";

export default function AdminComplaintDetail() {
  const [complaint, setComplaint] = useState({});
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/complaint/${id}`)
      .then((res) => res.json())
      .then((data) => setComplaint(data.complaint));
  }, []);

  return (
    <>
      <Modal
        title="Complaint Resolve Form"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <AdminComplaintForm complaintId={complaint.id} />
      </Modal>
      <div className="flex flex-col p-2">
        <div className="flex gap-5 mb-3">
          <div>
            <h4 className="font-bold">No. Order</h4>
            <p className="mb-2">{complaint.orderItem?.order?.orderNumber || ''}</p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Komplain</h4>
            <p className="mb-2">
              {dayjs(complaint.created_at).format("DD-MM-YYYY")}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Cancel</h4>
            <p className="mb-2">
              {complaint.canceled_at
                ? dayjs(complaint.canceled_at).format("DD-MM-YYYY")
                : "-"}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Status Komplain</h4>
            <p className="mb-2">{complaint.status}</p>
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
                ? dayjs(complaint.reviewed_at).format("DD-MM-YYYY")
                : "-"}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Resolve</h4>
            <p className="mb-2">
            {complaint.resolved_at
                ? dayjs(complaint.resolved_at).format("DD-MM-YYYY")
                : "-"}
            </p>
          </div>
        </div>
        <h1 className="font-bold">Barang yang Dikomplain</h1>
        <div className="outline-1 outline-gray-300 rounded p-3 m-2 w-1/2 flex gap-4">
          <Link href={`/`}>
            <Image
              src="/placeholder.jpg"
              width={300}
              height={300}
              alt="item-image"
            />
          </Link>

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

        <div className="flex gap-4">
          <Link
            href={"/admin/complaints"}
            className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            Kembali
          </Link>
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
