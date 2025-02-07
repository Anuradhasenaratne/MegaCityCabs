import  { useState, useEffect } from "react";
import ApiService from "../../service/ApiService";

const VehicleSearch = ({ handleSearchResult }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      setLoading(true);
      try {
        const types = await ApiService.getVehicleTypes();
        setVehicleTypes(types);
      } catch (error) {
        setError("Error fetching vehicle types. Please try again later.");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleTypes();
  }, []);

  const showError = (message, timeout = 5000) => {
    setError(message);
    setTimeout(() => setError(""), timeout);
  };

  const handleInternalSearch = async () => {
    if (!startDate || !endDate || !vehicleType) {
      showError("Please fill in all fields before searching.");
      return;
    }

    try {
      const response = await ApiService.getAvailableVehiclesByDateAndType(
        startDate,
        endDate,
        vehicleType
      );

      if (response.statusCode === 200 && response.vehicleList.length > 0) {
        handleSearchResult(response.vehicleList);
        console.log(response.vehicleList);
      } else {
        showError("No vehicles available for the selected criteria.");
        
      }
    } catch (error) {
      showError("Error occurred while searching. Please try again.");
      console.error("Search Error:", error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-3xl mx-auto -mt-5 relative">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
        
        {/* Start Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700">Pick-up Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-3 border rounded-lg w-full outline-none bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* End Date */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700">Drop-off Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-3 border rounded-lg w-full outline-none bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Vehicle Type */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-gray-700">Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="p-3 border rounded-lg w-full outline-none bg-gray-100 text-gray-900 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Vehicle Type</option>
            {loading ? (
              <option value="" disabled>Loading vehicle types...</option>
            ) : (
              vehicleTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Search Button */}
       
        <button
          className="bg-orange-500 text-white px-6 py-3 rounded-lg w-full hover:bg-orange-600 transition font-semibold"
          onClick={handleInternalSearch}
        >
          Find a car →
        </button>

      </div>
    </div>
  );
};

export default VehicleSearch;
