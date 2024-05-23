import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/home/Home";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Profile from "./components/pages/profile/Profile";
import EditProfile from "./components/pages/profile/editProfile/EditProfile";
import Venues from "./components/pages/venues/Venues";
import VenueDetails from "./components/pages/venuedetails/VenueDetails";
import ManageVenues from "./components/pages/managevenues/ManageVenues";
import CreateVenue from "./components/pages/managevenues/components/createvenue/CreateVenue";
import EditVenue from "./components/pages/managevenues/components/editvenue/EditVenue";
import BookingPage from "./components/pages/booking/BookingPage";
import UpcomingBookings from "./components/pages/customerbookings/UpcomingBookings";
import EditBooking from "./components/pages/customerbookings/editbooking/EditBooking";
import VenueBookings from "./components/pages/managevenues/components/venuebookings/VenueBookings";
import Welcome from "./components/pages/welcomepage/Welcome";
import ProfileUpdateSuccess from "./components/pages/profile/editProfile/components/profileupdatesuccess/ProfileUpdateSuccess";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/edit" element={<EditProfile />} />
          <Route
            path="/profile/:username/manage-venues"
            element={<ManageVenues />}
          />
          <Route
            path="/profile/:username/manage-venues/create"
            element={<CreateVenue />}
          />
          <Route
            path="/profile/:username/manage-venues/edit/:venueId"
            element={<EditVenue />}
          />
          <Route
            path="/profile-update-success"
            element={<ProfileUpdateSuccess />}
          />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/booking/:venueId" element={<BookingPage />} />
          <Route
            path="/profile/:username/bookings"
            element={<UpcomingBookings />}
          />
          <Route path="/edit-booking/:id" element={<EditBooking />} />
          <Route
            path="/profile/:username/manage-venues/:venueId/bookings"
            element={<VenueBookings />}
          />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
