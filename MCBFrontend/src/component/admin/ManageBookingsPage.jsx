import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const ManageBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookingsWithVehicles = async () => {
      try {
        const response = await ApiService.getAllBookings();
        const bookingsWithVehicles = await Promise.all(
          response.bookingList.map(async (booking) => {
            try {
              const vehicle = await ApiService.getAllVehicles(
                booking.vehicleid
              );
              return {
                ...booking,
                vehicleType: vehicle.vehicleType || "N/A",
                vehicleSeats: vehicle.vehicleSeats || "N/A",
              };
            } catch (error) {
              console.error("Error fetching vehicle details:", error);
              return {
                ...booking,
                vehicleType: "N/A",
                vehicleSeats: "N/A",
              };
            }
          })
        );
          
        setBookings(bookingsWithVehicles);
        setFilteredBookings(bookingsWithVehicles);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
      }
    };

    fetchBookingsWithVehicles();
  }, []);

  useEffect(() => {
    filterBookings(searchTerm);
  }, [searchTerm, bookings]);

  const filterBookings = (term) => {
    const filtered =
      term === ""
        ? bookings
        : bookings.filter((booking) =>
            booking.bookingConfirmationCode
              ?.toLowerCase()
              .includes(term.toLowerCase())
          );
    setFilteredBookings(filtered);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  console.log("booking confor code from manage booking page", filterBookings.bookingConfirmationCode);
  return (
    // <div className="bookings-container">
    //   <h2>All Bookings</h2>
    //   <div className="search-div">
    //     <label>Filter by Booking Code:</label>
    //     <input
    //       type="text"
    //       value={searchTerm}
    //       onChange={handleSearchChange}
    //       placeholder="Enter booking confirmation code"
    //     />
    //   </div>

    //   <div className="booking-results">
    //     {filteredBookings.map((booking) => (
    //       <div key={booking.id} className="booking-result-item">
    //         <p>
    //           <strong>Booking Code:</strong> {booking.bookingConfirmationCode}
    //         </p>
    //         <p>
    //           <strong>Check In Date:</strong> {booking.checkInDate}
    //         </p>
    //         <p>
    //           <strong>Check out Date:</strong> {booking.checkOutDate}
    //         </p>
    //         <p>
    //           <strong>Pick-up Location:</strong>{" "}
    //           {booking.pickUpLocation || "N/A"}
    //         </p>
    //         <p>
    //           <strong>Drop-off Location:</strong>{" "}
    //           {booking.dropOffLocation || "N/A"}
    //         </p>
            
    //         <p>
    //           <strong>Driver Required:</strong>{" "}
    //           {booking.driverRequired ? "Yes" : "No"}
    //         </p>
    //         ✅
    //         <button
    //           className=""
    //           onClick={() => navigate(`/EditBookingPage/${booking.bookingConfirmationCode}`)}
    //         >
    //           Manage Booking
    //         </button>
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className="bookings-container min-h-screen p-8 bg-gray-50">
  <h2 className="text-3xl font-bold text-gray-800 mb-8">All Bookings</h2>
  
  <div className="search-div mb-8 max-w-md">
    <div className="flex items-center gap-4">
      <label className="text-gray-700 font-medium">Filter by Booking Code:</label>
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Enter booking confirmation code"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  </div>

  <div className="booking-results grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredBookings.map((booking) => (
      <div key={booking.id} className="booking-result-item bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Booking Code</p>
              <p className="font-medium text-blue-600">{booking.bookingConfirmationCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Driver Required</p>
              <p className={`font-medium ${booking.getDriver ? 'text-green-600' : 'text-red-600'}`}>
                {booking.getDriver ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Check In</p>
              <p className="font-medium">{booking.checkInDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Check Out</p>
              <p className="font-medium">{booking.checkOutDate}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Pick-up Location</p>
              <p className="font-medium">{booking.pickUpLocation || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Drop-off Location</p>
              <p className="font-medium">{booking.dropOffLocation || "N/A"}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/EditBookingPage/${booking.bookingConfirmationCode}`)}
          className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v5m0 0l3-3m-3 3l-3-3" />
          </svg>
          Manage Booking
        </button>
      </div>
    ))}
    
    {filteredBookings.length === 0 && (
      <div className="col-span-full text-center py-12">
        <p className="text-gray-500">No bookings found</p>
      </div>
    )}
  </div>
</div>
  );
};

export default ManageBookingsPage;
