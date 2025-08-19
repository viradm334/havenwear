"use client";

import { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EditProductForm() {
  const router = useRouter();
  const params = useParams();
  const { slug } = params;
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    color: "",
    price: "",
    status: ""
  });

  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((ctg) => setCategories(ctg.data));
  }, []);

  useEffect(() => {
    if (!slug) return;

    fetch(`/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.product.name,
          description: data.product.description,
          color: data.product.color,
          price: data.product.price,
          categoryId: data.product.categoryId,
          status: data.product.status
        });
        setSizes(data.product.productSizes);
      });
  }, [slug]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.productSizes = sizes;

    try {
      const res = await fetch(`/api/products/edit/${slug}`, {
        method: "PUT",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        router.push('/admin/product');
      }else{
        console.error(data.message);
      }
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-1/2">
      {/* Product Name */}
      <label className="text-sm text-emerald-700 font-bold mb-1">Product Name</label>
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
      <label className="text-sm text-emerald-700 font-bold mb-1">Category</label>
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
      <label className="text-sm text-emerald-700 font-bold mb-1">Product Status</label>
      <select
        name="categoryId"
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
      <label className="text-sm text-emerald-700 font-bold mb-1">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="outline-1 outline-gray-400 rounded-sm mb-3 p-1.5 placeholder:text-sm placeholder:text-normal focus:outline-emerald-600"
      />

      {/* Color */}
      <label className="text-sm text-emerald-700 font-bold mb-1">Available Color</label>
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
      <label className="text-sm text-emerald-700 font-bold mb-1">Sizes</label>
        {sizes?.length > 0 &&
          sizes.map((size, index) => (
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
                <TrashIcon className="size-5 text-red-500"/>
              </button>
            </div>
          ))}
        <button
          type="button"
          onClick={addSize}
          className="text-sm mt-1 text-blue-600"
        >
          + Add Size
        </button>
      </div>

      <button
        type="submit"
        className="text-white text-center bg-emerald-800 rounded hover:bg-emerald-900 px-3 py-2 mt-4 cursor-pointer transition"
      >
        Submit
      </button>
    </form>
  );
}
