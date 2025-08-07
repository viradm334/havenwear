'use client';

import UserLayout from "@/components/layout/UserLayout";
import UserOrderDetail from "@/components/pages/UserOrderDetail";
import { useParams } from "next/navigation";

export default function UserOrderdetailPage(){
    const {orderNumber} = useParams();

    return(<UserLayout title="Order Details">
        <UserOrderDetail orderNumber={orderNumber}/>
    </UserLayout>)
}