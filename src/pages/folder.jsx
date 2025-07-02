const Folderpage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create New Folder</h2>
        <form className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">📁</span>
            <input
              type="text"
              placeholder="Folder name"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Create Folder
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Go back to <a href="/home" className="text-purple-600 hover:underline">Home</a>
        </div>
      </div>
    </div>
  );
};

export default Folderpage;
