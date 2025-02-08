// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import ApiService from '../../service/ApiService';

// const AddVehiclePage = () => {
//     const navigate = useNavigate();
//     const [vehicleDetails, setVehicleDetails] = useState({
//         AddVehiclePage: '',
//         vehicleType: '',
//         vehiclePrice: '',
//         vehicleTransmission: '',
//         vehicleSeats: '',
//         vehicleDescription: '',

//     });
//     const [file, setFile] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [vehicleTypes, setVehicleTypes] = useState([]);
//     const [newVehicleType, setNewVehicleType] = useState(false);

//     useEffect(() => {
//         const fetchVehicleypes = async () => {
//             try {
//                 const types = await ApiService.getVehicleTypes();
//                 setVehicleTypes(types);
//             } catch (error) {
//                 console.error('Error fetching room types:', error.message);
//             }
//         };
//         fetchVehicleypes();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setVehicleDetails(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleVehicleTypeChange = (e) => {
//         if (e.target.value === 'new') {
//             setVehicleTypes(true);
//             setVehicleDetails(prevState => ({ ...prevState, vehicleType: '' }));
//         } else {
//             setNewVehicleType(false);
//             setVehicleDetails(prevState => ({ ...prevState, vehicleType: e.target.value }));
//         }
//     };

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         if (selectedFile) {
//             setFile(selectedFile);
//             setPreview(URL.createObjectURL(selectedFile));
//         } else {
//             setFile(null);
//             setPreview(null);
//         }
//     };

//     const addVehicle = async () => {
//         if (!vehicleDetails.vehicleType || !vehicleDetails.vehiclePrice || !vehicleDetails.vehicleDescription || !vehicleDetails.vehicleSeats || !vehicleDetails.vehicleTransmission) {
//             setError('All Vehicle details must be provided.');
//             setTimeout(() => setError(''), 5000);
//             return;
//         }

//         if (!window.confirm('Do you want to add this room?')) {
//             return
//         }

//         try {
//             // AddVehiclePage: '',
//             // vehicleType: '',
//             // vehiclePrice: '',
//             // vehicleTransmission: '',
//             // vehicleSeats: '',
//             // vehicleDescription: '',
//             const formData = new FormData();
//             formData.append('vehicleType', vehicleDetails.vehicleType);
//             formData.append('vehiclePrice', vehicleDetails.vehiclePrice);
//             formData.append('vehicleTransmission', vehicleDetails.vehicleTransmission);
//             formData.append('vehicleSeats', vehicleDetails.vehicleSeats);
//             formData.append('vehicleDescription', vehicleDetails.vehicleDescription);

//             if (file) {
//                 formData.append('photo', file);
//             }

//             const result = await ApiService.addVehicle(formData);
//             if (result.statusCode === 200) {
//                 setSuccess('Room Added successfully.');

//                 setTimeout(() => {
//                     setSuccess('');
//                     navigate('/admin/manage-rooms');
//                 }, 3000);
//             }
//         } catch (error) {
//             setError(error.response?.data?.message || error.message);
//             setTimeout(() => setError(''), 5000);
//         }
//     };

//     return (
//         <div className="add-room-page">
//             <h2>Add New Vehicle</h2>
//             {error && <p className="error-message">{error}</p>}
//             {success && <p className="success-message">{success}</p>}
//             <div className="edit-room-form">
//                 <div className="form-group">
//                     {preview && (
//                         <img src={preview} alt="Room Preview" className="room-photo-preview" />
//                     )}
//                     <input
//                         type="file"
//                         name="roomPhoto"
//                         onChange={handleFileChange}
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Room Type</label>
//                     <select value={vehicleDetails.vehicleType} onChange={handleVehicleTypeChange}>
//                         <option value="">Select a room type</option>
//                         {vehicleTypes.map(type => (
//                             <option key={type} value={type}>{type}</option>
//                         ))}
//                         <option value="new">Other (please specify)</option>
//                     </select>
//                     {vehicleTypes && (
//                         <input
//                             type="text"
//                             name="vehicleType"
//                             placeholder="Enter new Vehicle Type"
//                             value={vehicleDetails.vehicleType}
//                             onChange={handleChange}
//                         />
//                     )}
//                 </div>
//                 <div className="form-group">
//                     <label>Vehicle Price</label>
//                     <input
//                         type="text"
//                         name="vehiclePrice"
//                         value={vehicleDetails.vehiclePrice}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label>Vehicle Description</label>
//                     <textarea
//                         name="vehicleDescription"
//                         value={vehicleDetails.vehicleDescription}
//                         onChange={handleChange}
//                     ></textarea>
//                 </div>
//                 <div className="form-group">
//                     <label>Vehicle Seats</label>
//                     <input
//                         type="text"
//                         name="vehicleSeats"
//                         value={vehicleDetails.vehicleSeats}
//                         onChange={handleChange}
//                     />
//                     </div>
//                     <div className="form-group">
//                     <label>Vehicle Transmission</label>
//                     <input
//                         type="text"
//                         name="vehicleTransmission"
//                         value={vehicleDetails.vehicleTransmission}
//                         onChange={handleChange}/>
//                     </div>
//                 <button className="update-button" onClick={addVehicle}>Add Vehicle</button>
//             </div>
//         </div>
//     );
// };

// export default AddVehiclePage;

// // ///more

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiUpload, FiX, FiCheckCircle } from "react-icons/fi";
// import ApiService from "../../service/ApiService";

// const AddVehiclePage = () => {
//   const navigate = useNavigate();
//   const [vehicleDetails, setVehicleDetails] = useState({
//     vehicleType: "",
//     vehiclePrice: "",
//     vehicleTransmission: "Automatic",
//     vehicleSeats: "",
//     vehicleDescription: "",
//   });
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [vehicleTypes, setVehicleTypes] = useState([]);
//   const [showNewVehicleType, setShowNewVehicleType] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   useEffect(() => {
//     const fetchVehicleTypes = async () => {
//       try {
//         const types = await ApiService.getVehicleTypes();
//         setVehicleTypes(types);
//       } catch (error) {
//         console.error("Error fetching vehicle types:", error.message);
//       }
//     };
//     fetchVehicleTypes();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVehicleDetails((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleVehicleTypeChange = (e) => {
//     if (e.target.value === "new") {
//       setShowNewVehicleType(true);
//       setVehicleDetails((prev) => ({ ...prev, vehicleType: "" }));
//     } else {
//       setShowNewVehicleType(false);
//       setVehicleDetails((prev) => ({ ...prev, vehicleType: e.target.value }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       setPreview(URL.createObjectURL(selectedFile));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!vehicleDetails.vehicleType || !vehicleDetails.vehiclePrice) {
//       setMessage({ text: "Please fill all required fields", type: "error" });
//       return;
//     }

//     if (!window.confirm("Are you sure you want to add this vehicle?")) return;

//     try {
//       const formData = new FormData();
//       Object.entries(vehicleDetails).forEach(([key, value]) => {
//         formData.append(key, value);
//       });
//       if (file) formData.append("photo", file);

//       await ApiService.addVehicle(formData);
//       setMessage({ text: "Vehicle added successfully!", type: "success" });
//       setTimeout(() => navigate("/ManageVehiclePage"), 1000);
//     } catch (error) {
//       setMessage({ text: "Failed to add vehicle", type: "error" });
//     }
//   };

//   return (
//     <div className="pt-2 pb-2 ">
//       <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg ">
//         <h1 className="text-2xl font-bold mb-4">Add New Vehicle</h1>
//         {message.text && (
//           <div
//             className={`fixed top-5 left-5 flex items-center p-3 mb-4 rounded shadow-lg transition-opacity duration-500 ${
//               message.type === "error"
//                 ? "bg-red-500 text-white"
//                 : "bg-green-500 text-white"
//             }`}
//           >
//             {message.type === "error" ? (
//               <FiX className="mr-2" />
//             ) : (
//               <FiCheckCircle className="mr-2" />
//             )}
//             <span>{message.text}</span>
//           </div>
//         )}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-col items-center">
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="w-32 h-32 object-cover mb-2"
//               />
//             )}
//             <label className="cursor-pointer flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md">
//               <FiUpload className="text-gray-600" />
//               <span>Upload Image</span>
//               <input
//                 type="file"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </label>
//           </div>
//           <div>
//             <label className="block font-medium">Vehicle Type</label>
//             <select
//               className="w-full border rounded px-3 py-2"
//               value={showNewVehicleType ? "new" : vehicleDetails.vehicleType}
//               onChange={handleVehicleTypeChange}
//             >
//               <option value="">Select Type</option>
//               {vehicleTypes.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//               <option value="new">Other Type</option>
//             </select>
//             {showNewVehicleType && (
//               <input
//                 type="text"
//                 name="vehicleType"
//                 placeholder="Enter new vehicle type"
//                 className="w-full border rounded px-3 py-2 mt-2"
//                 value={vehicleDetails.vehicleType}
//                 onChange={handleChange}
//                 required
//               />
//             )}
//           </div>
//           <div>
//             <label className="block font-medium">Vehicle Model</label>
//             <textarea
//               name="vehicleDescription"
//               className="w-full border rounded px-3 py-2"
//               value={vehicleDetails.vehicleDescription}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Daily Price</label>
//             <input
//               type="number"
//               name="vehiclePrice"
//               className="w-full border rounded px-3 py-2"
//               value={vehicleDetails.vehiclePrice}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Seats</label>
//             <input
//               type="number"
//               name="vehicleSeats"
//               className="w-full border rounded px-3 py-2"
//               value={vehicleDetails.vehicleSeats}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label className="block font-medium">Transmission</label>
//             <select
//               name="vehicleTransmission"
//               className="w-full border rounded px-3 py-2"
//               value={vehicleDetails.vehicleTransmission}
//               onChange={handleChange}
//             >
//               <option value="Automatic">Automatic</option>
//               <option value="Manual">Manual</option>
//             </select>
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Add Vehicle
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddVehiclePage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX, FiCheckCircle, FiUsers, FiDollarSign } from "react-icons/fi";
import ApiService from "../../service/ApiService";

const AddVehiclePage = () => {
  const navigate = useNavigate();
  const [vehicleDetails, setVehicleDetails] = useState({
    vehicleType: "",
    vehiclePrice: "",
    vehicleTransmission: "Automatic",
    vehicleSeats: "",
    vehicleDescription: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [showNewVehicleType, setShowNewVehicleType] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      try {
        const types = await ApiService.getVehicleTypes();
        setVehicleTypes(types);
      } catch (error) {
        console.error("Error fetching vehicle types:", error.message);
      }
    };
    fetchVehicleTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleVehicleTypeChange = (e) => {
    if (e.target.value === "new") {
      setShowNewVehicleType(true);
      setVehicleDetails((prev) => ({ ...prev, vehicleType: "" }));
    } else {
      setShowNewVehicleType(false);
      setVehicleDetails((prev) => ({ ...prev, vehicleType: e.target.value }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicleDetails.vehicleType || !vehicleDetails.vehiclePrice) {
      setMessage({ text: "Please fill all required fields", type: "error" });
      return;
    }

    if (!window.confirm("Are you sure you want to add this vehicle?")) return;

    try {
      const formData = new FormData();
      Object.entries(vehicleDetails).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) formData.append("photo", file);

      await ApiService.addVehicle(formData);
      setMessage({ text: "Vehicle added successfully!", type: "success" });
      setTimeout(() => navigate("/Admin"), 1000);
    } catch (error) {
      setMessage({ text: "Failed to add vehicle", type: "error" });
    }
  };

  return (
    // <div className="pt-2 pb-2">
    //   <div className="w-full bg-white p-6 shadow-lg">
    //     <h1 className="text-2xl font-bold mb-4">Add New Vehicle</h1>
    //     {message.text && (
    //       <div
    //         className={`fixed top-5 left-5 flex items-center p-3 mb-4 rounded shadow-lg transition-opacity duration-500 ${
    //           message.type === "error" ? "bg-red-500 text-white" : "bg-green-500 text-white"
    //         }`}
    //       >
    //         {message.type === "error" ? <FiX className="mr-2" /> : <FiCheckCircle className="mr-2" />}
    //         <span>{message.text}</span>
    //       </div>
    //     )}
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       {/* Full width flex container for 3 boxes */}
    //       <div className="flex w-full space-x-4">
    //         {/* Left box for image upload */}
    //         <div className="flex flex-col items-center w-1/3 space-y-4">
    //           <div className="flex flex-col items-center">
    //             {preview ? (
    //               <img src={preview} alt="Preview" className="w-full h-64 object-cover mb-2" />
    //             ) : (
    //               <p className="text-center text-gray-500">No image uploaded</p>
    //             )}
    //             <label className="cursor-pointer flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-md">
    //               <FiUpload className="text-gray-600" />
    //               <span>Upload Image</span>
    //               <input type="file" className="hidden" onChange={handleFileChange} />
    //             </label>
    //           </div>
    //         </div>

    //         {/* Middle box for vehicle details */}
    //         <div className="flex flex-col space-y-4 w-1/3">
    //           <div>
    //             <label className="block font-medium">Vehicle Type</label>
    //             <select
    //               className="w-full border rounded px-3 py-2"
    //               value={showNewVehicleType ? "new" : vehicleDetails.vehicleType}
    //               onChange={handleVehicleTypeChange}
    //             >
    //               <option value="">Select Type</option>
    //               {vehicleTypes.map((type) => (
    //                 <option key={type} value={type}>
    //                   {type}
    //                 </option>
    //               ))}
    //               <option value="new">Other Type</option>
    //             </select>
    //             {showNewVehicleType && (
    //               <input
    //                 type="text"
    //                 name="vehicleType"
    //                 placeholder="Enter new vehicle type"
    //                 className="w-full border rounded px-3 py-2 mt-2"
    //                 value={vehicleDetails.vehicleType}
    //                 onChange={handleChange}
    //                 required
    //               />
    //             )}
    //           </div>
    //           <div>
    //             <label className="block font-medium">Daily Price</label>
    //             <input
    //               type="number"
    //               name="vehiclePrice"
    //               className="w-full border rounded px-3 py-2"
    //               value={vehicleDetails.vehiclePrice}
    //               onChange={handleChange}
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label className="block font-medium">Seats</label>
    //             <input
    //               type="number"
    //               name="vehicleSeats"
    //               className="w-full border rounded px-3 py-2"
    //               value={vehicleDetails.vehicleSeats}
    //               onChange={handleChange}
    //               required
    //             />
    //           </div>
    //           <div>
    //             <label className="block font-medium">Transmission</label>
    //             <select
    //               name="vehicleTransmission"
    //               className="w-full border rounded px-3 py-2"
    //               value={vehicleDetails.vehicleTransmission}
    //               onChange={handleChange}
    //             >
    //               <option value="Automatic">Automatic</option>
    //               <option value="Manual">Manual</option>
    //             </select>
    //           </div>
    //         </div>

    //         {/* Right box for vehicle description and button */}
    //         <div className="flex flex-col w-1/3 space-y-4">
    //           <label className="block font-medium">Vehicle Model</label>
    //           <textarea
    //             name="vehicleDescription"
    //             className="w-full border rounded px-3 py-2"
    //             value={vehicleDetails.vehicleDescription}
    //             onChange={handleChange}
    //             required
    //           />
    //           <button
    //             type="submit"
    //             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //           >
    //             Add Vehicle
    //           </button>
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-50 p-4">
  <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-100 pb-4">
        Add New Vehicle
      </h1>

      {/* Notification Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-center animate-fade-in ${
          message.type === "error" ? 
          "bg-red-50 border border-red-200 text-red-700" : 
          "bg-green-700 border border-green-200 text-white"
        }`}>
          {message.type === "error" ? 
            <FiX className="mr-2 min-w-[20px]" /> : 
            <FiCheckCircle className="mr-2 min-w-[20px]" />}
          <span>{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Image Upload Section */}
          <div className="lg:w-1/3">
            <div className="group relative h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors cursor-pointer">
              <label className="absolute inset-0 flex flex-col items-center justify-center p-4">
                {preview ? (
                  <>
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-lg transform group-hover:opacity-75 transition-opacity"
                    />
                    <span className="absolute bottom-4 bg-black/50 text-white px-4 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      Change Photo
                    </span>
                  </>
                ) : (
                  <>
                    <FiUpload className="text-3xl text-gray-400 mb-2" />
                    <p className="text-gray-600 text-center">
                      Click to upload vehicle photo<br />
                      <span className="text-sm text-gray-400">(JPEG, PNG)</span>
                    </p>
                  </>
                )}
                <input 
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Vehicle Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vehicle Type
                </label>
                <div className="space-y-2">
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={showNewVehicleType ? "new" : vehicleDetails.vehicleType}
                    onChange={handleVehicleTypeChange}
                  >
                    <option value="">Select Type</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                    <option value="new">Other Type</option>
                  </select>
                  {showNewVehicleType && (
                    <input
                      type="text"
                      name="vehicleType"
                      placeholder="Enter new vehicle type"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={vehicleDetails.vehicleType}
                      onChange={handleChange}
                      required
                    />
                  )}
                </div>
              </div>

              {/* Daily Price */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Daily Price
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="vehiclePrice"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={vehicleDetails.vehiclePrice}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Seats
                </label>
                <div className="relative">
                  <FiUsers className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="number"
                    name="vehicleSeats"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={vehicleDetails.vehicleSeats}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Transmission */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Transmission
                </label>
                <select
                  name="vehicleTransmission"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={vehicleDetails.vehicleTransmission}
                  onChange={handleChange}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>

            {/* Vehicle Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Model
              </label>
              <textarea
                name="vehicleDescription"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={vehicleDetails.vehicleDescription}
                onChange={handleChange}
                placeholder="Model Name & Describe the vehicle features..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02]"
            >
              Add Vehicle
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
  );
};

export default AddVehiclePage;
