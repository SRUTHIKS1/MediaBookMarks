import React, { useState } from "react";
import { createFolder } from "../Apiservice/allApi"; // import API function
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const FolderPage = () => {
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate();

  const notify = (type, message) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 4000,
      theme: "colored",
    });
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();

    if (!folderName.trim()) {
      notify("error", "Folder name is required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`, // ✅ This must match backend's jwtMiddleware
        "Content-Type": "application/json",
      };

      const response = await createFolder({ name: folderName }, headers);

      if (response.status === 201) {
        notify("success", response.data.message);
        setFolderName("");
    navigate("/bookmarks")
      }

    } catch (err) {
      console.error(err);
      notify("error", "Folder creation failed.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleCreateFolder}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Create Folder</h2>
        <input
          type="text"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Enter folder name"
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Create Folder
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FolderPage;
