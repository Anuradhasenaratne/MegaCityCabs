// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ApiService from '../../service/ApiService';

// const EditVehiclePage = () => {
//     const { id } = useParams(); // Extract vehicleId from URL params
//     const navigate = useNavigate();
//     const [vehicleDetails, setVehicleDetails] = useState({
//         vehiclePhotoUrl: '',
//         vehicleType: '',
//         vehiclePrice: '',
//         vehicleDescription: '',
//         vehicleSeats: '',
//         vehicleTransmission: '',
//     });
//     const [file, setFile] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');

//     // Fetch vehicle details from API when component mounts
//     useEffect(() => {
//         const fetchVehicleDetails = async () => {
//             try {
//                 const response = await ApiService.getVehicleById(id);
//                 setVehicleDetails({
//                     vehiclePhotoUrl: response.vehicle.vehiclePhotoUrl,
//                     vehicleType: response.vehicle.vehicleType,
//                     vehiclePrice: response.vehicle.vehiclePrice,
//                     vehicleDescription: response.vehicle.vehicleDescription,
//                     vehicleSeats: response.vehicle.vehicleSeats,
//                     vehicleTransmission: response.vehicle.vehicleTransmission,
//                 });
//             } catch (error) {
//                 setError(error.response?.data?.message || error.message);
//             }
//         };
//         fetchVehicleDetails();
//     }, [id]);

//     // Handle input field changes for text fields
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setVehicleDetails(prevState => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     // Handle file input changes for vehicle photo
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

//     // Update vehicle details in the database
//     const handleUpdate = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('vehicleType', vehicleDetails.vehicleType);
//             formData.append('vehiclePrice', vehicleDetails.vehiclePrice);
//             formData.append('vehicleDescription', vehicleDetails.vehicleDescription);
//             formData.append('vehicleSeats', vehicleDetails.vehicleSeats);
//             formData.append('vehicleTransmission', vehicleDetails.vehicleTransmission);

//             if (file) {
//                 formData.append('photo', file);
//             }

//             const result = await ApiService.updateVehicle(id, formData);
//             if (result.statusCode === 200) {
//                 setSuccess('Vehicle updated successfully.');

//                 setTimeout(() => {
//                     setSuccess('');
//                     navigate('/admin/manage-vehicles');
//                 }, 3000);
//             }
//             setTimeout(() => setSuccess(''), 5000);
//         } catch (error) {
//             setError(error.response?.data?.message || error.message);
//             setTimeout(() => setError(''), 5000);
//         }
//     };

//     // Delete vehicle from the database
//     const handleDelete = async () => {
//         if (window.confirm('Do you want to delete this vehicle?')) {
//             try {
//                 const result = await ApiService.deleteVehicle(id);
//                 if (result.statusCode === 200) {
//                     setSuccess('Vehicle deleted successfully.');

//                     setTimeout(() => {
//                         setSuccess('');
//                         navigate('/admin/manage-vehicles');
//                     }, 3000);
//                 }
//             } catch (error) {
//                 setError(error.response?.data?.message || error.message);
//                 setTimeout(() => setError(''), 5000);
//             }
//         }
//     };

//     return (
//         <div className="edit-vehicle-container">
            
//             <h2>Edit Vehicle</h2>
//             <h2><span>vehicel id :</span>{ id}</h2>
//             {error && <p className="error-message">{error}</p>}
//             {success && <p className="success-message">{success}</p>}
//             <div className="edit-vehicle-form">
//                 {/* Vehicle Photo Preview or Default Image */}
//                 <div className="form-group">
//                     {preview ? (
//                         <img src={preview} alt="Vehicle Preview" className="vehicle-photo-preview" />
//                     ) : (
//                         vehicleDetails.vehiclePhotoUrl && (
//                             <img src={vehicleDetails.vehiclePhotoUrl} alt="Vehicle" className="vehicle-photo" />
//                         )
//                     )}
//                     <input
//                         type="file"
//                         name="vehiclePhoto"
//                         onChange={handleFileChange}
//                     />
//                 </div>
//                 {/* Vehicle Type Input Field */}
//                 <div className="form-group">
//                     <label>Vehicle Type</label>
//                     <input
//                         type="text"
//                         name="vehicleType"
//                         value={vehicleDetails.vehicleType}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Vehicle Price Input Field */}
//                 <div className="form-group">
//                     <label>Vehicle Price</label>
//                     <input
//                         type="text"
//                         name="vehiclePrice"
//                         value={vehicleDetails.vehiclePrice}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Vehicle Description Textarea */}
//                 <div className="form-group">
//                     <label>Vehicle Model</label>
//                     <textarea
//                         name="vehicleSeats"
//                         value={vehicleDetails.vehicleSeats}
                       
//                         onChange={handleChange}
//                     ></textarea>
//                 </div>

//                 {/* Vehicle Seats Input Field */}
//                 <div className="form-group">
//                     <label>Vehicle Seats</label>
//                     <input
//                         type="number"
//                         name="vehicleDescription"
//                         value={vehicleDetails.vehicleDescription}
                       
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Vehicle Transmission Input Field */}
//                 <div className="form-group">
//                     <label>Vehicle Transmission</label>
//                     <input
//                         type="text"
//                         name="vehicleTransmission"
//                         value={vehicleDetails.vehicleTransmission}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 {/* Update and Delete Buttons */}
//                 <button className="update-button" onClick={handleUpdate}>Update Vehicle</button>
//                 <button className="delete-button" onClick={handleDelete}>Delete Vehicle</button>
//             </div>
//         </div>
//     );
// };

// export default EditVehiclePage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { FaTrash, FaSave, FaArrowLeft } from "react-icons/fa";

const EditVehiclePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicleDetails, setVehicleDetails] = useState({
    vehiclePhotoUrl: "",
    vehicleType: "",
    vehiclePrice: "",
    vehicleDescription: "",
    vehicleSeats: "",
    vehicleTransmission: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await ApiService.getVehicleById(id);
        setVehicleDetails(response.vehicle);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    };
    fetchVehicleDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      Object.keys(vehicleDetails).forEach((key) => {
        formData.append(key, vehicleDetails[key]);
      });
      if (file) formData.append("photo", file);
      await ApiService.updateVehicle(id, formData);
      setSuccess("Vehicle updated successfully!");
      setTimeout(() => navigate("/admin/manage-vehicles"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this vehicle?")) {
      try {
        await ApiService.deleteVehicle(id);
        navigate("/admin/manage-vehicles");
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
          Edit Vehicle
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="space-y-4">
          <div className="flex flex-col items-center">
            {preview ? (
              <img src={preview} alt="Preview" className="h-40 w-full object-cover rounded-md shadow-md" />
            ) : vehicleDetails.vehiclePhotoUrl ? (
              <img src={vehicleDetails.vehiclePhotoUrl} alt="Vehicle" className="h-40 w-full object-cover rounded-md shadow-md" />
            ) : null}
            <input type="file" className="mt-3" onChange={handleFileChange} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="vehicleType"
              placeholder="Vehicle Type"
              className="border p-3 rounded-lg w-full"
              value={vehicleDetails.vehicleType}
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehiclePrice"
              placeholder="Price"
              className="border p-3 rounded-lg w-full"
              value={vehicleDetails.vehiclePrice}
              onChange={handleChange}
            />
          </div>

          <textarea
            name="vehicleDescription"
            placeholder="Vehicle Description"
            className="border p-3 rounded-lg w-full"
            value={vehicleDetails.vehicleDescription}
            onChange={handleChange}
          ></textarea>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="vehicleSeats"
              placeholder="Seats"
              className="border p-3 rounded-lg w-full"
              value={vehicleDetails.vehicleSeats}
              onChange={handleChange}
            />
            <input
              type="text"
              name="vehicleTransmission"
              placeholder="Transmission"
              className="border p-3 rounded-lg w-full"
              value={vehicleDetails.vehicleTransmission}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
              onClick={handleUpdate}
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
            <button
              className="flex items-center bg-red-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
              onClick={handleDelete}
            >
              <FaTrash className="mr-2" /> Delete Vehicle
            </button>
          </div>
          <button
            className="mt-4 flex items-center justify-center w-full bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 transition"
            onClick={() => navigate("/admin/manage-vehicles")}
          >
            <FaArrowLeft className="mr-2" /> Back to Vehicles
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditVehiclePage;