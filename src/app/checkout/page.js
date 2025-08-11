'use client';

import UserLayout from "@/components/layout/UserLayout";
import UserCheckout from "@/components/pages/UserCheckout";

export default function Checkout(){
  return(<UserLayout title="Checkout">
    <UserCheckout/>
  </UserLayout>)
}