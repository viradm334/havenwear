'use client';

import AdminLayout from "@/components/layout/AdminLayout";
import CreateProductForm from "@/components/form/CreateProductForm";

export default function CreateProductPage(){
    return(<AdminLayout title="Create New Product">
        <CreateProductForm/>
    </AdminLayout>)
}