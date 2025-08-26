"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import OrderStatusBadge from "../ui/OrderStatusBadge";
import Image from "next/image";
import Pagination from "../ui/Pagination";

export default function AdminUsers() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = parseInt(searchParams.get("page") || "1");
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    lastPage: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(searchParams.get("role") || "");

  useEffect(() => {
    fetch(`/api/users?page=${page}&role=${role}`)
      .then((res) => res.json())
      .then((usr) => {
        setUsers(usr.data);
        setIsLoading(false);
        setMeta({
          total: usr.meta.total,
          page: usr.meta.page,
          lastPage: usr.meta.lastPage,
        });
      });
  }, [page, role]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div>
          <form className="flex flex-col">
            <label className="font-medium mb-2 text-gray-800">
              Cari berdasarkan role
            </label>
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="outline-1 outline-gray-300 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
            >
              <option value="">Select role</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </form>
        </div>
      </div>
      <table className="border-collapse border border-gray-400 bg-white w-full text-center text-sm">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">No.</th>
            <th className="border border-gray-300 p-2">Nama</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">No.HP</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Tgl Bergabung</th>
            <th className="border border-gray-300 p-2">Order</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-2">{index + 1}</td>
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">
                {user.phoneNumber ? user.phoneNumber : "-"}
              </td>
              <td className="border border-gray-300 p-2">
                <OrderStatusBadge status={user.role} />
              </td>
              <td className="border border-gray-300 p-2">
                {dayjs(user.created_at).format("DD-MM-YYYY")}
              </td>
              <td className="border border-gray-300 p-2">
                {user._count.orders}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} lastPage={meta.lastPage} />
    </div>
  );
}
