"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";

export default function UserOrders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.id) return;
    fetch(`/api/orders/my/${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data.orders));
  }, [user]);

  return (
    <div>
      {orders.map((order) => (
        <div className="w-1/2 border border-gray-300 rounded-lg p-4 mb-4 bg-white"  key={order.id}>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Order Number: {order.orderNumber}
          </h3>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Status: {order.status}
          </h3>
      
          <div className="space-y-4">
            {order.orderItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 flex gap-4 bg-gray-50"
              >
                {/* Image Section */}
                <Link href={`/${item.slug ?? ""}`} className="shrink-0">
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
                      {item.productSize.product.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Size: {item.productSize.name}
                    </p>
                  </div>
      
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-800">
                      Price: {formatCurrency(item.price)}
                    </p>
                    <p className="text-sm text-gray-800">
                      Quantity: {item.quantity}x
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      Subtotal: {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
      
          <Link
            href={`/user/orders/${order.orderNumber}`}
            className="inline-block mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
      ))}
    </div>
  );
}
