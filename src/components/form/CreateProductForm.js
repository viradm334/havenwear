"use client";

import { useState, useEffect } from "react";

export default function CreateProductForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    color: "",
    price: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.productSizes = sizes;

    try{
      const res = await fetch("/api/products/create", {
        method: "POST",
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if(res.ok){
        alert(data.message);
      }
    }catch(err){
      console.error(err);
      alert(err.message);
    }


  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-1/2">
      {/* Product Name */}
      <input
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Product Name"
        className="p-2 border"
        required
      />

      {/* Category */}
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleInputChange}
        className="p-2 border"
        required
      >
        <option value="">Select a category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Description */}
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="p-2 border"
      />

      {/* Color */}
      <input
        name="color"
        type="text"
        value={formData.color}
        onChange={handleInputChange}
        placeholder="Color"
        className="p-2 border"
      />

      {/* Price */}
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price"
        className="p-2 border"
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
              className="p-2 border"
              required
            />
            <input
              name="stock"
              type="number"
              value={size.stock}
              onChange={(e) => handleSizeChange(index, e)}
              placeholder="Stock"
              className="p-2 border"
              required
            />
            <button type="button" onClick={() => removeSize(index)}>
              ❌
            </button>
          </div>
        ))}
        <button type="button" onClick={addSize} className="text-sm mt-1 text-blue-600">
          + Add Size
        </button>
      </div>

      <button type="submit" className="mt-3 bg-emerald-600 text-white py-2 rounded">
        Submit
      </button>
    </form>
  );
}
