"use client";

import UserLayout from "@/components/layout/UserLayout";
import UserWishlist from "@/components/pages/UserWishlist";
import { Suspense } from "react";

export default function UserWishlistPage() {
  return (
    <Suspense>
      <UserLayout title="Wishlist">
        <UserWishlist />
      </UserLayout>
    </Suspense>
  );
}
