"use client";

import { useState, useEffect } from "react";
import { TrashIcon, CloudArrowUpIcon } from "@heroicons/react/24/solid";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function CreateProductForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    status: "",
    color: "",
    price: "",
  });
  const [imageUrl, setImageUrl] = useState([]);

  const [sizes, setSizes] = useState([{ name: "", stock: "" }]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((ctg) => setCategories(ctg.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...sizes];
    updated[index][name] = value;
    setSizes(updated);
  };

  const addSize = () => {
    setSizes((prev) => [...prev, { name: "", stock: "" }]);
  };

  const removeSize = (index) => {
    const updated = [...sizes];
    updated.splice(index, 1);
    setSizes(updated);
  };

  const handleDelete = async (public_id) => {
    const confirmed = confirm("Anda yakin untuk menghapus foto produk?");

    if (confirmed) {
      try {
        console.log(public_id);
        const res = await fetch("/api/delete-image", {
          method: "POST",
          body: JSON.stringify({ public_id }),
        });

        if (res.ok) {
          const data = await res.json();
          setImageUrl((prev) =>
            prev.filter((img) => img.public_id !== public_id)
          );
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUrl.length === 0) {
      alert("Mohon untuk upload foto produk");
      return;
    }

    formData.productSizes = sizes;
    formData.imageUrl = imageUrl;

    try {
      const res = await fetch("/api/products/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
      {/* Product Name */}
      <label className="text-sm text-emerald-700 font-bold mb-1">
        Product Name
      </label>
      <input
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Product Name"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        required
      />

      {/* Category */}
      <label className="text-sm text-emerald-700 font-bold mb-1">
        Category
      </label>
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleInputChange}
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        required
      >
        <option value="">Select a category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Status */}
      <label className="text-sm text-emerald-700 font-bold mb-1">
        Product Status
      </label>
      <select
        name="status"
        value={formData.status}
        onChange={handleInputChange}
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        required
      >
        <option value="">Select status</option>
        <option value="PUBLISHED">Published</option>
        <option value="ARCHIVED">Archived</option>
      </select>

      {/* Description */}
      <label className="text-sm text-emerald-700 font-bold mb-1">
        Description
      </label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
      />

      {/* Color */}
      <label className="text-sm text-emerald-700 font-bold mb-1">
        Available Color
      </label>
      <input
        name="color"
        type="text"
        value={formData.color}
        onChange={handleInputChange}
        placeholder="Color"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
      />

      {/* Price */}
      <label className="text-sm text-emerald-700 font-bold mb-1">Price</label>
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
        required
      />

      {/* Sizes */}
      <div className="mt-2">
        <label className="font-bold">Sizes</label>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center gap-2 my-1">
            <input
              name="name"
              value={size.name}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Size Name"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              required
            />
            <input
              name="stock"
              type="number"
              value={size.stock}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Stock"
              className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
              required
            />
            <button type="button" onClick={() => removeSize(index)}>
              <TrashIcon className="size-5 text-red-600" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSize}
          className="text-sm mt-1 text-blue-600 mb-3"
        >
          + Add Size
        </button>
      </div>

      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary"
        onSuccess={(results) => {
          setImageUrl((prev) => [
            ...prev,
            {
              secure_url: results.info.secure_url,
              public_id: results.info.public_id,
            },
          ]);
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              onClick={() => open()}
              className="mt-3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer transition flex flex-col items-center justify-center gap-1 mb-3"
            >
              <CloudArrowUpIcon className="size-6" />
              <span className="text-sm">Upload an Image</span>
            </button>
          );
        }}
      </CldUploadWidget>

      <div className="flex flex-col gap-3">
        <h4 className="font-semibold text-gray-800">Product Images</h4>
        <div className="flex gap-3">
          {imageUrl.length > 0 &&
            imageUrl.map((item, index) => (
              <div
                key={index}
                className="relative w-32 h-32 rounded overflow-hidden border border-gray-300"
              >
                {/* Delete Button */}
                <button
                  type="button"
                  className="absolute top-1 right-1 z-10 bg-white rounded-full p-0.5 hover:bg-red-100"
                  onClick={() => handleDelete(item.public_id)}
                >
                  <XCircleIcon className="size-5 text-red-500" />
                </button>

                {/* Image */}
                <Image
                  src={item.secure_url}
                  width={50}
                  height={50}
                  alt="product-image"
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
        </div>
      </div>

      <button
        type="submit"
        className="mt-3 bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700 cursor-pointer transition"
      >
        Submit
      </button>
    </form>
  );
}
