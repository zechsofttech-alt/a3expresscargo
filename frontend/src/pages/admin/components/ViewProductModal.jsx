import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ViewProductModal = ({ product, closeModal }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 h-screen flex justify-center items-center z-50 animate-fade-in">
      <div className="relative bg-white p-6 rounded-md max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full h-[90%] overflow-auto">
        {/* Close Button */}
        <FontAwesomeIcon
          icon={faTimes}
          onClick={closeModal}
          className="p-2 text-white rounded-full bg-red-500 absolute top-5 right-2 cursor-pointer hover:bg-red-600 transition-colors"
        />

        <h2 className="text-xl font-bold mb-4 text-center text-gray-800">Product Details</h2>
        <div className="mb-4">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full h-auto max-h-96 object-contain mb-4 rounded-md shadow-md border"
          />

          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Packaging Type:</strong> {product.packagingType || "N/A"}
            </p>
            <p>
              <strong>Color:</strong> {product.color || "N/A"}
            </p>
            <p>
              <strong>Category:</strong> {product.category || "N/A"}
            </p>
            <p>
              <strong>Weight Holding Capacity:</strong>{" "}
              {product.weightHoldingCapacity || "N/A"}
            </p>
            {product.additionalInfo &&
              product.additionalInfo.map((data, index) => (
                <p key={index}>
                  <strong>{data.key}: </strong> {data.value}
                </p>
              ))}
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end gap-4 mt-6 border-t pt-3">
          <button
            onClick={closeModal}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductModal;
