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
          <Route path="manage-venues" element={<ManageVenues />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
