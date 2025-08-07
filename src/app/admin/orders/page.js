import AdminLayout from "@/components/layout/AdminLayout";
import AdminOrders from "@/components/pages/AdminOrders";

export default function AdminOrdersPage(){
    return(<AdminLayout title="Orders">
        <AdminOrders/>
    </AdminLayout>)
}