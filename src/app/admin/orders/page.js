import AdminLayout from "@/components/layout/AdminLayout";
import AdminOrders from "@/components/pages/AdminOrders";
import { Suspense } from "react";

export default function AdminOrdersPage() {
  return (
    <AdminLayout title="Orders">
      <Suspense>
        <AdminOrders />
      </Suspense>
    </AdminLayout>
  );
}
