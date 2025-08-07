import AdminLayout from "@/components/layout/AdminLayout";
import AdminOrderDetail from "@/components/pages/AdminOrderDetail";


export default function AdminOrderDetailPage(){
    return(<AdminLayout title="Order Details">
        <AdminOrderDetail/>
    </AdminLayout>)
}