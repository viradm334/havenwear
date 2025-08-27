"use client";

import UserLayout from "@/components/layout/UserLayout";
import UserOrders from "@/components/pages/UserOrders";
import { Suspense } from "react";

export default function UserOrderspage() {
  return (
    <Suspense>
      <UserLayout title="My Orders">
        <UserOrders />
      </UserLayout>
    </Suspense>
  );
}
