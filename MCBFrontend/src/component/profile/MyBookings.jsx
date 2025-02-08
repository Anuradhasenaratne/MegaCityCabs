
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useEffect, useState } from "react";
import { Button } from "@headlessui/react";

const MyBookings = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [findBooking, setFindBooking] = useState(null);

  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await ApiService.getUserProfile();
          // Fetch user bookings using the fetched user ID
          const userPlusBookings = await ApiService.getUserBookings(
            response.user.id
          );
        

          setUser(userPlusBookings.user);
        } catch (error) {
          setError(error.response?.data?.message || error.message);
        }
      };
  
      fetchUserProfile();
    }, []);

  return (
    // <div className="container mx-auto p-6">
    //   {error && <div className="text-red-500 text-center mb-4">{error}</div>}

    //   {user ? (
    //     <>
         

    //       {/* Booking History Section */}
    //       {/* Booking History Section */}
    //       <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-10/12 md:w-8/12 mx-auto">
    //         <h3 className="text-2xl font-semibold text-gray-800 mb-6">
    //           My Booking History
    //         </h3>
    //         {user.bookings.length > 0 ? (
    //           <div className="space-y-6">
    //             {user.bookings.map((booking) => (
    //               <div
    //                 key={booking.id}
    //                 className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6"
    //               >
    //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //                   <div className="flex flex-col">
    //                     <span className="text-lg font-semibold text-gray-700">
    //                       Booking Code:
    //                     </span>
    //                     <span className="text-gray-600">
    //                       {booking.bookingConfirmationCode}
    //                     </span>
    //                     <span className="text-lg font-semibold text-gray-700 mt-4">
    //                       Vehicle Type:
    //                     </span>
    //                     <span className="text-gray-600">
    //                       {booking.vehicle.vehicleType}
    //                     </span>
    //                     <span className="text-lg font-semibold text-gray-700 mt-4">
    //                       Check-in Date:
    //                     </span>
    //                     <span className="text-gray-600">
    //                       {booking.checkInDate}
    //                     </span>
    //                     <span className="text-lg font-semibold text-gray-700 mt-4">
    //                       Check-out Date:
    //                     </span>
    //                     <span className="text-gray-600">
    //                       {booking.checkOutDate}
    //                     </span>
    //                     <span className="text-lg font-semibold text-gray-700 mt-4">
    //                       Pick-up Location:
    //                     </span>
    //                     <span className="text-gray-600">
    //                       {booking.pickUpLocation}
    //                     </span>
    //                     <span className="text-lg font-semibold text-gray-700 mt-4">
    //                       Drop-off Location:
    //                     </span>
    //                     <span className="text-gray-600">
    //                       {booking.dropOffLocation}
    //                     </span>
    //                   </div>
    //                   <div className="flex justify-center items-center">
    //                     {booking.vehicle.vehiclePhotoUrl && (
    //                       <img
    //                         src={booking.vehicle.vehiclePhotoUrl}
    //                         alt="Vehicle"
    //                         className="w-40 h-auto object-cover rounded-lg shadow-md"
    //                       />
    //                     )}
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>
    //         ) : (
    //           <p className="text-gray-600">No bookings found.</p>
    //         )}
    //       </div>
    //     </>
    //   ) : (
    //     <div className="text-center text-gray-500">
    //       <p>Loading profile...</p>
    //     </div>
    //   )}
    // </div>
    <div className="container mx-auto px-4 py-8">
  {error && (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 max-w-2xl mx-auto text-center">
      {error}
    </div>
  )}

  {user ? (
    <>
      {/* Booking History Section */}
      <div className="bg-gradient-to-br from-white to-blue-50 shadow-2xl rounded-2xl p-8 mb-8 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-blue-100 pb-4">
          📅 Bookings
        </h3>
        {/* find by con code */}
        <div  className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Find By Booking Code
              </label>
              <input
                type="text"
                value={findBooking}
                onChange={(e) => setFindBooking(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Code "
              />
                <button
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >Find</button>
            </div>
            
        
        {user.bookings.length > 0 ? (
          <div className="space-y-8">
            {user.bookings.map((booking) => (
              <div
                key={booking.id}
                className="group bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                  {/* Vehicle Image */}
                  <div className="lg:col-span-1 flex items-center justify-center">
                    {booking.vehicle.vehiclePhotoUrl && (
                      <img
                        src={booking.vehicle.vehiclePhotoUrl}
                        alt="Vehicle"
                        className="w-64 h-48 object-cover rounded-xl shadow-md transform group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Booking Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                        🎫 Booking Code: {booking.bookingConfirmationCode}
                      </div>
                      <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                        <span className="text-green-800 text-sm">🚗 {booking.vehicle.vehicleType}</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                        <span className="text-green-800 text-sm">🚗 {booking.vehicle.vehicleSeats}</span>
                      </div>
                      
                      
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Date Section */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">📅</span>
                          <div>
                            <p className="text-sm text-gray-500">Pick-Up Date </p>
                            <p className="font-medium text-gray-700">
                              {new Date(booking.checkInDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-600">📅</span>
                          <div>
                            <p className="text-sm text-gray-500">Drop-Off Date</p>
                            <p className="font-medium text-gray-700">
                              {new Date(booking.checkOutDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Location Section */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-600">📍</span>
                          <div>
                            <p className="text-sm text-gray-500">Pick-up Location</p>
                            <p className="font-medium text-gray-700">
                              {booking.pickUpLocation}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-600">📍</span>
                          <div>
                            <p className="text-sm text-gray-500">Drop-off Location</p>
                            <p className="font-medium text-gray-700">
                              {booking.dropOffLocation}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 p-2 rounded-lg">💰</span>
                        <div>
                          <p className="text-xs text-gray-500">Total Price</p>
                          <p className="font-semibold text-gray-800">
                            ${booking.totalPrice}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-purple-100 p-2 rounded-lg">👤</span>
                        <div>
                          <p className="text-xs text-gray-500">Driver</p>
                          <p className="font-semibold text-gray-800">
                            {booking.isDriverAdded ? "Included" : "Not included"}
                          </p>
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4 text-6xl">😴</div>
            <p className="text-gray-600 text-lg font-medium">
              No bookings found. Start your next adventure!
            </p>
          </div>
        )}
      </div>
    </>
  ) : (
    <div className="text-center py-12">
      <div className="animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent mb-4"></div>
      <p className="text-gray-600">Loading your profile...</p>
    </div>
  )}
</div>
  )
}

export default MyBookings
