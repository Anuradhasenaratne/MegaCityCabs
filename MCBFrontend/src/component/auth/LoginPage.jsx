import  { useState } from 'react';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaTwitter, FaInstagram, FaXing } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { assets } from "../../assets/assets";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

const from = location.state?.from?.pathname || '/';


  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email || !password) {
          setError('Please fill in all fields.');
          setTimeout(() => setError(''), 5000);
          return;
      }

      try {
          const response = await ApiService.loginUser({email, password});
          if (response.statusCode === 200) {
              localStorage.setItem('token', response.token);
              localStorage.setItem('role', response.role);
              navigate(from, { replace: true });
              scrollTo(0, 0);
          }
      } catch (error) {
          setError(error.response?.data?.message || error.message);
          setTimeout(() => setError(''), 5000);
      }
  };

    return (
        <div className="relative flex min-h-screen">
            <div className="hidden md:flex md:w-1/2 justify-center items-center relative">
                <img src={assets.loginImage} alt="Login" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center px-4">
                        Welcome to <span className="text-orange-400"> MEGA CITY CABS !</span>
                        <span className="block mt-2 text-orange-400 text-lg font-medium">
                            Reliable and Affordable Rides
                        </span>
                    </h1>
                </div>
            </div>

            <div className="flex flex-col justify-start items-center w-full md:w-1/2 relative z-10 pt-20">
                <div className="bg-transparent rounded-lg px-4 py-10 sm:w-3/4 lg:w-2/4">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Sign In</h2>
                    <p className="text-gray-500 mt-2 text-center">Log in to access your account.</p>

                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                    <form className="w-full mt-8" onSubmit={handleSubmit}>
                        <div className="flex items-center border rounded-lg px-2 py-2 bg-white shadow-sm">
                            <FaEnvelope className="text-gray-400 mr-3" />
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>

                        <div className="flex items-center border rounded-lg px-2 py-2 mt-4 bg-white shadow-sm">
                            <FaLock className="text-gray-400 mr-3" />
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>

                        <div className="flex justify-end mt-2">
                            <a href="#" className="text-sm text-orange-500 hover:underline transition-all">
                                Forgot Password?
                            </a>
                        </div>

                        <button type="submit" className="w-full mt-6 bg-orange-500 text-white py-2 rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
                            Log In
                        </button>
                    </form>

                    <div className="mt-6 w-full">
                        <button type="button" className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-700 hover:bg-gray-100 transition-all">
                            <FaGoogle className="text-red-500 mr-3 text-xl" />
                            Sign in with Google
                        </button>
                    </div>

                    <div className="flex items-center my-3">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500">or</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="mt-2 text-gray-400 text-center">
                        <span>Don't have an account? </span>
                        <a href="#" onClick={() => navigate("/RegisterPage")} className="text-orange-500 hover:underline">
                            Sign Up
                        </a>
                    </div>

                    <div className="flex justify-center mt-8 space-x-6">
                        <a href="#" className="text-blue-600 hover:text-blue-800 text-2xl transition-all"><FaFacebook /></a>
                        <a href="#" className="text-blue-400 hover:text-blue-600 text-2xl transition-all"><FaTwitter /></a>
                        <a href="#" className="text-pink-500 hover:text-pink-700 text-2xl transition-all"><FaInstagram /></a>
                        <a href="#" className="text-gray-600 hover:text-gray-800 text-2xl transition-all"><FaXing /></a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
