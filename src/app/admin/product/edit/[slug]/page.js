'use client'

import AdminLayout from "@/components/layout/AdminLayout"
import EditProductForm from "@/components/form/EditProductForm"

export default function EditProductPage(){
    return(<AdminLayout title="Edit Product">
        <EditProductForm/>
    </AdminLayout>)
}