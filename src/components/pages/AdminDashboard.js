"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import DashboardCard from "../ui/DashboardCard";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [income, setIncome] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [openComplaints, setOpenComplaints] = useState(0);
  const [ordersToSend, setOrdersToSend] = useState(0);

  useEffect(() => {
    fetch('/api/dashboard').then(res => res.json()).then(data => {
      setIncome(data.totalIncome._sum.price);
      setPendingOrders(data.pendingOrders);
      setOpenComplaints(data.openComplaints);
      setOrdersToSend(data.ordersToSend);
    })
  }, []);

  return (
    <>
      <div className="flex p-2">
        <DashboardCard title={"Income"} content={formatCurrency(income)} />
        <DashboardCard
          title={"Pending Orders"}
          content={pendingOrders}
        />
        <DashboardCard title={"Open Complaints"} content={openComplaints} />
        <DashboardCard
          title={"Orders to Send"}
          content={ordersToSend}
        />
      </div>
    </>
  );
}
