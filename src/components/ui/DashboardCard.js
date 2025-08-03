'use client';

export default function DashboardCard({ title, content }) {
  return (
    <div className="rounded shadow-xl p-4 w-1/4 bg-white gap-2 mr-3">
      <h1 className="font-bold mb-3">{title}</h1>
      <p>{content}</p>
    </div>
  );
}
