import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../Apiservice/allApi";
import { EyeIcon, EyeOffIcon, CheckCircleIcon, XCircleIcon, ShieldCheckIcon } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecial: false
  });
  const navigate = useNavigate();

  // Check password strength
  useEffect(() => {
    setPasswordStrength({
      hasMinLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[^A-Za-z0-9]/.test(password)
    });
  }, [password]);

  const getPasswordStrengthLevel = () => {
    const { hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial } = passwordStrength;
    const criteria = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecial];
    const passedCriteria = criteria.filter(Boolean).length;

    if (passedCriteria <= 2) return { level: "weak", color: "bg-red-500" };
    if (passedCriteria <= 4) return { level: "medium", color: "bg-yellow-500" };
    return { level: "strong", color: "bg-green-500" };
  };

  const notifySuccess = () => toast.success("Password reset successful!");
  const notifyError = (msg) => toast.error(msg || "Password reset failed.");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return notifyError("Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return notifyError("Passwords do not match.");
    }

    // Check if password meets minimum criteria
    const { hasMinLength, hasUppercase, hasLowercase, hasNumber } = passwordStrength;
    if (!hasMinLength || !hasUppercase || !hasLowercase || !hasNumber) {
      return notifyError("Password doesn't meet security requirements.");
    }

    setIsLoading(true);
    try {
      const result = await resetPassword(token, { password });
      if (result.status === 200) {
        notifySuccess();
        setTimeout(() => navigate("/login"), 2000);
      } else {
        notifyError("Reset failed. Please try again.");
      }
    } catch (error) {
      notifyError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const strengthLevel = getPasswordStrengthLevel();

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 to-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-100 p-3 rounded-full">
            <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
          Reset Your Password
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Create a strong password for your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            
            {password && (
              <div className="mt-3">
                <div className="flex gap-1 mb-2">
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength.hasMinLength ? "bg-green-500" : "bg-gray-300"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength.hasUppercase && passwordStrength.hasLowercase ? "bg-green-500" : "bg-gray-300"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength.hasNumber ? "bg-green-500" : "bg-gray-300"}`}></div>
                  <div className={`h-1 flex-1 rounded-full ${passwordStrength.hasSpecial ? "bg-green-500" : "bg-gray-300"}`}></div>
                </div>
                <p className="text-xs text-gray-500">Password strength: <span className={`font-medium ${
                  strengthLevel.level === "weak" ? "text-red-500" : 
                  strengthLevel.level === "medium" ? "text-yellow-500" : "text-green-500"
                }`}>{strengthLevel.level}</span></p>
              </div>
            )}

            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2">
                <div className={`${passwordStrength.hasMinLength ? "text-green-500" : "text-gray-400"}`}>
                  {passwordStrength.hasMinLength ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
                </div>
                <span className="text-xs text-gray-600">At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`${passwordStrength.hasUppercase && passwordStrength.hasLowercase ? "text-green-500" : "text-gray-400"}`}>
                  {passwordStrength.hasUppercase && passwordStrength.hasLowercase ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
                </div>
                <span className="text-xs text-gray-600">Uppercase and lowercase letters</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`${passwordStrength.hasNumber ? "text-green-500" : "text-gray-400"}`}>
                  {passwordStrength.hasNumber ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
                </div>
                <span className="text-xs text-gray-600">At least one number</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`${passwordStrength.hasSpecial ? "text-green-500" : "text-gray-400"}`}>
                  {passwordStrength.hasSpecial ? <CheckCircleIcon className="h-4 w-4" /> : <XCircleIcon className="h-4 w-4" />}
                </div>
                <span className="text-xs text-gray-600">At least one special character</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`mt-1 block w-full rounded-lg border ${
                  confirmPassword && password !== confirmPassword
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                } px-4 py-3 focus:ring-2`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white py-3 px-4 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Reset Password"
            )}
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              Back to Login
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default ResetPassword;