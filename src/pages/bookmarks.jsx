import React, { useState, useEffect } from "react";
import { createBookmark, getFolders } from "../Apiservice/allApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";


// 🔍 Extract YouTube thumbnail
const getYoutubeThumbnail = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match && match[1]
    ? `https://img.youtube.com/vi/${match[1]}/0.jpg`
    : "";
};


const BookmarkPage = () => {
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const navigate = useNavigate();

  // 🔁 Load folders
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const res = await getFolders(headers);
        if (res.status === 200) {
          setFolders(res.data.folders);
        } else {
          toast.error("Failed to load folders");
        }
      } catch (err) {
        console.error("Error fetching folders:", err);
        toast.error("Error fetching folders");
      }
    };

    fetchFolders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !url || !selectedFolderId) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const payload = {
        title,
        url,
        description,
        folderId: selectedFolderId,
        thumbnail,
      };

      const res = await createBookmark(payload, headers);
      if (res.status === 201) {
        toast.success("Bookmark added successfully!");
        navigate('/folderList');
        // Clear form
        setTitle("");
        setUrl("");
        setDescription("");
        setSelectedFolderId("");
        setThumbnail("");
      } else {
        toast.error("Failed to add bookmark");
      }
    } catch (err) {
      console.error("Error adding bookmark:", err);
      toast.error("Error adding bookmark");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-6 rounded-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add Bookmark</h2>

        {/* Folder Dropdown */}
        <label className="block mb-1 text-gray-700">Select Folder *</label>
        <select
          value={selectedFolderId}
          onChange={(e) => setSelectedFolderId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="">-- Choose Folder --</option>
          {folders.map((folder) => (
            <option key={folder._id} value={folder.folderId}>
              {folder.name}
            </option>
          ))}
        </select>

        {/* Title */}
        <label className="block mb-1 text-gray-700">Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Video title"
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* YouTube URL */}
        <label className="block mb-1 text-gray-700">YouTube URL *</label>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            const thumb = getYoutubeThumbnail(e.target.value);
            setThumbnail(thumb);
          }}
          placeholder="https://youtube.com/..."
          className="w-full mb-4 p-2 border rounded"
          required
        />

        {/* Description */}
        <label className="block mb-1 text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional"
          className="w-full mb-4 p-2 border rounded min-h-[100px]"
        />

        {/* Thumbnail Input */}
        <label className="block mb-1 text-gray-700">Thumbnail URL</label>
        <input
          type="text"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          placeholder="Auto-generated or custom thumbnail"
          className="w-full mb-4 p-2 border rounded"
        />

        {/* Thumbnail Preview */}
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Thumbnail Preview"
            className="mb-4 rounded shadow-md w-full"
          />
        )}

        {/* Submit */}
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
