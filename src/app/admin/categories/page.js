'use client'

import AdminLayout from "@/components/layout/AdminLayout"
import AdminCategories from "@/components/pages/AdminCategories"

export default function AdminCategoriesPage(){
    return(<AdminLayout title="Product Categories">
        <AdminCategories/>
    </AdminLayout>)
}