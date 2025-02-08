import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { FaCheckCircle, FaFilePdf, FaHome } from "react-icons/fa";
import jsPDF from "jspdf";

const BookingSummary = () => {
  const navigate = useNavigate();
  const { bookingConfirmationCode } = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccessMessage] = useState(null);
  const location = useLocation();
  const { vehicleDetails, totalPrice, daycount, isDriverAdded } =
    location.state || {};
  const [driverCost, setDriverCost] = useState(0);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await ApiService.getBookingByConfirmationCode(
          bookingConfirmationCode
        );
        setBookingDetails(response.booking);
      } catch (error) {
        setError("Booking not found or an error occurred.");
      }
    };

    if (isDriverAdded) {
      setDriverCost(100 * daycount);
    }

    fetchBookingDetails();
  }, [bookingConfirmationCode, isDriverAdded, daycount]);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("MEGA CITY CABS - Booking Confirmation", 20, 20);

    doc.setFontSize(12);
    doc.text(`Confirmation Code: ${bookingConfirmationCode}`, 20, 40);
    doc.text(`Vehicle Type: ${vehicleDetails?.vehicleType}`, 20, 50);
    doc.text(`Model: ${vehicleDetails?.vehicleDescription}`, 20, 60);
    doc.text(
      `Price per Day: $${bookingDetails?.vehicle?.vehiclePrice}`,
      20,
      70
    );
    doc.text(`Pick-up Location: ${bookingDetails?.pickUpLocation}`, 20, 80);
    doc.text(`Drop-off Location: ${bookingDetails?.dropOffLocation}`, 20, 90);
    doc.text(`Check-in Date: ${bookingDetails?.checkInDate}`, 20, 100);
    doc.text(`Check-out Date: ${bookingDetails?.checkOutDate}`, 20, 110);
    doc.text(`Total Days: ${daycount}`, 20, 120);
    doc.text(`Driver Added: ${isDriverAdded ? "Yes" : "No"}`, 20, 130);
    doc.text(`Driver Cost: $${driverCost}`, 20, 140);
    doc.text(`Total Price: $${totalPrice}`, 20, 150);

    doc.text("© 2025 Anuradha Senaratne. All rights reserved.", 20, 180);

    doc.save("MCC_booking_confirmation.pdf");

    setSuccessMessage("PDF saved successfully! Redirecting to home...");
    setTimeout(() => {
      setSuccessMessage("");
      navigate("/");
    }, 3000);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-8">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Booking Details
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <div className="flex items-center justify-center bg-green-100 text-green-700 p-4 rounded-md mb-4">
            <FaCheckCircle className="text-green-500 mr-2" />
            {success}
          </div>
        )}

        {bookingDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Booking Details */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Booking Info
                </h3>
                <p className="text-gray-600">
                  Confirmation Code:{" "}
                  <span className="font-medium">
                    {bookingDetails.bookingConfirmationCode}
                  </span>
                </p>
                <p className="text-gray-600">
                  Check-in Date:{" "}
                  <span className="font-medium">
                    {bookingDetails.checkInDate}
                  </span>
                </p>
                <p className="text-gray-600">
                  Check-out Date:{" "}
                  <span className="font-medium">
                    {bookingDetails.checkOutDate}
                  </span>
                </p>
                <p className="text-gray-600">
                  Pick-Up Location:{" "}
                  <span className="font-medium">
                    {bookingDetails.pickUpLocation}
                  </span>
                </p>
                <p className="text-gray-600">
                  Drop-Off Location:{" "}
                  <span className="font-medium">
                    {bookingDetails.dropOffLocation}
                  </span>
                </p>
                <p className="text-gray-600">
                  Driver Added:{" "}
                  <span className="font-medium">
                    {isDriverAdded ? "Yes" : "No"}
                  </span>
                </p>
                <p className="text-gray-600">
                  Driver Cost:{" "}
                  <span className="font-medium">${driverCost}</span>
                </p>
                <p className="text-gray-600">
                  Total Price:{" "}
                  <span className="font-medium">${totalPrice}</span>
                </p>
                <p className="text-gray-600">
                  Total Days: <span className="font-medium">{daycount}</span>
                </p>
              </div>

              {/* Booker Details */}
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Booker Details
                </h3>
                <p className="text-gray-600">
                  Name:{" "}
                  <span className="font-medium">
                    {bookingDetails.user.name}
                  </span>
                </p>
                <p className="text-gray-600">
                  Email:{" "}
                  <span className="font-medium">
                    {bookingDetails.user.email}
                  </span>
                </p>
                <p className="text-gray-600">
                  Phone:{" "}
                  <span className="font-medium">
                    {bookingDetails.user.phone}
                  </span>
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-green-700 flex items-center gap-2 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg"
                  onClick={() => navigate("/")}
                >
                  <FaHome /> Back to Home
                </button>
                
              </div>
            </div>

            {/* Right Column - Vehicle Details */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Vehicle Details
                </h3>
                <p className="text-gray-600">
                  Vehicle Type:{" "}
                  <span className="font-medium">
                    {bookingDetails.vehicle.vehicleType}
                  </span>
                </p>
                <p className="text-gray-600">
                  Seats:{" "}
                  <span className="font-medium">
                    {bookingDetails.vehicle.vehicleSeats}
                  </span>
                </p>
                <p className="text-gray-600">
                  Price per Day:{" "}
                  <span className="font-medium">
                    ${bookingDetails.vehicle.vehiclePrice}
                  </span>
                </p>
                <p className="text-gray-600">
                  Model:{" "}
                  <span className="font-medium">
                    {bookingDetails.vehicle.vehicleDescription}
                  </span>
                </p>
                {bookingDetails.vehicle.vehiclePhotoUrl && (
                  <img
                    src={bookingDetails.vehicle.vehiclePhotoUrl}
                    alt="Vehicle"
                    className="w-full h-64 object-cover rounded-md mt-4 shadow-lg"
                  />
                )}
              </div>

              {/* Generate PDF Button */}
              <div className="flex justify-center">
                <button
                  className="bg-red-600 flex items-center gap-2 text-white py-2 px-6 rounded-lg hover:bg-red-700 transition duration-300 shadow-lg"
                  onClick={generatePDF}
                >
                  <FaFilePdf /> Generate PDF
                </button>
                
              </div>

              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
