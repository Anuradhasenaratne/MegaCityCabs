import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import ApiService from "../../service/ApiService";

const NavBar = () => {
  const navigate = useNavigate();

  // States for menu, dropdown, authentication and user info
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState(null); // User info state
  const [error, setError] = useState(null); // Error state for API calls

  // Fetch authentication status and user roles
  const Authenticated = ApiService.isAuthenticated();
  const checkAdmin = ApiService.isAdmin();
  const checkUser = ApiService.isUser();

  useEffect(() => {
    setIsLoggedIn(Authenticated);
    setIsAdmin(checkAdmin);
    setIsUser(checkUser);
  }, [Authenticated, checkAdmin, checkUser]);

  // Fetch user profile and bookings
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ApiService.getUserProfile();
        const userPlusBookings = await ApiService.getUserBookings(
          response.user.id
        );
        setUser(userPlusBookings.user); // Set user information
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };

    if (isLoggedIn) fetchUserProfile();
  }, [isLoggedIn]);

  // Sign out handler
  const handleSignOut = () => {
    const islogout = window.confirm("Are you sure you want to logout?");
    if (islogout) {
      ApiService.logout();
      setIsLoggedIn(false); // Update login state
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-between text-lg py-3 top-0 w-full z-50 px-5 bg-white bg-opacity-100 shadow-lg">
      <div className="container mx-auto flex items-center justify-between w-full">
        {/* Left Section - Logo and Title */}
        <div className="flex items-center gap-4">
          <img
            onClick={() => navigate("/")}
            className="w-44 cursor-pointer"
            src={assets.logo}
            alt="Logo"
            style={{ width: "69px", height: "50px", objectFit: "contain" }}
          />
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-3xl font-bold text-orange-500">
              MEGA <span className="text-green-400">CITY CABS</span>
            </h1>
          </div>
        </div>

        {/* Centered Navigation Links */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center gap-8 font-medium">
            <NavLink
              to="/"
              className="relative py-1 font-semibold text-orange-500 transition-all hover:text-lime-500"
              onClick={() => scrollTo(0, 0)}
            >
              Dashboard
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-lime-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </NavLink>

            <NavLink
              to="/AllVehicle"
              className="relative py-1 font-semibold text-orange-500 transition-all hover:text-lime-500"
              onClick={() => scrollTo(0, 0)}
            >
              Fleet
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-lime-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </NavLink>

            <NavLink
              to="/about"
              className="relative py-1 font-semibold text-orange-500 transition-all hover:text-lime-500"
            >
              Company Overview
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-lime-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </NavLink>

            <NavLink
              to="/contact"
              className="relative py-1 font-semibold text-orange-500 transition-all hover:text-lime-500"
            >
              Get in Touch
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-lime-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </NavLink>
          </ul>
        </div>
        <div>
          {isAdmin && (
            <li
              onClick={() => navigate("Admin")}
              className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer transition-colors"
            >
              Admin Dashboard
            </li>
          )}
          {isUser && (
            <li
              onClick={() => navigate("Mybookings")}
              className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer transition-colors"
            >
              My Bookings
            </li>
          )}
          {isUser && (
            <li
              onClick={() => navigate("ProfilePage")}
              className="px-4 py-2 hover:bg-gray-100 hover:text-black cursor-pointer transition-colors"
            >
              My Profile
            </li>
          )}
        </div>

        {/* Profile Dropdown for Logged-in Users */}
        {isLoggedIn && (
          <div
            className="relative "
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="relative group">
              <div className="flex items-center gap-3 cursor-pointer">
                <img
                  className="w-10 h-10 rounded-full border-5 border-gray-300 transition-transform group-hover:scale-105"
                  src={assets.profile_pic}
                  alt="Profile"
                />
              </div>

              {/* Dropdown Content */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 text-sm font-medium text-gray-600 z-20">
                  <ul className="flex flex-col gap-2 py-3">
                    <li
                      onClick={handleSignOut}
                      className="px-4 py-2 text-red-500 hover:bg-red-100 cursor-pointer transition-colors"
                    >
                      Sign Out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Login Button for Logged-out Users */}
        {!isLoggedIn && (
          <div className="flex items-center gap-5">
            <button
              onClick={() => {
                navigate("/LoginPage");
                scrollTo(0, 0); // Scroll to top
              }}
              className="inline-flex items-center justify-center gap-4 bg-gradient-to-tl from-white px-8 py-2 rounded-2xl text-red-700 text-lg font-semibold shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              Login
            </button>
          </div>
        )}

        {/* Hamburger Menu for Mobile */}
      </div>

      <hr />
    </div>
  );
};

export default NavBar;
