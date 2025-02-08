import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditBookingPage = () => {
  const navigate = useNavigate();
  const { bookingConfirmationCode } = useParams(); 
  const [bookingDetails, setBookingDetails] = useState(null); // State variable for booking details
  const [error, setError] = useState(null); // Track any errors
  const [success, setSuccessMessage] = useState(null); // Track any errors



  useEffect(() => {
      const fetchBookingDetails = async () => {
          try {
              const response = await ApiService.getBookingByConfirmationCode(bookingConfirmationCode);
              setBookingDetails(response.booking);
          } catch (error) {
              setError(error.message);
          }
      };

      fetchBookingDetails();
  }, [bookingConfirmationCode]);


  const acheiveBooking = async (bookingId) => {
      if (!window.confirm('Are you sure you want to Acheive this booking?')) {
          return; // Do nothing if the user cancels
      }

      try {
          const response = await ApiService.cancelBooking(bookingId);
          if (response.statusCode === 200) {
              setSuccessMessage("The boking was Successfully Acheived")
              
              setTimeout(() => {
                  setSuccessMessage('');
                  navigate('/ManageBookingsPage');
              }, 3000);
          }
      } catch (error) {
          setError(error.response?.data?.message || error.message);
          setTimeout(() => setError(''), 5000);
      }
  };


  return (


  <div className="bg-gray-100 min-h-screen flex justify-center items-center py-8">
  <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-8">
    <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Booking Detail</h2>

    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    {success && <p className="text-green-500 text-center mb-4">{success}</p>}

    {bookingDetails && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Booking & Booker Details */}
        <div className="space-y-8">
          {/* Booking Details */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Booking Details</h3>
            <p className="text-gray-600">Confirmation Code: <span className="font-medium">{bookingDetails.bookingConfirmationCode}</span></p>
            <p className="text-gray-600">Check-in Date: <span className="font-medium">{bookingDetails.checkInDate}</span></p>
            <p className="text-gray-600">Check-out Date: <span className="font-medium">{bookingDetails.checkOutDate}</span></p>
            <p className="text-gray-600">Pick-Up Location: <span className="font-medium">{bookingDetails.pickUpLocation}</span></p>
            <p className="text-gray-600">Drop-Off Location: <span className="font-medium">{bookingDetails.dropOffLocation}</span></p>
            <p className="text-gray-600">Request Driver <span className="font-medium">{bookingDetails.getDriver}</span></p>
          </div>

          {/* Booker Details */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Booker Details</h3>
            <p className="text-gray-600">Name: <span className="font-medium">{bookingDetails.user.name}</span></p>
            <p className="text-gray-600">Email: <span className="font-medium">{bookingDetails.user.email}</span></p>
            <p className="text-gray-600">Phone Number: <span className="font-medium">{bookingDetails.user.phone}</span></p>
          </div>
        </div>

        {/* Right Column - Vehicle Details */}
        <div className="space-y-8">
          {/* Vehicle Details */}
          <div className="border-b pb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Vehicle Details</h3>
            <p className="text-gray-600">Vehicle Type: <span className="font-medium">{bookingDetails.vehicle.vehicleType}</span></p>
            <p className="text-gray-600">Vehicle Model: <span className="font-medium">{bookingDetails.vehicle.vehicleSeats}</span></p>

            <p className="text-gray-600">Price: <span className="font-medium">${bookingDetails.vehicle.vehiclePrice}</span></p>
            <p className="text-gray-600">Vehicle Model: <span className="font-medium">{bookingDetails.vehicle.vehicleDescription}</span></p>
            {bookingDetails.vehicle.vehiclePhotoUrl && (
              <img
                src={bookingDetails.vehicle.vehiclePhotoUrl}
                alt="Vehicle"
                className="w-full h-64 object-cover rounded-md mt-4 shadow-lg"
              />
            )}
          </div>

          {/* Achieve Booking Button */}
          <div className="flex justify-center">
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
              onClick={() => acheiveBooking(bookingDetails.id)}
            >
              Cancle Booking
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>



  
  )
}

export default EditBookingPage