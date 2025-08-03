"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import DashboardCard from "../ui/DashboardCard";

export default function AdminDashboard() {
  return (
    <>
      <div className="flex p-2">
        <DashboardCard title={"Income"} content={formatCurrency(10000)} />
        <DashboardCard
          title={"Pending Orders"}
          content={formatCurrency(10000)}
        />
        <DashboardCard title={"Complaints"} content={formatCurrency(10000)} />
        <DashboardCard
          title={"Unread Messages"}
          content={formatCurrency(10000)}
        />
      </div>
    </>
  );
}
