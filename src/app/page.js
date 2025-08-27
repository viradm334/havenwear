"use client";

import UserLayout from "@/components/layout/UserLayout";
import UserHome from "@/components/pages/UserHome";
import { Suspense } from "react";

export default function Home() {
  return (
    <UserLayout>
      <Suspense>
        <UserHome />
      </Suspense>
    </UserLayout>
  );
}
