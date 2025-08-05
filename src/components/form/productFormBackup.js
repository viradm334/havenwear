"use client";

import { useEffect, useState } from "react";

export default function CreateProductForm() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    variants: [{ name: "", stock: "" }],
  });
  const [photos, setPhotos] = useState([]);

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

  const handleVariantChange = (index, field, value) => {
    const newVariants = [...formData.variants];
    newVariants[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  const addVariant = () => {
    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, { name: "", stock: "" }],
    }));
  };

  const removeVariant = (index) => {
    const newVariants = [...formData.variants];
    newVariants.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      variants: newVariants,
    }));
  };

  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("categoryId", formData.categoryId);
    fd.append("variants", JSON.stringify(formData.variants));

    photos.forEach((photo) => {
      fd.append("photos", photo);
    });

    console.log(fd);
    try{
      const res = await fetch("/api/products/create", {
        method: "POST",
        body: fd,
      });
  
      if (res.ok) {
        alert("Product created!");
      } else {
        alert("Failed to create product.");
      }
    }catch(err){
      console.error(err);
    }
  };

  return (
    <div className="flex">
      <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
        {/* Product Name */}
        <label className="text-sm font-bold mb-1.5 text-emerald-700">
          Product Name
        </label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="mb-3 p-1.5 border border-gray-300 rounded-md"
          placeholder="Enter product name"
        />

        {/* Category */}
        <label className="text-sm font-bold mb-1.5 text-emerald-700">
          Category
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleInputChange}
          className="mb-3 p-1.5 border border-gray-300 rounded-md"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Sizes */}
        <label className="text-sm font-bold mb-1.5 text-emerald-700">Sizes</label>
        {formData.variants.map((variant, index) => (
          <div key={index} className="mb-2 flex items-center gap-2">
            <input
              type="text"
              value={variant.name}
              onChange={(e) =>
                handleVariantChange(index, "name", e.target.value)
              }
              placeholder={`Size`}
              className="flex-1 p-1.5 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              value={variant.stock}
              onChange={(e) =>
                handleVariantChange(index, "stock", e.target.value)
              }
              placeholder={`Stock`}
              className="flex-1 p-1.5 border border-gray-300 rounded-md"
            />
            {formData.variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          className="mb-4 text-emerald-700 hover:underline text-sm"
        >
          + Add Size
        </button>

        {/* Multiple Photo Upload */}
        <label className="text-sm font-bold mb-1.5 text-emerald-700">
          Upload Photos
        </label>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="mb-4 file:bg-blue-500 file:rounded file:text-white file:px-3 file:py-2 file:cursor-pointer"
        />

        <button
          type="submit"
          className="bg-emerald-700 text-white px-3 py-2 rounded-md hover:bg-emerald-800"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}
