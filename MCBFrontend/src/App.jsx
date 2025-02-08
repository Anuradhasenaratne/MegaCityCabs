import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import AllVehicle from "./component/booking_vehicle/AllVehicle";
import NavBar from "./component/common/NavBar";
import Footer from "./component/common/Footer";
import RegisterPage from "./component/auth/RegisterPage";
import LoginPage from "./component/auth/LoginPage";
import VehicleDetails from "./component/booking_vehicle/VehicleDetails";
import ProfilePage from "./component/profile/ProfilePage";
import EditProfilePage from "./component/profile/EditProfilePage";
import BookingSummery from "./component/booking_vehicle/BookingSummery";
import MyBookings from "./component/profile/MyBookings";
import { ProtectedRoute } from "./service/guard";
import Admin from "./component/admin/Admin";

import ManageBookingsPage from "./component/admin/ManageBookingsPage";
import AddVehiclePage from "./component/admin/AddVehiclePage";
import EditVehiclePage from "./component/admin/EditVehiclePage";
import EditBookingPage from "./component/admin/EditBookingPage";


import About from "./home/About";
import Contact from "./home/contact";
import UserMange from "./component/admin/UserMange";



const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AllVehicle" element={<AllVehicle />} />
        <Route path="/Registerpage" element={<RegisterPage />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/EditProfile" element={<EditProfilePage />} />
        <Route path="/BookingSummery/:bookingConfirmationCode" element={<BookingSummery />} />
        <Route path="/Mybookings" element={<MyBookings />} />
        <Route path="/VehicleDetails/:vehicleId" element={<VehicleDetails />} />
        <Route path="/profilePage" element={<ProfilePage />}/>
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/Admin" element={<Admin />} />
        
        <Route path="/ManageBookingsPage" element={<ManageBookingsPage />} />
        <Route path="/AddVehiclePage" element={<AddVehiclePage />} />
        <Route path="/EditVehiclePage/:id" element={<EditVehiclePage />} />
        <Route path="/EditBookingPage/:bookingConfirmationCode" element={<EditBookingPage />} />
       
        <Route path="/About" element={<About />} />
       
        <Route path="/contact" element={<Contact />} />
        <Route path="/UserMange" element={<UserMange />} />


       

        
        



      </Routes>
      <Footer />
    </div>
  );
};

export default App;
