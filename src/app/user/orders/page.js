'use client';

import UserLayout from "@/components/layout/UserLayout";
import UserOrders from "@/components/pages/UserOrders";

export default function UserOrderspage(){
    return(<UserLayout title="My Orders">
        <UserOrders/>
    </UserLayout>)
}