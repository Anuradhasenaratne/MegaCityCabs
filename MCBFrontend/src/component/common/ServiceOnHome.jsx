import React from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

const ServiceOnHome = () => {
  return (

    <div className="relative md:px-20 px-6 pb-5">
        <h2 className="text-3xl font-bold text-center mb-10">
        Our <span className="text-green-700">We're BIG On What</span>
        <span className="text-gray-500"> Matters To You </span>
      </h2>
  {/* Why Choose Us Section */}
  <div className="mt-16">
    
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

  )
}

export default ServiceOnHome