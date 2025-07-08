import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toasts
import { resetPasswordRequest } from "../Apiservice/allApi";
import { ArrowLeft } from "lucide-react"; // Import icon
 
const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState("");
    
    // Form validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            return "Email is required";
        } else if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        return "";
    };

    const successNotification = () => toast.success("Reset link sent to your email!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
    });

    const errorNotification = (message = "Failed to send reset link") => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate before submission
        const error = validateEmail(email);
        if (error) {
            setEmailError(error);
            return;
        }
        
        setLoading(true);
        try {
            const result = await resetPasswordRequest({ email });
            if (result.status === 200) {
                successNotification();
                setEmail(""); // Clear form after success
            } else {
                errorNotification(result.data?.message || "Failed to send reset link");
            }
        } catch (error) {
            console.error("Password reset error:", error);
            errorNotification(error.response?.data?.message || "Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Clear error when user starts typing
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError("");
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-200 to-indigo-300 p-6 flex items-center justify-center">
            <div className="max-w-md w-full">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <div className="mb-6">
                        <a href="/login" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <ArrowLeft size={16} className="mr-1" />
                            <span>Back to Login</span>
                        </a>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Forgot Password</h2>
                    
                    <p className="text-gray-600 mb-6 text-center">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                                    emailError ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                                }`}
                                value={email}
                                onChange={handleEmailChange}
                                disabled={loading}
                            />
                            {emailError && (
                                <p className="mt-1 text-red-500 text-sm">{emailError}</p>
                            )}
                        </div>
                        
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;