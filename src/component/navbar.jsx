import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, User, Folder, BookOpen } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { path: "/home", label: "Home", icon: <BookOpen size={18} /> },
    { path: "/folder", label: "Folders", icon: <Folder size={18} /> },
    { path: "/bookmarks", label: "Bookmarks", icon: <BookOpen size={18} /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-indigo-700 shadow-md py-2" : "bg-indigo-600 py-3"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl tracking-wide">
            <span className="text-2xl">📌</span>
            <span className="hidden sm:inline">MediaBookmarkHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? "bg-indigo-800 text-white"
                    : "text-indigo-100 hover:bg-indigo-500 hover:text-white"
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            {/* Authenticated Options */}
            {token ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-500 hover:text-white"
                >
                  <User size={18} />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-red-100 hover:bg-red-600 hover:text-white transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-indigo-700 rounded-md text-sm font-semibold hover:bg-gray-100 transition"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block text-base font-medium rounded-md px-3 py-2 ${
                location.pathname === link.path
                  ? "bg-indigo-800 text-white"
                  : "text-indigo-100 hover:bg-indigo-500 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {token ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-base font-medium text-indigo-100 hover:bg-indigo-500 px-3 py-2 rounded-md"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left text-base font-medium text-red-100 hover:bg-red-600 px-3 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium bg-white text-indigo-700 px-3 py-2 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
