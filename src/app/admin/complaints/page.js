"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import AdminComplaint from "@/components/pages/AdminComplaint";
import { Suspense } from "react";

export default function AdminComplaintPage() {
  return (
    <AdminLayout title="Complaints">
      <Suspense>
        <AdminComplaint />
      </Suspense>
    </AdminLayout>
  );
}
