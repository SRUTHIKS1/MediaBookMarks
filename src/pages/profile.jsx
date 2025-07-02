const ProfilePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-400 to-purple-500 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          👤 Profile Settings
        </h2>

        <form className="space-y-5">
          {/* Profile Picture Upload */}
          <div className="text-center">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-2 border"
            />
            <input
              type="file"
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 mt-2"
            />
          </div>

          {/* Full Name */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🧑</span>
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">✉️</span>
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🔒</span>
            <input
              type="password"
              placeholder="New Password"
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
          >
            Save Changes
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Want to logout?{" "}
          <a href="/logout" className="text-purple-700 hover:underline">
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
