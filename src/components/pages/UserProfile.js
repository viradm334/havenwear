"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function UserProfile({ user }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
  });

  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/auth/data/${user.id}`)
      .then((res) => res.json())
      .then((data) =>
        setProfile({
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          address: data.user.address,
          city: data.user.city,
          province: data.user.province,
        })
      );
  }, [user]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
        <div>
          <h1 className="font-bold text-sm text-gray-600">Nama</h1>
          <p className="font-medium text-gray-800">{profile.name}</p>
        </div>
        <div>
          <h1 className="font-bold text-sm text-gray-600">Email</h1>
          <p className="font-medium text-gray-800">{profile.email}</p>
        </div>
        <div>
          <h1 className="font-bold text-sm text-gray-600">No. HP</h1>
          <p className="font-medium text-gray-800">{profile.phoneNumber}</p>
        </div>
        <div>
          <h1 className="font-bold text-sm text-gray-600">Alamat</h1>
          <p className="font-medium text-gray-800">{profile.address}</p>
        </div>
        <div>
          <h1 className="font-bold text-sm text-gray-600">Kota</h1>
          <p className="font-medium text-gray-800">{profile.city}</p>
        </div>
        <div>
          <h1 className="font-bold text-sm text-gray-600">Provinsi</h1>
          <p className="font-medium text-gray-800">{profile.province}</p>
        </div>
      </div>
      <Link
        href={"/user/profile/edit"}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Edit Profil
      </Link>
    </div>
  );
}
