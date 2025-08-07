"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileForm({ user }) {
    const router = useRouter();
  const [formData, setFormData] = useState({
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
        setFormData({
          name: data.user.name,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          address: data.user.address,
          city: data.user.city,
          province: data.user.province,
        })
      );
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const res = await fetch(`/api/edit-profile/${user.id}`, {
            method: 'PUT',
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if(res.ok){
            alert(data.message);
            router.push('/user/profile');
        }else{
            console.log(err.message);
            alert(data.message);
        }

    }catch(err){
        console.error(err.message);
        alert(err.message);
    }
  }

  return (
    <form
      className="flex flex-col outline-1 outline-gray-300 p-5 w-1/2 rounded shadow-md"
      onSubmit={handleSubmit}
    >
      <h1 className="font-bold mb-3 text-center">Edit Profile</h1>
      <label className="text-sm text-emerald-700 font-bold mb-1.5">Name</label>
      <input
        type="text"
        name="name"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        placeholder="Enter your name here"
        value={formData?.name || ""}
        onChange={handleChange}
        required
      />
      <label className="text-sm text-emerald-700 font-bold mb-1.5">Email</label>
      <input
        type="email"
        name="email"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        placeholder="Enter your name here"
        value={formData?.email || ""}
        onChange={handleChange}
        required
      />
      <label className="text-sm text-emerald-700 font-bold mb-1.5">
        Phone Number
      </label>
      <input
        type="text"
        name="phoneNumber"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        placeholder="Enter your name here"
        value={formData?.phoneNumber || ""}
        onChange={handleChange}
        required
      />
      <label className="text-sm text-emerald-700 font-bold mb-1.5">
        Address
      </label>
      <input
        type="text"
        name="address"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        placeholder="Enter your address here"
        value={formData?.address || ""}
        onChange={handleChange}
        required
      />
      <label className="text-sm text-emerald-700 font-bold mb-1.5">City</label>
      <input
        type="text"
        name="city"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        placeholder="Enter your city here"
        value={formData?.city || ""}
        onChange={handleChange}
        required
      />
      <label className="text-sm text-emerald-700 font-bold mb-1.5">
        Province
      </label>
      <input
        type="text"
        name="province"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        placeholder="Enter your province here"
        value={formData?.province || ""}
        onChange={handleChange}
        required
      />
      <button
        type="submit"
        className="text-white text-center bg-emerald-800 rounded hover:bg-900 w-full px-3 py-2 mt-4 cursor-pointer"
      >
        Ubah Profil
      </button>
    </form>
  );
}
