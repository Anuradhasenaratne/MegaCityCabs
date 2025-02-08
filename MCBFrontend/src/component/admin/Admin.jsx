import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from '../../service/ApiService';
import { FiAirplay, FiCalendar, FiPauseCircle, FiPlus, FiTruck, FiUser, } from "react-icons/fi";

const Admin= () => {
    const [adminName, setAdminName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminName = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setAdminName(response.user.name);
            } catch (error) {
                console.error('Error fetching admin details:', error.message);
            }
        };

        fetchAdminName();
    }, []);

    return (
        // <div className="admin-page">
        //     <h1 className="welcome-message">Welcome, {adminName}</h1>
        //     <div className="admin-actions">
        //         <button className="admin-button" onClick={() => navigate('/EditVehiclePage')}>
        //             Manage Vehicles
        //         </button>
        //         <button className="admin-button" onClick={() => navigate('/ManageBookingsPage')}>
        //             Manage Bookings
        //         </button>
        //         <button className="admin-button" onClick={() => navigate('/AddVehiclePage')}>
        //            AddVehicle
        //         </button>
        //     </div>
        // </div>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 p-8">
  <div className="max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold text-white mb-8 animate-fade-in-down">
      Welcome, <span className="text-blue-400">{adminName}</span>
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      

      {/* Manage Bookings Card */}
      <button 
        onClick={() => navigate('/ManageBookingsPage')}
        className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-2"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
            <FiPauseCircle className="text-3xl text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Manage Bookings</h2>
          <p className="text-gray-300 text-center text-sm">
            Track and manage all reservations
          </p>
        </div>
      </button>

      {/* Add Vehicle Card */}
      <button 
        onClick={() => navigate('/ProfitCalucationPage')}
        className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-2"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
            <FiCalendar  className="text-3xl text-green-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">ProfitCalucationPage</h2>
          <p className="text-gray-300 text-center text-sm">
            Gather wht u Earn
          </p>
        </div>
      </button>


      {/* Add Vehicle Card */}
      <button 
        onClick={() => navigate('/AddVehiclePage')}
        className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-2"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
            <FiPlus className="text-3xl text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Add Vehicle</h2>
          <p className="text-gray-300 text-center text-sm">
            Add new vehicles to the fleet
          </p>
        </div>
      </button>
      {/* Manage Vehicles Card */}
      <button 
        onClick={() => navigate('/AllVehicle')}
        className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-2"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
            <FiAirplay className="text-3xl text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Manage Vehicles</h2>
          <p className="text-gray-300 text-center text-sm">
            View, edit, and update vehicle details
          </p>
        </div>
      </button>


      {/* User mangemant */}
      <button 
        onClick={() => navigate('/UserMange')}
        className="group bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-white/20 hover:shadow-2xl hover:-translate-y-2"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
            <FiUser className="text-3xl text-green-400" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">User managemant</h2>
          <p className="text-gray-300 text-center text-sm">
            Control all User things
          </p>
        </div>
      </button>
    </div>
  </div>
</div>
    );
}

export default Admin;
