
import NavBar from '../component/common/NavBar'
import Hero from '../component/common/Hero'
import Footer from '../component/common/Footer'
import Fleet from '../component/common/FeetOnHome'
import ServiceOnHome from '../component/common/ServiceOnHome'
import SearchBar from '../component/common/SearchBar'
import VehicleResult from '../component/common/VehicleResult'
import { useState } from 'react'



const HomePage = () => {
  const [vehicleSearchResults, setVehicleSearchResults] = useState([]);

 

  // Function to handle search results
  const handleSearchResult = (results) => {
      setVehicleSearchResults(results);
  };

  return (
    <div>
      
      <Hero />

      {/* Search Bar Component (Ensure it updates the search results state) */}
      <SearchBar handleSearchResult={handleSearchResult}  />

      {/* Show results after the Hero section only if search results exist */}
      
      <VehicleResult vehicleSearchResults={vehicleSearchResults} />
    
    


      <Fleet />
      <ServiceOnHome />
     
    </div>
  );
};

export default HomePage