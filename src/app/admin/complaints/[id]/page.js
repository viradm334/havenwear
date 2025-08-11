'use client'

import AdminLayout from "@/components/layout/AdminLayout"
import AdminComplaintDetail from "@/components/pages/AdminComplaintDetail"

export default function AdminComplaintDetailPage(){
    return(<AdminLayout title="Complaint Detail">
        <AdminComplaintDetail/>
    </AdminLayout>)
}