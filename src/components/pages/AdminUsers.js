"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((usr) => setUsers(usr.data));
  }, []);

  return (
    <>
      <table className="border-collapse border border-gray-400 w-full text-center">
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
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2">{dayjs(user.created_at).format("DD-MM-YYYY")}</td>
              <td className="border border-gray-300 p-2">{user._count.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
