"use client";

import Link from "next/link";

export default function AdminProducts() {
  return (
    <>
    <Link href={'/admin/product/create'}>
      <button className="outline-none rounded px-3 py-2 bg-emerald-600 text-white mb-6 cursor-pointer hover:bg-emerald-700">
        + Create New Product
      </button>
    </Link>
      <table className="border-collapse border border-gray-400 w-full text-center">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Stock</th>
            <th className="border border-gray-300 p-2">Products Sold</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Indiana</td>
            <td className="border border-gray-300 p-2">Indiana</td>
            <td className="border border-gray-300 p-2">Indianapolis</td>
            <td className="border border-gray-300 p-2">Indianapolis</td>
            <td className="border border-gray-300 p-2">Indianapolis</td>
            <td className="border border-gray-300 p-2">Indianapolis</td>
            <td className="border border-gray-300 p-2">Indianapolis</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
