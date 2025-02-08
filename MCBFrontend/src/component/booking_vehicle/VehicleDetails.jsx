import { useState, useEffect } from "react"; // Import useEffect
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { jsPDF } from "jspdf"; // Import jsPDF
import verified_icon from "../../assets/verified_icon.svg";
import { set } from "date-fns";

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [userId, setUserId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [checkInDate, setCheckInDate] = useState(""); // Renamed from pickupDate
  const [checkOutDate, setCheckOutDate] = useState(""); // Renamed from dropoffDate

  const [isDriverAdded, setIsDriverAdded] = useState(false);
  console.log("isDriverAdded:", isDriverAdded); // Debugging log
  const [totalPrice, setTotalPrice] = useState(0);

  const [confirmationCode, setConfirmationCode] = useState(null);

  const [daycount, setDayCount] = useState(0);
  const [driverCost, setDriverCost] = useState(0);
  const [parDayCost, setPerDayCost] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [error, setError] = useState(null); // Track any errors
 

 

  const handleCheckboxChange = () => {
    setIsDriverAdded(!isDriverAdded);
      
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        setIsLoading(true); // Set loading state to true
        const response = await ApiService.getVehicleById(vehicleId);
        setVehicleDetails(response.vehicle);

        const userProfile = await ApiService.getUserProfile();
        setUserId(userProfile.user.id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };
    fetchData();
  }, [vehicleId]);

  const handleConfirmBooking = () => {
    // Check if check-in and check-out dates are selected
    if (!checkInDate || !checkOutDate) {
      setErrorMessage("Please select check-in and check-out dates.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }
    if(!pickUpLocation || !dropOffLocation){
      setErrorMessage("Please fill locations.");
      setTimeout(() => setErrorMessage(""), 5000); // Clear error message after 5 seconds
      return;
    }

    // Calculate total number of days
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const totalDays = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

    setDayCount(totalDays); // Set total days
    const perDayCost = totalDays * vehicleDetails.vehiclePrice; // Vehicle cost for selected days
    setPerDayCost(perDayCost);

    const driverCost = isDriverAdded ? 100 * totalDays : 0; // Calculate driver cost
    setDriverCost(driverCost);

    const total = perDayCost + driverCost; // Calculate total cost
    setTotalPrice(total); // Update total price in state
  };

  // const generatePDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFontSize(18);
  //   doc.text("Booking Confirmation", 20, 20);

  //   doc.setFontSize(12);
  //   doc.text(`Vehicle Type: ${vehicleDetails.vehicleType}`, 20, 40);
  //   doc.text(`Vehicle Price per day: $${vehicleDetails.vehiclePrice}`, 20, 50);
  //   doc.text(`Pick-up Location: ${pickUpLocation}`, 20, 60);
  //   doc.text(`Drop-off Location: ${dropOffLocation}`, 20, 70);
  //   doc.text(`Check-in Date: ${checkInDate}`, 20, 80);
  //   doc.text(`Check-out Date: ${checkOutDate}`, 20, 90);
  //   doc.text(`Total Days: ${daycount}`, 20, 100);
  //   doc.text(`Driver Added: ${isDriverAdded ? "Yes" : "No"}`, 20, 110);
  //   doc.text(`Total Price: $${totalPrice}`, 20, 120);

  //   // Add debug log for confirmationCode
  //   console.log("Generating PDF with Confirmation Code:", confirmationCode);

  //   doc.text(`Confirmation Code: ${confirmationCode}`, 20, 130); // Ensure confirmationCode is included here

  //  // doc.save("booking_confirmation.pdf");
  // };

  const acceptBooking = async () => {
    try {
      // Convert dates to YYYY-MM-DD format
      const formattedCheckInDate = new Date(
        new Date(checkInDate).getTime() -
          new Date(checkInDate).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      const formattedCheckOutDate = new Date(
        new Date(checkOutDate).getTime() -
          new Date(checkOutDate).getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      const booking = {
        checkInDate: formattedCheckInDate,
        checkOutDate: formattedCheckOutDate,
        getDriver: isDriverAdded ? 1 : 0 ,// Convert boolean to 1/0
        pickUpLocation: pickUpLocation,
        dropOffLocation: dropOffLocation,
      };

      const response = await ApiService.bookVehicle(vehicleId, userId, booking);
      if (response.statusCode === 200) {
        setConfirmationCode(response.bookingConfirmationCode); // Set booking confirmation code
        
        console.log(
          "Confirmation Code Set: ",
          response.bookingConfirmationCode
          
        ); // Debugging log
        // Generate and download PDF after successful booking
       // generatePDF(); 
        setShowMessage(true); // Show success message
        setTimeout(() => {
          setShowMessage(false);
          navigate(`/BookingSummery/${response.bookingConfirmationCode}`, { state: { vehicleDetails, totalPrice,daycount,isDriverAdded } }); // Navigate to summary page after delay
        }, 1000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 5000);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!vehicleDetails) {
    return <p>Vehicle not found.</p>;
  }

  const {
    vehicleType,
    vehiclePrice,
    vehiclePhotoUrl,
    vehicleDescription,
    vehicleSeats,
    vehicleTransmission,
  } = vehicleDetails;

  return (
    <div className="pt-2 pb-2">
    <div className="max-w-4xl mx-auto p-2 bg-white rounded-xl shadow-lg  ">
      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <span className="text-red-600 font-medium">⚠️ {errorMessage}</span>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Vehicle Details Section */}
        <div className="space-y-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-2 mr-2">
              {vehicleType}
            </h1>
            <img src={verified_icon} alt="Verified Icon" className="w-4 h-4" />
          </div>

          <p className="flex justify-between">
            <span className="font-medium">{vehicleSeats}</span>
          </p>
          <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
            <img
              className="w-full h-full object-cover transform transition duration-500 hover:scale-110"
              src={vehiclePhotoUrl}
              alt="Vehicle"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-1 text-gray-600">
              <p className="flex justify-between">
                <span>Vehicle ID:</span>
                <span className="font-medium">{vehicleDetails.id}</span>
              </p>
              <p className="flex justify-between">
                <span>Daily Price:</span>
                <span className="font-medium">${vehiclePrice}</span>
              </p>

              <p className="flex justify-between">
                <span>Transmission:</span>

                <span className="font-medium">{vehicleTransmission}</span>
              </p>
              <p className="flex justify-between">
                <span>About this:</span>
                <span className="font-medium">{vehicleDescription}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form Section */}
        <div className="space-y-6">
          {/* Location Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pick-up location
              </label>
              <input
                type="text"
                value={pickUpLocation}
                onChange={(e) => setPickUpLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pick-up location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Drop-off location
              </label>
              <input
                type="text"
                value={dropOffLocation}
                onChange={(e) => setDropOffLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter drop-off location"
              />
            </div>
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Driver Checkbox */}
          <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors">
            <input
              type="checkbox"
              className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              checked={isDriverAdded}
              onChange={handleCheckboxChange}
            />
            <span className="text-gray-700 font-medium">
              Add Driver (+ $100/day)
            </span>
          </label>

          {/* Price Summary */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span>Vehicle Cost:</span>
              <span className="font-medium">
              ({daycount} days) ×   ${parDayCost} 
              </span>
            </div>
            {isDriverAdded && (
              <div className="flex justify-between">
                <span>Driver Cost:</span>
                <span className="font-medium">
                  ({daycount} days) ×  ${driverCost} 
                </span>
              </div>
            )}
            <div className="flex justify-between pt-2 border-t border-blue-200">
              <span className="font-bold">Total Price:</span>
              <span className="font-bold text-blue-600">${totalPrice}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleConfirmBooking}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Calculate Price
            </button>

            {totalPrice > 0 && (
              <button
                onClick={acceptBooking}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Confirm Booking
              </button>
            )}
          </div>

          {/* Success Message */}
          {showMessage && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-600 font-medium">
                Booking successful! Confirmation Code: {confirmationCode}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default VehicleDetails;
