import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AllVehicle" element={<AllVehicle />} />
        <Route path="/Registerpage" element={<RegisterPage/>} />
          <Route path="/LoginPage" element={<LoginPage/>} />
          <Route path="/VehicleDetails/:vehicleId" element={<VehicleDetails />} />
          <Route path="/profilePage" element={<ProfilePage/>} />
          <Route path="/EditProfile" element={<EditProfilePage/>} />
          <Route path="/BookingSummery/:confirmationCode" element={<BookingSummery />} />



      </Routes>
      <Footer />
    </div>
  );
};

export default App;
