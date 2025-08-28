'use client'

import { useState } from "react"

export default function AdminComplaintForm({complaintId, onSuccess}){
    const [formData, setFormData] = useState({
        adminMessage: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const res = await fetch(`/api/complaint/resolve/${complaintId}`, {
            method: "PATCH",
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            alert(data.message);
            if (onSuccess) onSuccess();
            window.location.reload();
          }
        } catch (err) {
          console.error(err.message);
          alert(err.message);
        }
      };
    
      return (
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-sm text-emerald-700 font-bold mb-1.5">
            Complaint Resolve Form
          </label>
          <label className="text-sm text-emerald-700 font-bold mb-1.5">
            Catatan dari Admin
          </label>
          <input
            type="text"
            name="adminMessage"
            className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
            placeholder="Masukkan pesan komplain"
            value={formData.adminMessage}
            onChange={handleChange}
            required
          />
          <button
            className="bg-emerald-600 outline-none rounded-md w-full text-white font-bold px-1 py-2 cursor-pointer hover:bg-emerald-700 transition"
            type="submit"
          >
            Submit
          </button>
        </form>
      );
}