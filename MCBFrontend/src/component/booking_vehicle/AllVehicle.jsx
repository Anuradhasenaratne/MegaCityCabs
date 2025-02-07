import  { useState, useEffect } from 'react';
import ApiService from '../../service/ApiService';
import VehicleResult from '../../component/common/VehicleResult';
import VehicleSearch from '../../component/common/SearchBar';

const AllVehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [loading, setLoading] = useState(true);
  const[availableVehicles, setAvailableVehicles] = useState([]);

  const handleSearchResult = (results) => {
    setVehicles(results);
    setFilteredVehicles(results);
  };

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getAllAvailableVehicles();
        const allVehicles = response.vehicleList;
        setVehicles(allVehicles);
        setFilteredVehicles(allVehicles);

       

      } catch (error) {
        console.error('Error fetching vehicles:', error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchVehicleTypes = async () => {
      try {
        const types = await ApiService.getVehicleTypes();
        setVehicleTypes(types);

        
      } catch (error) {
        console.error('Error fetching vehicle types:', error.message);
      }
    };

    // const fetchAvailableVehicles = async () => {
    //   const responseAvailable = await ApiService.getAvailableVehicles();
    //   const availableVehicles = responseAvailable.vehicleList;
    //   setAvailableVehicles(availableVehicles);
    // };

    fetchVehicles();
    fetchVehicleTypes();
    //fetchAvailableVehicles();
  }, []);

  const handleVehicleTypeChange = (e) => {
    setSelectedVehicleType(e.target.value);
    filterVehicles(e.target.value);
  };

  const filterVehicles = (type) => {
    if (type === '') {
      setFilteredVehicles(vehicles);
    } else {
      const filtered = vehicles.filter((vehicle) => vehicle.vehicleType === type);
      setFilteredVehicles(filtered);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <div className="text-center bg-gray-100 p-8 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Explore Our Vehicles</h2>
        <div className="flex justify-center items-center gap-4">
          <label className="font-medium text-gray-700">Filter by Vehicle Type:</label>
          <select
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedVehicleType}
            onChange={handleVehicleTypeChange}
          >
            <option value="">All</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
                
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <VehicleSearch handleSearchResult={handleSearchResult} />

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <span className="text-xl text-blue-500">Loading...</span>
        </div>
      ) : (
        <VehicleResult vehicleSearchResults={filteredVehicles} />
      )}
    </div>
  );
};

export default AllVehiclesPage;
