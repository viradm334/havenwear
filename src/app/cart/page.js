"use client";

import UserLayout from "@/components/layout/UserLayout";
import UserCart from "@/components/pages/UserCart";

export default function CartPage(){
  return(<UserLayout title="Keranjang">
    <UserCart/>
  </UserLayout>)
}