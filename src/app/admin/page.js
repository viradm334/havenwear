'use client'

import AdminLayout from "@/components/layout/AdminLayout";
import AdminDashboard from "@/components/pages/AdminDashboard";

export default function AdminHome(){
    return(<AdminLayout title="Dashboard">
        <AdminDashboard/>
    </AdminLayout>)
}