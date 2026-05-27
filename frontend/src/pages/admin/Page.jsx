import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import ContactAdmin from "./components/ContactAdmin";
import ProductAdmin from "./components/ProductAdmin";

const AdminPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("__token");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="md:text-3xl font-semibold text-gray-800 text-xl">
          Admin Panel
        </h1>
        <div className="flex gap-x-2">
          <button
            onClick={() => {
              confirm("Are you sure you want to logout?") && handleLogout();
            }}
            className="bg-red-500 hover:underline p-2 rounded-md text-white text-sm font-normal"
          >
            <FontAwesomeIcon icon={faSignOut} /> Logout
          </button>
        </div>
      </div>

      <ProductAdmin />
      <ContactAdmin />
    </div>
  );
};

export default AdminPage;
