import axios from "axios";

export default class ApiService {

    static BASE_URL = "http://localhost:4040";

    static getHeader() {
        const token = localStorage.getItem("token");
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };
    }

    /*** AUTH */

    // Registers a new user
    static async registerUser(registration) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registration);
        return response.data;
    }

    // Logs in a registered user
    static async loginUser(loginDetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginDetails);
        return response.data;
    }

    /*** USERS */

    // Gets all users
    static async getAllUsers() {
        const response = await axios.get(`${this.BASE_URL}/users/all`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Gets the logged-in user profile
    static async getUserProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/get-logged-in-profile-info`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Gets a single user by ID
    static async getUser(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-by-id/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Gets bookings for a user by user ID
    static async getUserBookings(userId) {
        const response = await axios.get(`${this.BASE_URL}/users/get-user-bookings/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Deletes a user by ID
    static async deleteUser(userId) {
        const response = await axios.delete(`${this.BASE_URL}/users/delete/${userId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    /*** VEHICLE */

    // Adds a new vehicle
    static async addVehicle(formData) {
        const result = await axios.post(`${this.BASE_URL}/vehicle/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    // Gets all available vehicles
    static async getAllAvailableVehicles() {
        const result = await axios.get(`${this.BASE_URL}/vehicle/all-available-vehicles`);
        return result.data;
    }

    // Gets available vehicles by date and type
    static async getAvailableVehiclesByDateAndType(checkInDate, checkOutDate, vehicleType) {
        const formattedCheckInDate = encodeURIComponent(checkInDate);
        const formattedCheckOutDate = encodeURIComponent(checkOutDate);
        const formattedVehicleType = encodeURIComponent(vehicleType);
        
        try {
            const result = await axios.get(`${this.BASE_URL}/vehicle/available-vehicles-by-date-and-type?checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}&vehicleType=${formattedVehicleType}`);
            return result.data;
        } catch (error) {
            console.error("Search Error:", error.response?.data || error);
            throw error;
        }
    }

    // Gets all vehicle types
    static async getVehicleTypes() {
        const response = await axios.get(`${this.BASE_URL}/vehicle/types`);
        return response.data;
    }

    // Gets all vehicles
    static async getAllVehicles() {
        const result = await axios.get(`${this.BASE_URL}/vehicle/all`);
        return result.data;
    }

    // Gets a vehicle by ID
    // static async getVehicleById(vehicleId) {
    //     const result = await axios.get(`${this.BASE_URL}/vehicle/vehicle-by-id/${vehicleId}`);
    //     return result.data;
    // }
    static async getVehicleById(vehicleId) {
        try {
            const result = await axios.get(`${this.BASE_URL}/vehicle/vehicle-by-id/${vehicleId}`, {
                headers: this.getHeader()  // Include the authorization header
            });
            return result.data;  // Return vehicle data if the request is successful
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.error("Access Forbidden: You do not have permission to view this vehicle.");
            } else {
                console.error("Error fetching vehicle by ID:", error.response ? error.response.data : error.message);
            }
            throw error;  // Rethrow error to be handled by the calling function
        }
    }
    

    // Deletes a vehicle by ID
    static async deleteVehicle(vehicleId) {
        const result = await axios.delete(`${this.BASE_URL}/vehicle/delete/${vehicleId}`, {
            headers: this.getHeader()
        });
        return result.data;
    }

    // Updates a vehicle by ID
    static async updateVehicle(vehicleId, formData) {
        const result = await axios.put(`${this.BASE_URL}/vehicle/update/${vehicleId}`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return result.data;
    }

    /*** BOOKING */

    // Books a vehicle for a user
    static async bookVehicle(vehicleId, userId, booking) {
        const response = await axios.post(`${this.BASE_URL}/bookings/book-vehicle/${vehicleId}/${userId}`, booking, {
            headers: this.getHeader()
        });
        return response.data;
    }

    // Gets all bookings
    static async getAllBookings() {
        const result = await axios.get(`${this.BASE_URL}/bookings/all`, {
            headers: this.getHeader()
        });
        return result.data;
    }

    // Gets a booking by confirmation code
    static async getBookingByConfirmationCode(bookingCode) {
        const result = await axios.get(`${this.BASE_URL}/bookings/get-by-confirmation-code/${bookingCode}`);
        return result.data;
    }

    // Cancels a booking
    static async cancelBooking(bookingId) {
        const result = await axios.delete(`${this.BASE_URL}/bookings/cancel/${bookingId}`, {
            headers: this.getHeader()
        });
        return result.data;
    }

    /*** AUTHENTICATION CHECKER */

    // Logs the user out
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    // Checks if the user is authenticated
    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    // Checks if the user is an admin
    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    // Checks if the user is a regular user
    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'USER';
    }
}
