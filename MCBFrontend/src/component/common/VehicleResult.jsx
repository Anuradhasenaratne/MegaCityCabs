
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';
import { FaCar } from 'react-icons/fa';

const VehicleResult = ({ vehicleSearchResults }) => {
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  return (
    <section className="vehicle-results py-6">
      {vehicleSearchResults && vehicleSearchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {vehicleSearchResults.map((vehicle) => (
            <div
              key={vehicle.id}
              className="flex flex-col bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Image Section */}
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
              <h3 className="text-xl font-semibold text-gray-800 mb-2 "> {vehicle.vehicleType} <FaCar className="text-blue-500" size={16} /> </h3>
              <img
                    className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                    src={vehicle.vehiclePhotoUrl} // Assuming 'vehiclePhotoUrl' is the property for the car image
                    alt={vehicle.vehicleType}
                  />
              </div>

              {/* Vehicle Info */}
              <div className="flex-1">
                
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Model / Brand :</strong> {vehicle.vehicleSeats}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Price:</strong> ${vehicle.vehiclePrice} / day
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Model:</strong> {vehicle.vehicleDescription}
                </p>
                
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Transmission:</strong> {vehicle.vehicleTransmission}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex justify-between items-center mt-auto">
                {isAdmin ? (
                  <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={() => navigate(`/EditVehiclePage/${vehicle.id}`)}
                  >
                    Edit Vehicle
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition-colors"
                    onClick={() => navigate(`/VehicleDetails/${vehicle.id}`,scrollTo(0, 0))}
                  >
                    View/Book Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 col-span-4">No vehicles found.</p>
      )}
    </section>
  );
};

export default VehicleResult;