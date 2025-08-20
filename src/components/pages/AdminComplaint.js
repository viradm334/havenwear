"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminComplaint() {
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetch("/api/complaint")
      .then((res) => res.json())
      .then((usr) => setComplaints(usr.complaints));
  }, []);

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

  return (
    <>
      <table className="border-collapse border border-gray-400 bg-white w-full text-center">
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
              <td className="border border-gray-300 p-2">{complaint.status}</td>
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
                    className="outline-none rounded-md bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 cursor-pointer"
                  >
                    Detail
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
