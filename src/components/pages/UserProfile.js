"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserProfile({ user }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    province: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`/api/auth/data/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          address: data.user.address,
          city: data.user.city,
          province: data.user.province,
        });
        setIsLoading(false);
      });
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={"/loading.svg"} alt="Loading..." width={200} height={200} />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col shadow-md rounded outline-1 outline-gray-300 w-1/2 p-5 mb-3">
        <div className="w-full">
          <h1 className="text-gray-700 text-md font-semibold text-center">
            Informasi Pribadi
          </h1>
        </div>
        {/* Data */}
        <div className="w-full flex py-3 px-3 mb-3">
          <div className="flex flex-col justify-center w-1/2 gap-2">
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
          </div>
          <div className="flex flex-col w-1/2 gap-2">
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
        </div>
        {/* End of Data */}
        <div className="flex items-center justify-center">
          <Link
            href={"/user/profile/edit"}
            className="px-3 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
          >
            Edit Profil
          </Link>
        </div>
      </div>
    </div>
  );
}
