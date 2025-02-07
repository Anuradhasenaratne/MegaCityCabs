import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";

const BookingSummary = () => {
  const { confirmationCode } = useParams(); // Capture confirmationCode from URL
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);

  


  // Fetch booking details based on confirmationCode
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await ApiService.getBookingByConfirmationCode(confirmationCode);
        setBookingDetails(response.booking); // Set fetched booking details
      } catch (error) {
        setError("Booking not found or an error occurred.");
      }
    };

    fetchBookingDetails();
  }, [confirmationCode]); // Re-fetch if confirmationCode changes

  // Show error or loading message
  if (error) {
    return <p>{error}</p>;
  }

  if (!bookingDetails) {
    return <p>Loading booking details...</p>;
  }

  const {
    vehicleType,
    checkInDate,
    checkOutDate,
    pickUpLocation,
    dropOffLocation,
   totalPrice,
    isDriverAdded,
    confirmationCode: bookingConfirmationCode, // Confirmation code from API response
  } = bookingDetails;
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Booking Summary</h1>

      <div className="mb-4">
        <p><strong>Confirmation Code:</strong> {bookingConfirmationCode}</p>
        <p><strong>Vehicle Type:</strong> {vehicleType}</p>
        <p><strong>Pick-up Location:</strong> {pickUpLocation}</p>
        <p><strong>Drop-off Location:</strong> {dropOffLocation}</p>
        <p><strong>Check-in Date:</strong> {checkInDate}</p>
        <p><strong>Check-out Date:</strong> {checkOutDate}</p>
        <p><strong>Driver Added:</strong> {isDriverAdded ? "Yes" : "No"}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Print Booking Summary
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
