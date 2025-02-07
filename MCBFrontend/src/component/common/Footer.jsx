
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCar, FaGlobe, FaRoad } from 'react-icons/fa';
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Footer main section */}
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-14 mb-10">
          {/* Left Section */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img className="w-20 cursor-pointer" src={assets.logoWhite} alt="Mega City Cabs Logo" />
              <div>
                <h1 className="text-3xl font-bold text-white cursor-pointer">
                  MEGA <span className="text-green-400 cursor-pointer">CITY CABS</span>
                </h1>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Affordable and reliable car rentals that cater to all your travel needs. From daily drives to road trips, we ensure a seamless experience with well-maintained vehicles. Wherever you go, we’re with you every mile.
            </p>
            {/* Icons under description */}
            <div className="flex justify-start space-x-6 mt-6">
              <div className="flex items-center text-gray-400 hover:text-green-400">
                <FaCar size={20} className="mr-2" />
                <span>Reliable Cars</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-green-400">
                <FaGlobe size={20} className="mr-2" />
                <span>Global Reach</span>
              </div>
              <div className="flex items-center text-gray-400 hover:text-green-400">
                <FaRoad size={20} className="mr-2" />
                <span>Seamless Journeys</span>
              </div>
            </div>
          </div>

          {/* Center Section with Social Media Icons */}
          <div className="flex flex-col items-center">
            <h1 className="text-xl font-semibold mb-2 py-2">Quick Links</h1>
            <ul className="space-y-2 text-gray-400 pl-4 text-center">
              <li className="hover:text-green-400 cursor-pointer">Dashboard</li>
              <li className="hover:text-green-400 cursor-pointer">Fleet</li>
              <li className="hover:text-green-400 cursor-pointer">Company Overview</li>
              <li className="hover:text-green-400 cursor-pointer">Get in Touch</li>
              <li className="hover:text-green-400 cursor-pointer">.....</li>
            </ul>
          
          </div>

          {/* Right Section */}
          <div className="pl-20">
            <h1 className="text-xl font-semibold mb-5">Contact Us</h1>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <FaMapMarkerAlt size={20} className="mr-2" />
                <span className="font-semibold text-white">123, XYZ Street, Mega City Cabs</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt size={20} className="mr-2" />
                <span className="font-semibold text-white">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope size={20} className="mr-2" />
                <span className="font-semibold text-white">megacitycabs@gmail.com</span>
              </li>
            </ul>
              {/* Social Media Icons placed in the center */}
              <div className="flex justify-center space-x-6 mt-6 pt-20">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <FaTwitter size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <FaFacebookF size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <FaInstagram size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <FaYoutube size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Dividers between sections */}
        <div className="flex justify-between mb-6">
          <div className="w-full h-px bg-gray-600"></div>
          <div className="w-full h-px bg-gray-600"></div>
          <div className="w-full h-px bg-gray-600"></div>
        </div>

        {/* Divider */}
        <hr className="border-gray-600 mb-6" />

        {/* Footer bottom section */}
        <div className="text-center py-4">
          <p className="text-sm text-gray-400">
            © 2025 Mega City Cabs. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
