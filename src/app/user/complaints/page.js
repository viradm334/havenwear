'use client';

import UserLayout from "@/components/layout/UserLayout";
import UserComplaints from "@/components/pages/UserComplaints";

export default function UserComplaintsPage(){
    return(<UserLayout title="My Complaints">
        <UserComplaints/>
    </UserLayout>)
}