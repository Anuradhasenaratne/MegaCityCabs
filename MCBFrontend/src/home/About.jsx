import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
   <div className='pt-10 '>
     <div className="relative bg-gray-50 py-16  md:px-20 px-6">
    {/* About Us Section with Background Image */}
    <div
      className="relative bg-cover bg-center rounded-lg overflow-hidden  " // Added mt-22 for top margin
      style={{
        backgroundImage: `url(${assets.about_image})`,
      }}
    >
     
      {/* Overlay for readability */}
      <div className="bg-black bg-opacity-50 flex items-center justify-center py-16 px-6 md:px-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            ABOUT <span className="text-orange-500">US</span>
          </h1>
          <p className="text-lg md:text-xl text-white mt-6 leading-relaxed max-w-5xl mx-auto">
            Welcome to <span className="font-semibold text-white">Mega City Cabs!</span> 
            Your trusted partner for safe, reliable, and efficient transportation services. 
            We prioritize customer satisfaction by offering professional drivers, timely service, and affordable rates. 
            Whether you're commuting, heading to the airport, or planning a special event, we've got your transportation needs covered!
          </p>
          <button className="mt-6 px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>

    {/* Vision and Mission Section */}
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-orange-500">Our Vision</h2>
        <p className="text-gray-600 mt-4">
          To revolutionize urban transportation by providing world-class cab services that are safe, eco-friendly, and efficient.
        </p>
      </div>
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-orange-500">Our Mission</h2>
        <p className="text-gray-600 mt-4">
          To deliver seamless transportation experiences by prioritizing customer comfort, safety, and timely service with professional drivers and state-of-the-art vehicles.
        </p>
      </div>
    </div>

    {/* Why Choose Us Section */}
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Why <span className="text-orange-500">Choose Us</span>
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Box 1 */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center hover:bg-orange-500 hover:text-white transition-all duration-300 text-gray-600 cu">
          <div className="text-orange-500 text-5xl mb-4">🚖</div>
          <h3 className="text-xl font-semibold text-gray-800">Professional Drivers</h3>
          <p className="text-gray-600 mt-2">
            Our team of experienced and courteous drivers ensures your journey is safe and pleasant.
          </p>
        </div>
        {/* Box 2 */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center">
          <div className="text-orange-500 text-5xl mb-4">⏱️</div>
          <h3 className="text-xl font-semibold text-gray-800">Timely Service</h3>
          <p className="text-gray-600 mt-2">
            Punctuality is our priority. We value your time and guarantee prompt pickups and drop-offs.
          </p>
        </div>
        {/* Box 3 */}
        <div className="bg-white shadow-lg p-8 rounded-lg text-center">
          <div className="text-orange-500 text-5xl mb-4">💸</div>
          <h3 className="text-xl font-semibold text-gray-800">Affordable Rates</h3>
          <p className="text-gray-600 mt-2">
            We offer competitive pricing without compromising on quality, making your rides budget-friendly.
          </p>
        </div>
      </div>
    </div>
  </div>
    
   </div>
  )
}

export default About