"use client";

import UserLayout from "@/components/layout/UserLayout";
import UserComplaints from "@/components/pages/UserComplaints";
import { Suspense } from "react";

export default function UserComplaintsPage() {
  return (
    <Suspense>
      <UserLayout title="My Complaints">
        <UserComplaints />
      </UserLayout>
    </Suspense>
  );
}
