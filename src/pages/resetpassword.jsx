const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        <form className="space-y-5">
          {/* Password Input */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🔒</span>
            <input
              type="password"
              placeholder="Enter new password"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-2 rounded-md hover:bg-pink-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-4 text-sm text-gray-600">
          Back to{" "}
          <a href="/login" className="text-pink-700 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
