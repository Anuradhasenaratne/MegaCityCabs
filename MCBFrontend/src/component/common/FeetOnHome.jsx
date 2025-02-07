import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ApiService from "../../service/ApiService"; // Make sure you have this service set up

// Import Icons

import { useNavigate } from "react-router-dom";

const Fleet = () => {
  const [cars, setCars] = useState([]); // State to store the vehicle data
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin(); // Checking if the user is an admin

  const[availableVehicles, setAvailableVehicles] = useState([]);
  const [allcars, setAllCars] = useState([]);
  // Fetch cars data from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await ApiService.getAllAvailableVehicles(); // Replace with your actual API call
        setCars(response.vehicleList); // Assuming the response structure has 'vehicleList'
         const allVehicles = response.vehicleList;
        setAllCars(allVehicles);
        
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
const fetchAvailableVehicles = async () => {
      const responseAvailable = await ApiService.getAllAvailableVehicles();
      const availableVehicles = responseAvailable.vehicleList;
      setAvailableVehicles(availableVehicles);
    console.log(availableVehicles);

    };

    fetchAvailableVehicles();
    fetchCars();
  }, []);

  useEffect(() => {
  if(cars.id === availableVehicles.id){
    console.log("car is available");}else{
      console.log("car is not available");
    }
  }, []);

  

  return (
    <div className="py-10 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our <span className="text-orange-500">Fleet</span>
        <span className="text-gray-500">.</span>
      </h2>

      {/* Swiper Carousel */}
      <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={20}
  slidesPerView={1}
  breakpoints={{
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 3000 }}
  loop={false} // Disable loop mode here
  className="max-w-6xl mx-auto px-6"
>

        {cars.length > 0 ? (
          cars.map((car, index) => (
            <SwiperSlide key={index} className="p-3">
              <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Image Section */}
                <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                    src={car.vehiclePhotoUrl} // Assuming 'vehiclePhotoUrl' is the property for the car image
                    alt={car.vehicleType}
                  />
                </div>

                {/* Vehicle Info */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{car.vehicleType}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Price:</strong> ${car.vehiclePrice} / day
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Model:</strong> {car.vehicleDescription}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Seats:</strong> {car.vehicleSeats}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <strong>Transmission:</strong> {car.vehicleTransmission}
                  </p>

                  {/* check availble or not */}
          
                  
                </div>

                {/* Action Button */}
                <div className="flex justify-between items-center mt-auto">
                  {isAdmin ? (
                    <button
                      className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                      onClick={() => navigate(`/admin/edit-vehicle/${car.id}`)}
                    >
                      Edit Vehicle
                    </button>
                  ) : (
                    <button
                      className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
                      onClick={() => navigate(`/VehicleDetails/${car.id}`, scrollTo(0, 0))}
                    >
                      View/Book Now
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-600">Loading vehicles...</p> // Display loading text when fetching data
        )}
      </Swiper>
    </div>
  );
};

export default Fleet;
