import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../Apiservice/allApi";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const [studentDetails, setStudentDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const successNotification = () =>
    toast.success("Successfully Registered!", {
      position: "bottom-left",
      autoClose: 5000,
      theme: "light",
    });

  const errorNotification = () =>
    toast.error("Registration failed!", {
      position: "bottom-left",
      autoClose: 5000,
      theme: "light",
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails({ ...studentDetails, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const validate = () => {
    let validationErrors = {};
    if (!studentDetails.name.trim()) validationErrors.name = "Name is required";
    if (!studentDetails.email.trim()) validationErrors.email = "Email is required";
    if (!studentDetails.password.trim()) validationErrors.password = "Password is required";
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register(studentDetails);
      if (result.status === 201) {
        successNotification();
        setStudentDetails({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        errorNotification();
      }
    } catch (error) {
      console.error(error);
      errorNotification();
    } finally {
      setIsSubmitting(false);
    }

    // alert(`name: ${studentDetails.name}\nemail: ${studentDetails.email}\npassword: ${studentDetails.password}`);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 p-4"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Nam */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-lg">👤</span>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={studentDetails.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 ring-red-300" : "focus:ring-blue-400"
              }`}
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-lg">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={studentDetails.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 ring-red-300" : "focus:ring-blue-400"
              }`}
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <span className="absolute left-3 top-3 text-lg">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={studentDetails.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 ring-red-300" : "focus:ring-blue-400"
              }`}
            />
            {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Sign in
          </Link>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
