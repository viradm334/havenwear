"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

export default function UserComplaints({ user }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/complaint/my/${user.id}`)
      .then((res) => res.json())
      .then((data) => setComplaints(data.complaints));
  }, [user]);

  const cancelComplaint = async(id) => {
    const confirmed = confirm("Anda yakin untuk membatalkan komplain?");

    if(confirmed){
        try{
            const res = await fetch(`/api/complaint/cancel/${id}`, {
                method: 'PATCH'
            });

            const data = await res.json();

            if(res.ok){
                alert(data.message);
                window.location.reload();
            }else{
                console.error(err.message);
                alert(data.message);
            }
        }catch(err){
            console.error(err.message);
            alert("Gagal untuk membatalkan komplain!");
        }
    }else{
        return;
    }
  }

  return (
    <div>
      {complaints.map((complaint, index) => (
        <div
          key={complaint.id}
          className="w-3/4 border border-gray-300 rounded-lg p-4 bg-white mb-3"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Order Number: {complaint.orderItem.order.orderNumber}
          </h3>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Status: {complaint.status}
          </h3>

          <div className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-gray-50">
            {/* Image Section */}
            <Link
              href={`/${complaint.orderItem.productSize.product.slug ?? ""}`}
              className="shrink-0"
            >
              <Image
                src="/placeholder.jpg"
                width={100}
                height={100}
                alt="item-image"
                className="rounded-md object-cover"
              />
            </Link>

            {/* Info + Qty Section */}
            <div className="flex flex-col justify-between w-full">
              <div>
                <h4 className="text-base font-medium text-gray-700">
                  {complaint.orderItem.productSize.product.name}
                </h4>
                <p className="text-sm text-gray-600">
                  Size: {complaint.orderItem.productSize.name}
                </p>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-800">
                  Price: {formatCurrency(complaint.orderItem.price)}
                </p>
                <p className="text-sm text-gray-800">
                  Quantity: {complaint.orderItem.quantity}x
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  Subtotal:{" "}
                  {formatCurrency(
                    complaint.orderItem.price * complaint.orderItem.quantity
                  )}
                </p>
                <hr className="border-gray-400"></hr>
                <h4 className="text-md font-bold text-gray-800">Detail Komplain</h4>
                <h4 className="text-sm text-gray-800">Catatan dari pembeli: {complaint.message}</h4>
                <h4 className="text-sm text-gray-800">Catatan dari admin: {complaint.adminMessage || '-'}</h4>
              </div>
            </div>
          </div>
          {complaint.status === 'OPEN' && (
            <div className="flex justify-end">
            <button className="inline-block mt-4 px-4 py-2 outline-1 outline-emerald-500 bg-white hover:bg-emerald-500 hover:text-white text-emerald-500 text-sm font-medium rounded transition cursor-pointer" onClick={() => cancelComplaint(complaint.id)}>
              Batalkan Komplain
            </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
