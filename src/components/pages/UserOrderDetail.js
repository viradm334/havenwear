"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";
import Modal from "../ui/Modal";
import ComplaintForm from "../form/ComplaintForm";

export default function UserOrderDetail({ orderNumber }) {
  const [order, setOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderItemId, setOrderItemId] = useState(null);
  const [orderItemName, setOrderItemName] = useState(null);

  useEffect(() => {
    if (!orderNumber) return;

    fetch(`/api/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => setOrder(data.orderWithTotal));
  }, [orderNumber]);

  const payOrder = async () => {
    const confirmed = confirm("Anda yakin untuk membayar pesanan?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/pay/${orderNumber}`, {
          method: "PATCH",
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          window.location.reload();
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
    }
  };

  const finishOrder = async () => {
    const confirmed = confirm("Anda yakin menyelesaikan pesanan?");

    if (confirmed) {
      try {
        const res = await fetch(`/api/orders/finish/${orderNumber}`, {
          method: "PATCH",
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          window.location.reload();
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err.message);
        alert(err.message);
      }
    }
  };

  return (
    <>
      <Modal
        title="Complaint Form"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {orderItemId && (
          <ComplaintForm
            orderItemId={orderItemId}
            orderItemName={orderItemName}
            userId={order.userId}
          />
        )}
      </Modal>
      <div className="flex flex-col p-2">
        <div className="flex gap-5 mb-3">
          <div>
            <h4 className="font-bold">No. Order</h4>
            <p className="mb-2">{order.orderNumber}</p>
          </div>
          <div>
            <h4 className="font-bold">Tanggal Pesan</h4>
            <p className="mb-2">
              {dayjs(order.created_at).format("DD-MM-YYYY")}
            </p>
          </div>
          <div>
            <h4 className="font-bold">Status Pesanan</h4>
            <p className="mb-2">{order.status}</p>
          </div>
          <div>
            <h4 className="font-bold">Status Pembayaran</h4>
            <p className="mb-2">{order.payment}</p>
          </div>
          <div>
            <h4 className="font-bold">No. Resi</h4>
            <p className="mb-2">{order.no_resi || "-"}</p>
          </div>
        </div>
        <div className="flex gap-5 mb-3">
          <div>
            <h4 className="font-bold">Nama Pembeli</h4>
            <p className="mb-2">{order.user?.name}</p>
          </div>
          <div>
            <h4 className="font-bold">Email</h4>
            <p className="mb-2">{order.email}</p>
          </div>
          <div>
            <h4 className="font-bold">No. HP</h4>
            <p className="mb-2">{order.phoneNumber}</p>
          </div>
          <div>
            <h4 className="font-bold">Metode Pembayaran</h4>
            <p className="mb-2">{order.paymentMethod}</p>
          </div>
        </div>
        <div className="flex gap-5">
          <div>
            <h4 className="font-bold">Alamat</h4>
            <p className="mb-2">{order.address}</p>
          </div>
          <div>
            <h4 className="font-bold">Kota</h4>
            <p className="mb-2">{order.city}</p>
          </div>
          <div>
            <h4 className="font-bold">Provinsi</h4>
            <p className="mb-2">{order.province}</p>
          </div>
        </div>
        <h1 className="font-bold">Barang yang Dipesan</h1>
        {order.orderItems?.map((item, index) => (
          <div
            key={index}
            className="outline-1 outline-gray-300 rounded p-3 m-2 w-1/2 flex gap-4"
          >
            {/* Image Section */}
            <Link href={`/${item.slug}`}>
              <Image
                src="/placeholder.jpg"
                width={300}
                height={300}
                alt="item-image"
              />
            </Link>

            {/* Info + Qty Section */}
            <div className="flex flex-col justify-between w-full">
              {/* Title & Price */}
              <h4 className="font-medium text-sm text-slate-700">
                {item.productSize.product.name}
              </h4>
              <h5 className="text-gray-800 font-semibold mb-2">
                {formatCurrency(item.price)}
              </h5>
              <h5 className="text-gray-800 font-semibold mb-2">
                {item.quantity}x
              </h5>
              <h5 className="text-gray-800 font-semibold mb-2">Subtotal</h5>
              <h5 className="text-gray-800 font-medium mb-2">
                {formatCurrency(item.price * item.quantity)}
              </h5>
              {(order.status === "SENT" && item.complaints.length === 0) ? (
                <button
                  className="px-3 py-1 w-1/2 rounded text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                  onClick={() => {
                    setOrderItemId(item.id);
                    setOrderItemName(item.productSize.product.name);
                    setIsOpen(true);
                  }}
                >
                  Komplain Produk
                </button>
              ) : ''}
            </div>
          </div>
        ))}
        <h1 className="font-bold mb-3">
          Total Price: {formatCurrency(order.totalPrice)}
        </h1>

        <div className="flex gap-4">
          <Link
            href={"/user/orders"}
            className="px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
          >
            Kembali
          </Link>
          {order.payment === "UNPAID" && (
            <button
              className="px-6 py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              onClick={payOrder}
            >
              Bayar Pesanan
            </button>
          )}
          {order.status === "SENT" && (
            <div>
              <button
                className="px-6 py-1 rounded text-white bg-green-500 hover:bg-green-600 cursor-pointer"
                onClick={finishOrder}
              >
                Selesaikan Pesanan
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
