import { useState } from "react";
import { FiGift, FiBell, FiHeart } from "react-icons/fi";
import { FaBars, FaSearch, FaTimes } from "react-icons/fa";
import user from "../../assets/user.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-black via-purple-900 to-indigo-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left Section */}
        <div className="flex items-center">
          <Link to="/" className="text-yellow-400 text-2xl font-bold font-griffy">
            DRAMATIC
          </Link>
          <ul className="hidden md:flex space-x-6 ml-10 font-montserrat">
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white font-medium"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white font-medium"
              >
                TV SHOW
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white font-medium"
              >
                MOVIE
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-gray-400 hover:text-white font-medium"
              >
                NEW
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="relative flex items-center bg-blue-800 rounded-full h-10 w-72">
            <input
              type="search"
              placeholder="SEARCH"
              className="bg-blue-800 font-montserrat text-gray-300 px-4 w-full h-full rounded-full focus:outline-none"
            />
            <FaSearch className="text-gray-400 mr-4" />
          </div>
          <FiGift className="text-white text-2xl" />
          <FiBell className="text-white text-2xl" />
          <Link to="/favorites">
            <FiHeart className="text-white text-2xl" />
          </Link>
          <div className="relative">
            <img
              src={user}
              alt="User"
              className="h-10 w-10 rounded-full border-2 border-white"
            />
            <span className="absolute bottom-0 right-0 bg-green-500 rounded-full h-3 w-3 border-2 border-white"></span>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="flex md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-900 text-gray-300">
          <ul className="flex flex-col space-y-4 px-4 py-6">
            <li>
              <Link
                to="/"
                className="hover:text-white font-medium"
                onClick={toggleMenu}
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white font-medium"
                onClick={toggleMenu}
              >
                TV SHOW
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white font-medium"
                onClick={toggleMenu}
              >
                MOVIE
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="hover:text-white font-medium"
                onClick={toggleMenu}
              >
                NEW
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-center py-4">
            <FiGift className="text-white text-2xl mx-3" />
            <FiBell className="text-white text-2xl mx-3" />
            <Link to="/favorites">
              <FiHeart className="text-white text-2xl mx-3" />
            </Link>
          </div>
          <div className="flex items-center justify-center py-4">
            <img
              src={user}
              alt="User"
              className="h-14 w-14 rounded-full border-2 border-white"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
