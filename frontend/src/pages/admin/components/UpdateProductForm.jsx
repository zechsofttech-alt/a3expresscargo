import React, { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UpdateProductForm = ({ product, submitForm, closeModal }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    packagingType: product?.packagingType || "",
    color: product?.color || "",
    weightHoldingCapacity: product?.weightHoldingCapacity || "",
    category: product?.category || "",
    additionalInfo: product?.additionalInfo || [],
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        packagingType: product.packagingType || "",
        color: product.color || "",
        weightHoldingCapacity: product.weightHoldingCapacity || "",
        category: product.category || "",
        additionalInfo: product.additionalInfo || [],
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdditionalInfoChange = (e, index, field) => {
    const { value } = e.target;
    const updatedInfo = [...formData.additionalInfo];
    updatedInfo[index] = { ...updatedInfo[index], [field]: value };
    setFormData({ ...formData, additionalInfo: updatedInfo });
  };

  const handleAddAdditionalInfo = () => {
    setFormData({
      ...formData,
      additionalInfo: [...formData.additionalInfo, { key: "", value: "" }],
    });
  };

  const handleRemoveAdditionalInfo = (index) => {
    const updatedInfo = formData.additionalInfo.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalInfo: updatedInfo });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setThumbnail(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("packagingType", formData.packagingType);
    form.append("color", formData.color);
    form.append("weightHoldingCapacity", formData.weightHoldingCapacity);
    form.append("category", formData.category);
    form.append("additionalInfo", JSON.stringify(formData.additionalInfo));
    if (thumbnail != null) {
      form.append("thumbnail", thumbnail);
    }

    await submitForm(form, product._id);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg w-[90%] sm:w-[60%] md:w-[50%] lg:w-[40%] shadow-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold text-gray-800">Update Product</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-red-500 transition-colors">
            <FontAwesomeIcon icon={faTimes} className="text-lg" />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Packaging Type</label>
            <input
              type="text"
              name="packagingType"
              value={formData.packagingType}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Weight Holding Capacity</label>
            <input
              type="text"
              name="weightHoldingCapacity"
              value={formData.weightHoldingCapacity}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Additional Info</label>
            {formData.additionalInfo.map((info, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Key"
                  value={info.key || ""}
                  onChange={(e) => handleAdditionalInfoChange(e, index, "key")}
                  className="mt-1 block w-[40%] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="text"
                  placeholder="Value"
                  value={info.value || ""}
                  onChange={(e) => handleAdditionalInfoChange(e, index, "value")}
                  className="mt-1 block w-[40%] p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveAdditionalInfo(index)}
                  className="text-red-500 hover:text-red-700 mt-1 font-medium text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAdditionalInfo}
              className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors mt-2"
            >
              + Add More Info
            </button>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Thumbnail Image (leave empty to keep original)</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end gap-4 mt-6 border-t pt-3">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors font-medium"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
