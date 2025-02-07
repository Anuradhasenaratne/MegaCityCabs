import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import { assets } from "./assets/assets";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RelatedCars from "./components/RelatedCars";

const Appointment = () => {
  const { car_id } = useParams();
  const { cars, currencySymbol } = useContext(AppContext);

  const [carInfo, setCarInfo] = useState(null);

  const fethCarInfo = async () => {
    const carInfo = cars.find((item) => item.car_id === car_id);
    setCarInfo(carInfo);
    console.log(carInfo);
    if (carInfo) {
      console.log("Car image URL:", carInfo.img);
    }
  };

  useEffect(() => {
    fethCarInfo();
  }, [cars, car_id]);

  // second box date calculation

   // State to track the number of days input
   const [numberOfDays, setNumberOfDays] = useState(0);
   // State to track the checkbox (whether driver is added or not)
   const [isDriverAdded, setIsDriverAdded] = useState(false);
   // State to store the total cost
   const [totalCost, setTotalCost] = useState(null);

    // Handle input change for number of days
  const handleDaysChange = (e) => {
    setNumberOfDays(e.target.value);
    
    
  };

  // Handle checkbox change for adding driver.
  const handleCheckboxChange = (f) => {
    setIsDriverAdded(!isDriverAdded);
    
    
    
  };

 

  // Handle button click to calculate the total cost
  const handleCalculate = () => {
    const driverCost = isDriverAdded ? 100 : 0; // Add $20 if driver is selected
    // Example cost per day
    const total = (parseInt(numberOfDays) * driverCost) ;
    setTotalCost(total);
    calculateVehicleCost();
  };
 const [isselectvehical, setIsselectvehical] = useState();

  const [vehicleCost, setVehicleCost] = useState(0.0);  // State variable to hold the cost

  // Function to calculate the vehicle cost
  const calculateVehicleCost = () => {
     
    const vtotal = parseInt(carInfo.price) * parseInt(numberOfDays);  // Calculate total vehicle cost
    setVehicleCost(vtotal);  // Update the state with the calculated value
  }

//get car price match with after click button 
  

  

  return (
    carInfo && (
      <div className="pt-20 px-6 ">
        {/* Container with 3 columns */}
        <div className="grid grid-cols-3 gap-6 items-stretch pb-3  pt-3">
          {/* Left Section - Car Image */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-3 flex flex-col h-full">
            <img
              className="w-full h-auto object-cover rounded-lg"
              src={carInfo.image}
              alt={carInfo.name}
            />
          </div>

          {/* Middle Section - Car Details */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              {carInfo.name}
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-5 h-5"
              />
            </h2>
            <div className="mt-4">
              <p className="text-gray-600">
                <strong>Transmission:</strong> {carInfo.transmission}
              </p>
              <p className="text-gray-600">
                <strong>Type:</strong> {carInfo.speciality}
              </p>
              <p className="text-gray-600">
                <strong>Engine Capacity:</strong> {carInfo.cc}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">
                  <strong>Seats:</strong> {carInfo.seats}
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  <strong>Luggage:</strong> {carInfo.bags}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600 text-lg font-semibold">
                <strong>For one Day:</strong> {currencySymbol}
                {carInfo.price}
              </p>
            </div>
          </div>

          {/* Right Section - About Car */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
            <h3 className="text-xl font-bold flex items-center gap-2">
              About
              <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
            </h3>
            <p className="text-gray-600 mt-4">{carInfo.about}</p>
          </div>
        </div>
        {/* second boxses ----------------------------------------------------------------*/}

        <div className="grid grid-cols-3 gap-6 items-stretch pb-3 pt-3">
          {/* Box 1 - Destination */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-4 flex flex-col h-full">
          <div className="mt-2 text-gray-600 flex items-center">
  <h4 className="text-lg font-bold text-gray-800 mb-4 flex-grow">Destination</h4>
  <img
    className="ml-auto w-15 h-15" // Adjust width and height to your preference
    src={assets.destination}
    alt="destination icon"
  />
</div>

            {/* Pick-up Location Input Field */}
            <div className="mt-6">
              <label
                htmlFor="pickup-location"
                className="text-sm font-semibold text-gray-700"
              >
                Pick-up Location
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="pickup-location"
                  placeholder="Enter pick-up location"
                  className="w-full p-3 pl-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Drop-off Location Input Field */}
            <div className="mt-6">
              <label
                htmlFor="dropoff-location"
                className="text-sm font-semibold text-gray-700"
              >
                Drop-off Location
              </label>
              <div className="relative mt-2">
                <input
                  type="text"
                  id="dropoff-location"
                  placeholder="Enter drop-off location"
                  className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Box 2 - Add driver and dates */}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Service Details
              </h3>
              {/* Add Driver Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer text-gray-600">
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-500 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  checked={isDriverAdded}
                  onChange={handleCheckboxChange}
                />
                <span className="text-sm font-medium">
                  With Driver (+ $100 per day)
                </span>
              </label>
            </div>

            {/* Number of Days Section */}
            <div className="mt-4 text-gray-600">
              <p className="text-sm font-medium">Number of Days</p>
            </div>

            {/* Input Field for Number of Days */}
            <input
              type="text"
              id="smart-text-field"
              placeholder="Enter number of days"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(Number(e.target.value))}
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />

            {/* Finalize Bill Button */}
            <div className="mt-6">
              <button
              onClick={handleCalculate}
                type="button"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Calcualte
              </button>
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Finalzie Bill Continue
              </button>
            </div>
          </div>

          {/* Box 3 - Cost Breakdown*/}
          <div className="col-span-1 bg-white shadow-md rounded-lg p-6 flex flex-col h-full">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Cost Breakdown
            </h3>

            <div className="space-y-4 text-gray-600">
              {/* Vehicle Cost */}
              <div className="flex justify-between">
                <span className="text-xl font-medium">
                  Vehicle Cost 
                </span>
                <span className="text-xl">{numberOfDays} days</span>
                <span className="text-xl font-semibold">{currencySymbol}{vehicleCost}</span>
              </div>

              {/* Driver Cost */}
              <div className="flex justify-between">
                <span className="text-xl font-medium">
                  Driver Cost
                </span>
                <span className="text-xl">{numberOfDays} days</span>
                <span className="text-xl font-semibold">
                   {/* Display Total Cost */}
                   {currencySymbol}{totalCost}
                </span>
              </div>

              {/* Total Cost */}
              <div className="flex justify-between mt-4 border-t pt-4 font-bold text-xl text-gray-800">
                <span>Total</span>
                <span>{currencySymbol}{vehicleCost+totalCost}</span>
              </div>
            </div>
          </div>
        </div>
        {/* listed related cars */}
        <RelatedCars car_id={car_id} speciality={carInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
