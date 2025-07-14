import React, { useEffect, useState } from "react";
import { getFolders, getBookmarksByFolderId } from "../Apiservice/allApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FolderListPage = () => {
  const [folders, setFolders] = useState([]);
  const [bookmarksByFolder, setBookmarksByFolder] = useState({});

  // Fetch all folders
  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const res = await getFolders(headers);
      if (res.status === 200) {
        const fetchedFolders = res.data.folders;
        setFolders(fetchedFolders);

        // 🔁 Fetch bookmarks for each folder
        for (const folder of fetchedFolders) {
          const bookmarkRes = await getBookmarksByFolderId(folder.folderId, headers);
          if (bookmarkRes.status === 200) {
            setBookmarksByFolder((prev) => ({
              ...prev,
              [folder.folderId]: bookmarkRes.data.bookmarks,
            }));
          }
        }
      } else {
        toast.error("Failed to load folders");
      }
    } catch (err) {
      console.error("Folder fetch error:", err);
      toast.error("Something went wrong while fetching folders");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Folders</h1>

      {folders.length === 0 ? (
        <p className="text-gray-600">No folders found.</p>
      ) : (
        <div className="space-y-6">
          {folders.map((folder) => (
            <div
              key={folder._id}
              className="p-4 bg-white rounded shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-indigo-600">
                {folder.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                Folder ID: {folder.folderId}
              </p>
              <p className="text-xs text-gray-400 mb-4">
                Created: {new Date(folder.createdAt).toLocaleDateString()}
              </p>

              {/* 📌 Bookmarks inside folder */}
              {bookmarksByFolder[folder.folderId]?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {bookmarksByFolder[folder.folderId].map((bookmark) => (
                    <li key={bookmark._id}>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {bookmark.title}
                      </a>
                      <p className="text-sm text-gray-500">
                        {bookmark.description}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No bookmarks yet</p>
              )}
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default FolderListPage;
