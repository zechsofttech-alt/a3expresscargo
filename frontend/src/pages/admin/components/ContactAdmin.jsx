import React, { useEffect, useState } from "react";
import { faCopy, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWhatsapp } from "react-icons/fa";

const ContactAdmin = () => {
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contactModal, setContactModal] = useState(null);
  
  const openContactViewModal = (msg) => {
    setContactModal(msg);
  };

  const closeContactViewModal = () => {
    setContactModal(null);
  };

  const fetchContacts = async () => {
    try {
      setIsContactLoading(true);
      const response = await fetch("/api/contact");
      const data = await response.json();
      if (Array.isArray(data)) {
        setContacts(data);
      }
      setIsContactLoading(false);
    } catch (error) {
      console.error("Error fetching Contacts:", error);
    }
  };
  
  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDeleteAllContact = async () => {
    try {
      setIsContactLoading(true);
      const response = await fetch(`/api/contact`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("__token")}`,
        },
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      setIsContactLoading(true);
      const response = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || localStorage.getItem("__token")}`,
        },
      });
      if (response.ok) {
        fetchContacts();
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setIsContactLoading(false);
    }
  };
  
  const openWhatsApp = (phone) => {
    const message =
      "Hi, We are from A3 Cargo Express. Hope you are the one who contacted us through our page. If not, then kindly ignore this message.";
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };

  const copyToClipBoard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Email copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
        alert("Failed to copy text. Please try again.");
      });
  };

  return (
    <>
      <h1 className="text-lg mt-6 font-bold flex justify-between pr-8 w-full">
        Contact Messages
        {contacts && contacts.length !== 0 && (
          <button
            onClick={() => {
              confirm("Delete All Contact Messages? Are you sure ?") &&
                handleDeleteAllContact();
            }}
            className="hover:underline bg-red-500 p-2 rounded-md text-white text-sm font-normal"
          >
            <FontAwesomeIcon icon={faTrash} />
            &nbsp; Clear Messages
          </button>
        )}
      </h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        {!isContactLoading ? (
          <table className="min-w-full table-auto text-sm text-gray-700">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left">S.No</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Phone</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Message</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            {contacts && contacts.length ? (
              <tbody className="divide-y">
                {contacts.map((contact, index) => (
                  <tr
                    key={contact._id}
                    className="bg-gray-50"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">
                      {contact.name ? contact.name : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {contact.phone ? contact.phone : "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      {contact.email ? contact.email : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-ellipsis overflow-hidden max-w-[200px]">
                      <span className="hidden sm:inline">
                        {contact.message.length > 100
                          ? contact.message.slice(0, 100) + "..."
                          : contact.message}
                      </span>
                      <span className="sm:hidden">
                        {contact.message.length > 20
                          ? contact.message.slice(0, 20) + "..."
                          : contact.message}
                      </span>
                      <button
                        onClick={() => openContactViewModal(contact.message)}
                        className="ml-3 text-blue-600 hover:underline"
                        title="View Message"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </td>

                    <td className="px-4 py-3 flex justify-center gap-3">
                      {contact.phone &&
                        contact.phone.length >= 10 &&
                        isValidPhoneNumber(contact.phone) && (
                          <button
                            onClick={() => openWhatsApp(contact.phone)}
                            className="text-blue-600 hover:underline text-lg"
                            title="Contact in Whatsapp"
                          >
                            <FaWhatsapp />
                          </button>
                        )}
                      {contact.email && (
                        <button
                          onClick={() => copyToClipBoard(contact.email)}
                          className="text-blue-600 hover:underline"
                          title="Copy Email"
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      )}
                      <button
                        onClick={() => {
                          confirm("Do you want to delete this message?") &&
                            handleDeleteContact(contact._id);
                        }}
                        className="text-red-600 hover:underline"
                        title="Delete Message"
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
                    colSpan="6"
                    className="text-center py-6 text-lg text-gray-500"
                  >
                    No Contact Messages available.
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
        {contactModal && contactModal.length > 0 && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-11/12 sm:w-1/2 lg:w-1/3 p-6 rounded shadow-md">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Message</h2>
                <button
                  onClick={closeContactViewModal}
                  className="text-red-600 hover:text-red-800 text-2xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="mt-4 max-h-64 overflow-y-auto border p-2 rounded">
                <p className="whitespace-pre-wrap break-words">
                  {contactModal}
                </p>
              </div>
              <button
                onClick={closeContactViewModal}
                className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ContactAdmin;
