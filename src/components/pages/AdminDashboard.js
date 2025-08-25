"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import DashboardCard from "../ui/DashboardCard";
import { useState, useEffect } from "react";
import OrderChart from "../ui/OrderChart";
import Image from "next/image";
import MostProductsSoldChart from "../ui/MostProductsSoldChart";

export default function AdminDashboard() {
  const [income, setIncome] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [openComplaints, setOpenComplaints] = useState(0);
  const [ordersToSend, setOrdersToSend] = useState(0);
  const [barChartData, setBarChartData] = useState([]);
  const [doughnutChartData, setDoughnutChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard').then(res => res.json()).then(data => {
      setIncome(data.totalIncome._sum.price);
      setPendingOrders(data.pendingOrders);
      setOpenComplaints(data.openComplaints);
      setOrdersToSend(data.ordersToSend);
      setBarChartData(data.chartData);
      setDoughnutChartData(data.mostProductsSold);
      setIsLoading(false);
    })
  }, []);

    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
        </div>
      );
    }

  return (
    <div className="flex flex-col p-2">
      {/* Dashboard Card */}
      <div className="flex">
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
      {/* Dashboard Charts */}
      <div className="flex mt-5 gap-2">
        <div className="w-1/2 relative outline-1 outline-gray-300 rounded bg-white p-3">
        <h4 className="font-semibold text-gray-800 mb-3">Daily Orders Count</h4>
          <OrderChart chartData={barChartData} />
        </div>
        <div className="w-1/2 h-80 relative outline-1 outline-gray-300 rounded bg-white p-3">
        <h4 className="font-semibold text-gray-800 mb-3">Most Products Sold</h4>
          <MostProductsSoldChart chartData={doughnutChartData}/>
        </div>
      </div>
    </div>
  );
}
