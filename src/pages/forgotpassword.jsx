const Forgotpassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-600 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
        <form className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your registered Email"
              required
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Back to <a href="/login" className="text-indigo-600 hover:underline">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Forgotpassword;
