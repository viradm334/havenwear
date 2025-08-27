"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import AdminUsers from "@/components/pages/AdminUsers";
import { Suspense } from "react";

export default function AdminUsersPage() {
  return (
    <Suspense>
      <AdminLayout title="Users">
        <AdminUsers />
      </AdminLayout>
    </Suspense>
  );
}
