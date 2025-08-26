"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import Pagination from "../ui/Pagination";

export default function AdminComplaint() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const [status, setStatus] = useState(searchParams.get("status") || "");

  useEffect(() => {
    fetch(`/api/complaint?page=${page}&status=${status}`)
      .then((res) => res.json())
      .then((usr) => {
        setComplaints(usr.complaints);
        setIsLoading(false);
        setMeta({
          total: usr.meta.total,
          page: usr.meta.page,
          lastPage: usr.meta.lastPage,
        });
      });
  }, [page, status]);

  const reviewComplaint = async (complaintId) => {
    try {
      const res = await fetch(`/api/complaint/review/${complaintId}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (res.ok) {
        router.push(`/admin/complaints/${complaintId}`);
      } else {
        console.error(data.message);
        alert(data.message);
      }
    } catch (err) {
      console.error(err.message);
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
    <div className="flex flex-col gap-2">
      <div className="mb-3">
        <form className="flex items-end gap-5">
          <div className="flex flex-col gap-1 w-1/4">
            <label>Order Status</label>
            <select
              className="outline-1 outline-gray-300 rounded-sm p-1.5 focus:outline-emerald-600"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select status</option>
              <option value="OPEN">Open</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CANCELED">Canceled</option>
            </select>
          </div>
        </form>
      </div>
      <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">User</th>
            <th className="border border-gray-300 p-2">
              Produk yang Dikomplain
            </th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Tanggal Dibuat</th>
            <th className="border border-gray-300 p-2">No. Order</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">
                {complaint.orderItem.order.user.name}
              </td>
              <td className="border border-gray-300 p-2">
                {complaint.orderItem.productSize.product.name}
              </td>
              <td className="border border-gray-300 p-2">
                <OrderStatusBadge status={complaint.status} />
              </td>
              <td className="border border-gray-300 p-2">
                {dayjs(complaint.created_at).format("DD-MM-YYYY")}
              </td>
              <td className="border border-gray-300 p-2">
                {complaint.orderItem.order.orderNumber}
              </td>
              <td className="border border-gray-300">
                {complaint.status === "OPEN" && (
                  <button
                    onClick={() => reviewComplaint(complaint.id)}
                    className="outline-none rounded-md bg-green-500 hover:bg-green-600 text-white px-3 py-1 cursor-pointer"
                  >
                    Review
                  </button>
                )}
                {complaint.status !== "OPEN" && (
                  <Link
                    href={`/admin/complaints/${complaint.id}`}
                    className="outline-none rounded-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer"
                  >
                    Detail
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}
