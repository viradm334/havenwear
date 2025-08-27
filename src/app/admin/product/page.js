"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import AdminProducts from "@/components/pages/AdminProducts";
import { Suspense } from "react";

export default function AdminProductsPage() {
  return (
    <AdminLayout title="Products">
      <Suspense>
        <AdminProducts />
      </Suspense>
    </AdminLayout>
  );
}
