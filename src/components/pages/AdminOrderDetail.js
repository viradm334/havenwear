"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import Image from "next/image";
import Modal from "../ui/Modal";
import InputResiForm from "../form/InputResiForm";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import BackButton from "../ui/BackButton";

export default function AdminOrderDetail() {
  const [order, setOrder] = useState({});
  const params = useParams();
  const { orderNumber } = params;
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data.orderWithTotal);
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

  const confirmPayment = async () => {
    try {
      const confirmed = confirm("Anda yakin untuk konfirmasi pembayaran?");

      if (!confirmed) {
        return;
      } else {
        const res = await fetch(`/api/pay/confirm/${order.orderNumber}`, {
          method: "PATCH",
        });

        const data = await res.json();

        if (res.ok) {
          alert(data.message);
          window.location.reload();
        } else {
          console.error(data.message);
          alert(data.message);
        }
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <>
      <Modal
        title="Input No. Resi"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <InputResiForm orderNumber={orderNumber} />
      </Modal>
      <BackButton destination={"/admin/orders"} />
      <div className="flex flex-col p-5 gap-2 text-sm">
        <div className="flex gap-5">
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
            <OrderStatusBadge status={order.status} />
          </div>
          <div>
            <h4 className="font-bold">Status Pembayaran</h4>
            <OrderStatusBadge status={order.payment} />
          </div>
          <div>
            <h4 className="font-bold">No. Resi</h4>
            <p className="mb-2">{order.no_resi || "-"}</p>
          </div>
        </div>
        <div className="flex gap-5">
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
            key={item.id}
            className="outline-1 outline-gray-300 bg-white rounded p-5 w-1/2 flex gap-4 shadow-sm mb-3"
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
              <h5 className="text-gray-800 font-semibold">
                Subtotal: {formatCurrency(item.price * item.quantity)}
              </h5>
            </div>
          </div>
        ))}
        <h1 className="font-bold mb-3">
          Total Price: {formatCurrency(order.totalPrice)}
        </h1>

        <div className="flex gap-4">
          {order.paid_at && !order.payment_confirmed_at && (
            <button
              className="px-6 py-1 rounded text-white bg-yellow-500 hover:bg-yellow-600 cursor-pointer"
              onClick={confirmPayment}
            >
              Konfirmasi Pembayaran
            </button>
          )}
          {order.status === "PROCESSED" && (
            <button
              className="px-6 py-1 rounded text-white bg-green-500 hover:bg-green-600 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Kirim Barang
            </button>
          )}
        </div>
      </div>
    </>
  );
}
