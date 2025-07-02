import { FaBookmark, FaBars } from "react-icons/fa";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center text-purple-700 font-bold text-xl gap-2">
          <FaBookmark className="text-2xl" />
          <span>BookmarkHub</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
          <a href="/home" className="hover:text-purple-600">Home</a>
          <a href="/folder" className="hover:text-purple-600">Folders</a>
          <a href="/bookmarks" className="hover:text-purple-600">Bookmarks</a>
          <a href="/profile" className="hover:text-purple-600">Profile</a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-purple-700 text-xl focus:outline-none"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          <a href="/home" className="block text-gray-700 hover:text-purple-600">Home</a>
          <a href="/folder" className="block text-gray-700 hover:text-purple-600">Folders</a>
          <a href="/bookmarks" className="block text-gray-700 hover:text-purple-600">Bookmarks</a>
          <a href="/profile" className="block text-gray-700 hover:text-purple-600">Profile</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
