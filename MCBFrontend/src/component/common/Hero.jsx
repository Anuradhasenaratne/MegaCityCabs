import React, { useState } from "react";
import { assets } from "../../assets/assets";
import SearchBar from "./SearchBar";
import VehicleResult from "./VehicleResult";


const Hero = () => {
  const [vehicleSearchResult,setVehicleSearchResult ] = useState([]);
  const handleSearchResult = (result) => {
    setVehicleSearchResult(result);
  }
  return (
    <div
    className="relative w-full h-[75vh] flex flex-col items-center justify-center text-white text-center px-6 md:px-16 "
    style={{
      backgroundImage: `url(${assets.bg_23})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <h1 className="text-4xl md:text-5xl font-bold max-w-2xl text-green-500 ">
      The car is waiting for you
    </h1>
    
    {/* Add margin to push the text down */}
    <p className="mt-4 text-lg max-w-lg bg-black/50 px-4 py-2 rounded-md">
      Short-term rental • Long-term rental • Exclusive transport
    </p>
  
    {/* Search Bar: Ensure it doesn't overlap */}
    <div className="mt-8 w-full max-w-3xl relative z-10">
     
   
    </div>
  </div>
  

  );
};

export default Hero;
