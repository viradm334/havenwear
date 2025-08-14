"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
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
          email: "",
          password: "",
        });

        if(data.role === 'ADMIN'){
          router.push('/admin');
        }else{
          router.push('/');
        }
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col p-10 outline-gray-300 rounded bg-white outline-1 shadow-md w-1/3">
      <h1 className="font-bold text-2xl text-center text-emerald-600 mb-5">
        Login
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="text-sm text-emerald-700 font-bold mb-1.5">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
          placeholder="Enter your email here"
          value={formData.email}
          onChange={handleChange}
        />
        <label className="text-sm text-emerald-700 font-bold mb-1.5">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:font-normal focus:outline-emerald-600"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        <p className="mb-3 font-medium text-sm text-gray-500">
          Don't have an account yet?
          <Link
            href={"/register"}
            className="font-medium text-sm text-emerald-600 underline ml-1"
          >
            Register
          </Link>
        </p>
        <button className="bg-emerald-600 outline-none rounded-md w-full text-white font-bold px-1 py-2 cursor-pointer hover:bg-emerald-700 transition" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
