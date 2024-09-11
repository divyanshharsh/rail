import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ComplaintForm from './components/ComplaintForm';
import StationComplaintForm from './components/StationComplaintForm';
import AppreciationForm from './components/AppreciationForm';
import EnquiryForm from './components/EnquiryForm';
import TrackYourConcernForm from './components/TrackYourConcernForm';
import SignInWithGoogle from './components/SignupForm';


import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        {/* <Route path="/" element={<HO />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/complaintform" element={<ComplaintForm />} />
          <Route path="/stationcomplaint" element={<StationComplaintForm />} />
          <Route path="/appreciationform" element={<AppreciationForm />} />
          <Route path="/enquiry" element={<EnquiryForm />} />
          <Route path="/trackyourconcern" element={<TrackYourConcernForm />} />
          
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
