import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../service/ApiService';

const EditProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile();
                setUser(response.user);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserProfile();
    }, []);

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        try {
            await ApiService.deleteUser(user.id);
            navigate('/signup');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Profile</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {user ? (
                    <div className="space-y-6">
                        {/* User Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold">Name:</label>
                                <p className="text-gray-600">{user.name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">Email:</label>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">Phone Number:</label>
                                <p className="text-gray-600">{user.phone}</p>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold">NIC:</label>
                                <p className="text-gray-600">{user.nic}</p>
                            </div>
                        </div>

                        {/* Delete Profile Button */}
                        <div className="flex justify-center">
                            <button
                                onClick={handleDeleteProfile}
                                className="mt-6 bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                            >
                                Delete Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500">Loading user data...</div>
                )}
            </div>
        </div>
    );
};

export default EditProfilePage;
