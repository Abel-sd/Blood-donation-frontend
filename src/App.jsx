// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css"; // Import the CSS file
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Donate from "./components/Donate";
import Login from "./components/Login";
import Register from "./components/Register";
import DonorList from "./components/DonorList";
import AddDonor from "./components/AddDonor";
import AppointmentList from "./components/AppointmentList";
import ScheduleAppointment from "./components/ScheduleAppointment";
import FeedbackForm from "./components/FeedbackForm";
import BloodInventory from "./components/BloodInventory";
import DonationEvents from "./components/DonationEvents";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />

          <Route path="/donors" element={<DonorList />} />
          <Route path="/add-donor" element={<AddDonor />} />
          <Route path="/appointments" element={<AppointmentList />} />
          <Route
            path="/schedule-appointment"
            element={<ScheduleAppointment />}
          />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/blood-inventory" element={<BloodInventory />} />
          <Route path="/donation-events" element={<DonationEvents />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
