import React, { useEffect, useState } from "react";
import NewProductForm from "./NewProductForm.jsx";
import ViewProductModal from "./ViewProductModal.jsx";
import UpdateProductForm from "./UpdateProductForm.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [modalName, setModalName] = useState("");
  const [isProductLoading, setIsProductLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setIsProductLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
      setIsProductLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (formData) => {
    try {
      setIsProductLoading(true);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("__token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        fetchProducts();
        setModalOpen(false);
        alert("Product submitted successfully!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsProductLoading(false);
    }
  };

  const handleUpdateProduct = async (formData, _id) => {
    try {
      setIsProductLoading(true);
      const response = await fetch(`/api/products/${_id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("__token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        fetchProducts();
        setModalOpen(false);
        alert("Product Updated successfully!");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsProductLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      if (confirm("Delete Product? Are you sure ?")) {
        setIsProductLoading(true);
        const response = await fetch(`/api/products/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("__token")}`,
          },
        });
        if (response.ok) {
          fetchProducts();
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsProductLoading(false);
    }
  };

  const openAddModal = () => {
    setModalName("Add New Product");
    setModalOpen(true);
  };

  const openViewModal = (product) => {
    setCurrentProduct(product);
    setModalName("View Product");
    setModalOpen(true);
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setModalName("Update Product");
    setModalOpen(true);
  };

  return (
    <>
      <h1 className="text-lg mt-6 font-bold flex justify-between pr-8 w-full">
        Product List
        <button
          onClick={openAddModal}
          className="bg-green-600 hover:underline p-2 rounded-md text-white text-sm font-normal"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Product
        </button>
      </h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {!isProductLoading ? (
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Packaging Type</th>
                <th className="px-4 py-3 text-left">Weight Capacity</th>
                <th className="px-4 py-3 text-left">Color</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            {products && products.length ? (
              <tbody className="divide-y">
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.packagingType}</td>
                    <td className="px-4 py-3">{product.weightHoldingCapacity}</td>
                    <td className="px-4 py-3">{product.color}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => openViewModal(product)}
                        className="text-blue-600 hover:underline"
                        title="View Product"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button
                        onClick={() => openUpdateModal(product)}
                        className="text-blue-600 hover:underline"
                        title="Edit Product"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="text-red-600 hover:underline"
                        title="Delete Product"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-6 text-lg text-gray-500"
                  >
                    No products available.
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        ) : (
          <div className="flex justify-center items-center h-[300px] mx-auto py-10 bg-slate-100 min-w-full">
            <div className="border-8 border-gray-200 border-t-8 border-t-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        )}
      </div>
      {modalOpen && modalName === "Add New Product" && (
        <NewProductForm
          submitForm={handleAddProduct}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {modalOpen && modalName === "View Product" && (
        <ViewProductModal
          product={currentProduct}
          closeModal={() => setModalOpen(false)}
        />
      )}

      {modalOpen && modalName === "Update Product" && (
        <UpdateProductForm
          product={currentProduct}
          submitForm={handleUpdateProduct}
          closeModal={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductAdmin;
