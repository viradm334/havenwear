"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.email = email;
    formData.token = token;

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`${data.message}`);
        setFormData({
          newPassword: "",
          confirmPassword: ""
        });
        router.push("/login");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert(err);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col p-10 outline-gray-300 rounded bg-white outline-1 shadow-md w-1/3">
      <h1 className="font-bold text-2xl text-center text-emerald-600 mb-5">
        Reset Password
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-sm text-emerald-700 font-bold mb-1.5">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
        />
        <label className="text-sm text-emerald-700 font-bold mb-1.5">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          className="outline-1 outline-gray-400 rounded-sm mb-6 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
          placeholder="Enter your email here"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button className="bg-emerald-600 outline-none rounded-md w-full text-white font-bold px-1 py-2 cursor-pointer hover:bg-emerald-700 transition" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
}
