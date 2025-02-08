import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    ApiService.logout();
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/EditProfile");
  };

  return (
    <div className="container mx-auto p-6">
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {user ? (
        <>
          {/* Profile Section (smaller box) */}
          <div className="text-center mb-8 p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800">
              Welcome, {user.name}
            </h2>
          </div>

          {/* Profile Details Section */}
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-10/12 md:w-8/12 mx-auto ">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={handleEditProfile}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                Logout
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">Email:</span>
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">NIC:</span>
                <span className="text-gray-600">{user.nic}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">
                  Phone Number:
                </span>
                <span className="text-gray-600">{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-700">User Role:</span>
                <span className="text-gray-600">{user.role}</span>
              </div>
            </div>
          </div>

          {/* Booking History Section */}
          {/* Booking History Section */}
          {/* <div className="bg-white shadow-lg rounded-lg p-6 mb-8 w-10/12 md:w-8/12 mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              My Booking History
            </h3>
            {user.bookings.length > 0 ? (
              <div className="space-y-6">
                {user.bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition duration-300 p-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <span className="text-lg font-semibold text-gray-700">
                          Booking Code:
                        </span>
                        <span className="text-gray-600">
                          {booking.bookingConfirmationCode}
                        </span>
                        <span className="text-lg font-semibold text-gray-700 mt-4">
                          Vehicle Type:
                        </span>
                        <span className="text-gray-600">
                          {booking.vehicle.vehicleType}
                        </span>
                        <span className="text-lg font-semibold text-gray-700 mt-4">
                          Check-in Date:
                        </span>
                        <span className="text-gray-600">
                          {booking.checkInDate}
                        </span>
                        <span className="text-lg font-semibold text-gray-700 mt-4">
                          Check-out Date:
                        </span>
                        <span className="text-gray-600">
                          {booking.checkOutDate}
                        </span>
                        <span className="text-lg font-semibold text-gray-700 mt-4">
                          Pick-up Location:
                        </span>
                        <span className="text-gray-600">
                          {booking.pickUpLocation}
                        </span>
                        <span className="text-lg font-semibold text-gray-700 mt-4">
                          Drop-off Location:
                        </span>
                        <span className="text-gray-600">
                          {booking.dropOffLocation}
                        </span>
                      </div>
                      <div className="flex justify-center items-center">
                        {booking.vehicle.vehiclePhotoUrl && (
                          <img
                            src={booking.vehicle.vehiclePhotoUrl}
                            alt="Vehicle"
                            className="w-40 h-auto object-cover rounded-lg shadow-md"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No bookings found.</p>
            )}
          </div> */}
        </>
      ) : (
        <div className="text-center text-gray-500">
          <p>Loading profile...</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
