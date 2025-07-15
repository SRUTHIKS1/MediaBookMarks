import React, { useState, useEffect } from "react";
import { createBookmark, getFolders } from "../Apiservice/allApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Extract YouTube thumbnail
const getYoutubeThumbnail = (url) => {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : "";
};

const BookmarkPage = () => {
  const [folders, setFolders] = useState([]);
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    folderId: "",
    thumbnail: "",
  });

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await getFolders(headers);
        if (res.status === 200) setFolders(res.data.folders);
      } catch {
        toast.error("Failed to load folders");
      }
    };
    fetchFolders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };
    if (name === "url") updated.thumbnail = getYoutubeThumbnail(value);
    setForm(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.url || !form.folderId) {
      toast.error("Please fill all required fields");
      return;
    }

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };

    try {
      const res = await createBookmark(form, headers);
      if (res.status === 201) {
        toast.success("Bookmark added!");
        setForm({ title: "", url: "", description: "", folderId: "", thumbnail: "" });
      } else toast.error("Failed to add bookmark");
    } catch {
      toast.error("Error adding bookmark");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add YouTube Bookmark</h2>

        <label className="block mb-1">Select Folder *</label>
        <select
          name="folderId"
          value={form.folderId}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">-- Choose Folder --</option>
          {folders.map((f) => (
            <option key={f._id} value={f.folderId}>
              {f.name}
            </option>
          ))}
        </select>

        <label className="block mb-1">Title *</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-1">YouTube URL *</label>
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-1">Thumbnail (auto-generated)</label>
        <input
          name="thumbnail"
          value={form.thumbnail}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        {form.thumbnail && (
          <img src={form.thumbnail} alt="Thumbnail" className="mb-4 rounded shadow w-full" />
        )}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
        >
          Add Bookmark
        </button>

        <ToastContainer />
      </form>
    </div>
  );
};

export default BookmarkPage;
