import { FaEnvelope, FaLock, FaPhone, FaUser, FaExclamationTriangle, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ApiService from "../../service/ApiService";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    nic: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { name, email, password, phoneNumber } = formData;
    if (!name || !email || !password || !phoneNumber) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage('Please fill all the required fields.');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }
    try {
      // Call the register method from ApiService
      const response = await ApiService.registerUser(formData);

      // Check if the response is successful
      if (response.statusCode === 200) {
        // Clear the form fields after successful registration
        setFormData({
          name: '',
          email: '',
          password: '',
          phoneNumber: '',
          nic: ''
        });
        setSuccessMessage('Registration successful! You can now log in to your account.');
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/LoginPage');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'There was an issue with your registration. Please try again.');
      setTimeout(() => setErrorMessage(''), 5000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center justify-between bg-red-500 text-white py-2 px-4 rounded-lg shadow-md mt-4">
          <FaExclamationTriangle size={20} className="mr-2" />
          <span>{errorMessage}</span>
          <button
            onClick={() => setErrorMessage('')}
            className="text-white hover:text-gray-200 ml-2 focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div className="flex items-center justify-between bg-green-500 text-white py-2 px-4 rounded-lg shadow-md mt-4">
          <FaCheckCircle size={20} className="mr-2" />
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage('')}
            className="text-white hover:text-gray-200 ml-2 focus:outline-none"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* Left Section (Image/Intro) */}
      <div className="hidden lg:flex lg:w-1/2 bg-orange-50 justify-center items-center">
        <div className="text-center px-6 lg:px-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-black">
            Welcome to
          </h1>
          <hr className="border-2 border-black w-1/3 mx-auto my-3" />
          <h1 className="text-4xl lg:text-5xl font-bold">
            <span className="text-black">MEGA </span>
            <span className="text-green-500">CITY CABS!</span>
          </h1>
          <p className="mt-4 text-orange-500 text-lg font-medium">
            Reliable and Affordable Rides
          </p>
        </div>
      </div>

      {/* Right Section (Register Form) */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-green-500 text-center">
          Sign Up
        </h2>
        <p className="text-gray-500 mt-2 text-center">
          Create a new account to book your ride
        </p>

        <form className="mt-5 w-full max-w-md" onSubmit={handleSubmit}>
          {/* First Name Field */}
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <FaUser size={20} className="text-gray-400 mr-2" />
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                type="text"
                placeholder="Enter your Name"
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* NIC Field */}
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <FaUser size={20} className="text-gray-400 mr-2" />
              <input
                name="nic"
                value={formData.nic}
                onChange={handleInputChange}
                required
                type="text"
                placeholder="Enter your NIC"
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <FaEnvelope size={20} className="text-gray-400 mr-2" />
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <FaPhone size={20} className="text-gray-400 mr-2" />
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                type="text"
                placeholder="Enter your phone number"
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <FaLock size={20} className="text-gray-400 mr-2" />
              <input
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <FaLock size={20} className="text-gray-400 mr-2" />
              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full bg-transparent focus:outline-none text-gray-700"
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-300"
          >
            Register
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-4 text-gray-400 text-center">
          Already have an account?{" "}
          <a
            href=""
            onClick={() => {
              navigate("/LoginPage"); // Correct redirection to /userReg
              scrollTo(0, 0);
            }}
            className="text-orange-500 hover:underline"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
