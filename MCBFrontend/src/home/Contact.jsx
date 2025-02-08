import React from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="pt-">
      
      <div className="relative bg-gray-50  md:px-20 px-6">
        {/* Contact Us Section with Background Image */}
        <div
          className="relative bg-cover bg-center rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${assets.about_image})`,
          }}
        >
         
          {/* Overlay for readability */}
          <div className="bg-black bg-opacity-50 flex items-center justify-center py-16 px-6 md:px-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white pt-12">
                CONTACT <span className="text-orange-500">US</span>
              </h1>
              <p className="text-lg md:text-xl text-white mt-6 leading-relaxed max-w-5xl mx-auto">
                Get in touch with us for any inquiries, support, or feedback. We're here to assist you.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Phone */}
          <div className="bg-white shadow-lg p-8 rounded-lg text-center">
            <div className="text-orange-500 text-5xl mb-4">
              <FaPhone />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
            <p className="text-gray-600 mt-2">
              Reach us at: <span className="font-semibold">+123 456 789</span>
            </p>
          </div>
          {/* Email */}
          <div className="bg-white shadow-lg p-8 rounded-lg text-center">
            <div className="text-orange-500 text-5xl mb-4">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
            <p className="text-gray-600 mt-2">
              For inquiries, contact us at: <span className="font-semibold">contact@megacitycabs.com</span>
            </p>
          </div>
          {/* Address */}
          <div className="bg-white shadow-lg p-8 rounded-lg text-center">
            <div className="text-orange-500 text-5xl mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Our Address</h3>
            <p className="text-gray-600 mt-2">
              123 Main Street, Mega City, Country
            </p>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-16 ">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Find Us on the Map
          </h2>
          <div className="mt-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.374265075!2d-74.0060158!3d40.7127285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzAyLjQiTiA3NMKwMDAnMjIuOCJZ!5e0!3m2!1sen!2sus!4v1605056106940!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="mt-16 bg-white shadow-lg p-8 rounded-lg w-2/3 justify-center mx-auto pb-5">
          <h2 className="text-2xl font-semibold text-orange-500 text-center">Contact Form</h2>
          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 border border-gray-300 rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-4 border border-gray-300 rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              className="p-4 border border-gray-300 rounded-lg md:col-span-2"
            ></textarea>
            <button
              type="submit"
              className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300 md:col-span-2"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
