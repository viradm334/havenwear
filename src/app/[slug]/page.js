'use client';

import UserLayout from "@/components/layout/UserLayout";
import ProductDetails from "@/components/pages/ProductDetails";

export default function ProductDetailsPage(){
  return(<UserLayout title="Product Details">
    <ProductDetails/>
  </UserLayout>)
}