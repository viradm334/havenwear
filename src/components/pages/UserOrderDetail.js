"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";
import Modal from "../ui/Modal";
import ComplaintForm from "../form/ComplaintForm";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import BackButton from "../ui/BackButton";

export default function UserOrderDetail({ orderNumber }) {
  const [order, setOrder] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderItemId, setOrderItemId] = useState(null);
  const [orderItemName, setOrderItemName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) return;

    fetch(`/api/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.orderWithTotal);
        setIsLoading(false);
      });
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
        <BackButton destination={"/user/orders"} />
        <div className="flex gap-2 justify-evenly text-sm mb-3 rounded p-5">
          <div className="flex flex-col gap-2 w-1/3 text-sm mb-3 outline-1 bg-white rounded shadow-md outline-gray-200 p-5">
            <h4 className="text-md text-gray-800 font-semibold mb-3 text-center">
              Status Pesanan
            </h4>
            <div>
              <h4 className="font-bold">No. Order</h4>
              <p className="mb-2">{order.orderNumber}</p>
            </div>
            <div>
              <h4 className="font-bold">Tanggal Pesan</h4>
              <p className="mb-2">
                {dayjs(order.created_at).format("DD-MM-YYYY HH:mm")}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-1">Status Pesanan</h4>
              <OrderStatusBadge status={order.status} />
            </div>
            {order.status === "CANCELED" && (
              <div>
                <h4 className="font-bold">Tanggal Pesanan Dibatalkan</h4>
                <p className="mb-2">
                  {dayjs(order.canceled_at).format("DD-MM-YYYY HH:mm")}
                </p>
              </div>
            )}
            <div>
              <h4 className="font-bold">No. Resi</h4>
              <p className="mb-2">{order.no_resi || "-"}</p>
            </div>
          </div>
          <div className="flex flex-col w-1/3 gap-2 text-sm mb-3 outline-1 bg-white rounded shadow-md outline-gray-200 p-5">
            <h4 className="text-md text-gray-800 font-semibold mb-3 text-center">
              Alamat Pengiriman
            </h4>
            <div>
              <h4 className="font-bold">Nama Pembeli</h4>
              <p className="mb-2">{order.user?.name}</p>
            </div>
            <div>
              <h4 className="font-bold">No. HP</h4>
              <p className="mb-2">{order.phoneNumber}</p>
            </div>
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
          <div className="flex flex-col w-1/3 gap-2 text-sm mb-3 outline-1 bg-white rounded shadow-md outline-gray-200 p-5">
            <h4 className="text-md text-gray-800 font-semibold mb-3 text-center">
              Pembayaran
            </h4>
            <div>
              <h4 className="font-bold">Metode Pembayaran</h4>
              <p className="mb-2">{order.paymentMethod}</p>
            </div>
            <div>
              <h4 className="font-bold">Status Pembayaran</h4>
              <OrderStatusBadge status={order.payment} />
            </div>
            <div>
              <h4 className="font-bold">Tanggal Bayar</h4>
              <p className="mb-2">
                {order.paid_at
                  ? dayjs(order.paid_at).format("DD-MM-YYYY  HH:mm")
                  : "-"}
              </p>
            </div>
            <div>
              <h4 className="font-bold">Tanggal Pembayaran Dikonfirmasi</h4>
              <p className="mb-2">
                {order.payment_confirmed_at
                  ? dayjs(order.payment_confirmed_at).format("DD-MM-YYYY HH:mm")
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 px-5">
          <h1 className="font-bold">Detail Produk</h1>
          {order.orderItems?.map((item, index) => (
            <div
              key={item.id}
              className="outline-1 outline-gray-300 bg-white rounded p-5 w-full flex gap-4 shadow-sm"
            >
              {/* Image Section */}
              <Link href={`/${item.productSize.product.slug}`}>
                <div className="relative w-[150px] h-[100px]">
                  <Image
                    src={
                      item.productSize.product.productPhotos.length > 0
                        ? item.productSize.product.productPhotos[0].imageUrl
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
                {/* Title & Price */}
                <h4 className="font-bold text-md text-slate-700">
                  {item.productSize.product.name}
                </h4>
                <h4 className="font-medium text-sm text-slate-700">
                  Ukuran: {item.productSize.name}
                </h4>
                <h5 className="text-gray-800 text-sm font-medium">
                  Jumlah: {item.quantity}
                </h5>
                <h5 className="text-gray-800 font-medium text-sm">
                  Harga satuan: {formatCurrency(item.price)}
                </h5>
                <h5 className="text-gray-800 font-semibold text-end mb-3">
                  Subtotal: {formatCurrency(item.price * item.quantity)}
                </h5>
                {order.status === "SENT" && (
                  <div className="flex justify-end">
                    <button
                      className="px-6 py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
                      onClick={() => {
                        setOrderItemId(item.id);
                        setOrderItemName(item.productSize.product.name);
                        setIsOpen(true);
                      }}
                    >
                      Komplain Item
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col px-5 justify-end">
          <h1 className="font-bold text-emerald-700 mt-5 mb-3">
            Total Price: {formatCurrency(order.totalPrice)}
          </h1>
        </div>

        <div className="flex gap-4 justify-center">
          {order.payment === "UNPAID" && order.status !== "CANCELED" && (
            <button
              className="px-6 py-1 rounded outline-1 outline-emerald-600 text-emerald-600 cursor-pointer"
              onClick={payOrder}
            >
              Bayar Pesanan
            </button>
          )}
          {order.status === "SENT" && (
            <div className="flex gap-2">
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
