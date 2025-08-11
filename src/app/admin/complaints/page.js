'use client'

import AdminLayout from "@/components/layout/AdminLayout"
import AdminComplaint from "@/components/pages/AdminComplaint"

export default function AdminComplaintPage(){
    return(<AdminLayout title="Complaints">
        <AdminComplaint/>
    </AdminLayout>)
}