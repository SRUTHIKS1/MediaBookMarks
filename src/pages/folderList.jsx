import React, { useEffect, useState } from "react";
import {
  getFolders,
  getBookmarksByFolderId,
  editBookmark,
  deleteBookmark,
  renameFolder,
  deleteFolder,
} from "../Apiservice/allApi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Edit2, Trash2, ChevronDown, ChevronRight } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

// Extract YouTube ID from URL
const extractYouTubeId = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const FolderListPage = () => {
  const [folders, setFolders] = useState([]);
  const [bookmarksByFolder, setBookmarksByFolder] = useState({});
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [editingFolder, setEditingFolder] = useState(null);
  const [expandedFolders, setExpandedFolders] = useState({});

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();

  const fetchFolders = async () => {
    try {
      const res = await getFolders(headers);
      if (res.status === 200) {
        const fetchedFolders = res.data.folders;
        setFolders(fetchedFolders);

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
    } catch {
      toast.error("Error fetching folders");
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleDeleteBookmark = async (bookmarkId, folderId) => {
    if (!window.confirm("Delete this bookmark?")) return;
    try {
      await deleteBookmark(bookmarkId, headers);
      const updated = await getBookmarksByFolderId(folderId, headers);
      setBookmarksByFolder((prev) => ({ ...prev, [folderId]: updated.data.bookmarks }));
      toast.success("Bookmark deleted");
    } catch {
      toast.error("Failed to delete bookmark");
    }
  };

  const handleEditBookmark = async (e) => {
    e.preventDefault();
    const { bookmarkId, title, url, description, folderId, thumbnail } = editingBookmark;
    try {
      await editBookmark(bookmarkId, { title, url, description, folderId, thumbnail }, headers);
      const updated = await getBookmarksByFolderId(folderId, headers);
      setBookmarksByFolder((prev) => ({ ...prev, [folderId]: updated.data.bookmarks }));
      setEditingBookmark(null);
      toast.success("Bookmark updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const handleRenameFolder = async (e) => {
    e.preventDefault();
    try {
      await renameFolder(editingFolder.folderId, { name: editingFolder.name }, headers);
      fetchFolders();
      setEditingFolder(null);
      toast.success("Folder renamed");
    } catch {
      toast.error("Rename failed");
    }
  };

  const handleDeleteFolder = async (folderId) => {
    if (!window.confirm("Delete this folder and its bookmarks?")) return;
    try {
      await deleteFolder(folderId, headers);
      fetchFolders();
      toast.success("Folder deleted");
    } catch {
      toast.error("Failed to delete folder");
    }
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Your Folders</h1>

      {folders.length === 0 ? (
        <p className="text-gray-600">No folders found.</p>
      ) : (
        <div className="space-y-6">
          {folders.map((folder) => (
            <div key={folder._id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleFolder(folder.folderId)}>
                    {expandedFolders[folder.folderId] ? (
                      <ChevronDown size={20} />
                    ) : (
                      <ChevronRight size={20} />
                    )}
                  </button>
                  <h2 className="text-lg font-semibold text-indigo-600">{folder.name}</h2>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      setEditingFolder({ folderId: folder.folderId, name: folder.name })
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteFolder(folder.folderId)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {expandedFolders[folder.folderId] && (
                <>
                  <p className="text-sm text-gray-500 mb-2">Folder ID: {folder.folderId}</p>

                  {/* ➕ Add Bookmark Button */}
                  <button
                    onClick={() =>
                      navigate("/bookmarks", { state: { folderId: folder.folderId } })
                    }
                    className="mb-3 px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 text-sm"
                  >
                    + Add Bookmark
                  </button>

                  {bookmarksByFolder[folder.folderId]?.length > 0 ? (
                    <ul className="space-y-4 mt-3">
                      {bookmarksByFolder[folder.folderId].map((bookmark) => (
                        <li key={bookmark._id} className="bg-gray-100 p-4 rounded shadow-sm">
                          <div className="flex items-center gap-4">
                            <img
                              src={bookmark.thumbnail}
                              alt="thumb"
                              className="w-16 h-10 object-cover rounded"
                            />
                            <div className="flex-1">
                              <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-blue-600 hover:underline"
                              >
                                {bookmark.title}
                              </a>
                              <p className="text-sm text-gray-500">{bookmark.description}</p>

                              {extractYouTubeId(bookmark.url) && (
                                <iframe
                                  src={`https://www.youtube.com/embed/${extractYouTubeId(bookmark.url)}`}
                                  width="100%"
                                  height="200"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="mt-2 rounded"
                                ></iframe>
                              )}

                              <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-indigo-500 hover:underline mt-1 inline-block"
                              >
                                ▶ Watch on YouTube
                              </a>
                            </div>
                            <div className="flex flex-col gap-2 ml-2">
                              <button
                                onClick={() => setEditingBookmark({ ...bookmark })}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteBookmark(bookmark.bookmarkId, folder.folderId)
                                }
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic mt-2">No bookmarks yet</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Edit Bookmark Modal */}
      {editingBookmark && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditBookmark}
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4">Edit Bookmark</h2>
            <input
              type="text"
              placeholder="Title"
              value={editingBookmark.title}
              onChange={(e) =>
                setEditingBookmark({ ...editingBookmark, title: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="URL"
              value={editingBookmark.url}
              onChange={(e) =>
                setEditingBookmark({ ...editingBookmark, url: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={editingBookmark.description}
              onChange={(e) =>
                setEditingBookmark({ ...editingBookmark, description: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={editingBookmark.thumbnail}
              onChange={(e) =>
                setEditingBookmark({ ...editingBookmark, thumbnail: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingBookmark(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ✏️ Rename Folder Modal */}
      {editingFolder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            onSubmit={handleRenameFolder}
            className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg"
          >
            <h2 className="text-lg font-bold mb-4">Rename Folder</h2>
            <input
              type="text"
              value={editingFolder.name}
              onChange={(e) =>
                setEditingFolder({ ...editingFolder, name: e.target.value })
              }
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingFolder(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Rename
              </button>
            </div>
          </form>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default FolderListPage;
