"use client";

export default function OrderStatusBadge({ status }) {
  const colors = {
    FINISHED: "bg-green-200 text-green-600",
    PENDING: "bg-amber-200 text-amber-600",
    SENT: "bg-violet-200 text-violet-600",
    PROCESSED: "bg-blue-200 text-blue-600",
    CANCELED: "bg-red-200 text-red-600",
    UNPAID: "bg-amber-200 text-amber-600",
    PAID: "bg-green-200 text-green-600",
    OPEN: "bg-amber-200 text-amber-600",
    REVIEWED: "bg-blue-200 text-blue-600",
    RESOLVED: "bg-green-200 text-green-600",
  };

  const colorClass = colors[status] ?? "bg-gray-200 text-gray-600";

  return (
    <span className={`rounded ${colorClass} font-semibold text-xs px-1 py-1`}>
      {status}
    </span>
  );
}
