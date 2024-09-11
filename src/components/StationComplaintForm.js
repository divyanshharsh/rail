import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select'; // Import react-select for autocomplete
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Mock list of stations (replace this with API data)
const stationOptions = [
  { value: 'New Delhi', label: 'New Delhi' },
  { value: 'Mumbai', label: 'Mumbai' },
  { value: 'Delhi Cantt', label: 'Delhi Cantt' },
  { value: 'Chennai', label: 'Chennai' },
  // Add more stations as needed
];

// Mock list of train numbers (replace this with API data)
const trainOptions = [
  { value: '12345', label: '12345' },
  { value: '67890', label: '67890' },
  { value: '11223', label: '11223' },
  { value: '44556', label: '44556' },
  // Add more train numbers as needed
];

function StationComplaintForm() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [type, setType] = useState('');
  const [subType, setSubType] = useState('');
  const [stationName, setStationName] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [platformNumber, setPlatformNumber] = useState('');
  const [pnrUts, setPnrUts] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState(''); // Added mode state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSendOtp = () => {
    // Logic to send OTP (mock for now)
    setIsOtpSent(true);
  };

  const handleVerifyOtp = () => {
    // Logic to verify OTP (mock for now)
    if (otp === '1234') {
      setIsOtpVerified(true);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isOtpVerified) {
      try {
        // Add a new document to Firestore
        const docRef = await addDoc(collection(db, 'stationcomplaint'), {
          mobileNumber,
          type,
          subType,
          stationName,
          trainNumber,
          platformNumber,
          pnrUts,
          incidentDate,
          file: file ? file.name : null, // Store file name or URL if needed
          description
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Complaint submitted successfully!");
        // Navigate to home page
        navigate('/');
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting complaint.");
      }
    } else {
      alert('Please verify OTP before submitting the form.');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Station Complaint Form</h1>
      <Form onSubmit={handleSubmit}>
        {/* Mobile number input */}
        <Form.Group controlId="formMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control 
            type="text" 
            value={mobileNumber} 
            onChange={(e) => setMobileNumber(e.target.value)} 
            placeholder="Enter your mobile number" 
            required 
          />
        </Form.Group>

        {/* OTP Verification */}
        <Form.Group className="mt-3">
          <Button variant="primary" onClick={handleSendOtp} disabled={isOtpSent}>
            Send OTP
          </Button>
          {isOtpSent && (
            <div className="mt-3">
              <Form.Group controlId="formOtp">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control 
                  type="text" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  placeholder="Enter OTP" 
                  required 
                />
              </Form.Group>
              <Button variant="primary" className="mt-2" onClick={handleVerifyOtp}>
                Verify OTP
              </Button>
              <Button variant="link" className="mt-2" onClick={handleSendOtp}>
                Resend OTP
              </Button>
            </div>
          )}
        </Form.Group>

        {/* Mode of Complaint */}
        <Form.Group controlId="formMode" className="mt-4">
          <Form.Label>Mode</Form.Label>
          <Form.Control 
            as="select" 
            value={mode} 
            onChange={(e) => setMode(e.target.value)} 
            required
          >
            <option value="">Select Mode</option>
            <option value="Train">Train</option>
            <option value="Station">Station</option>
          </Form.Control>
        </Form.Group>

        {/* Train Number with autocomplete */}
        {mode === 'Train' && (
          <Form.Group controlId="formTrainNumber" className="mt-4">
            <Form.Label>Train Number</Form.Label>
            <Select
              options={trainOptions}
              value={trainOptions.find(option => option.value === trainNumber)}
              onChange={(option) => setTrainNumber(option ? option.value : '')}
              placeholder="Search for a train number..."
              required
            />
          </Form.Group>
        )}

        {/* Station Name with autocomplete */}
        {mode === 'Station' && (
          <Form.Group controlId="formStationName" className="mt-4">
            <Form.Label>Station Name</Form.Label>
            <Select
              options={stationOptions}
              value={stationOptions.find(option => option.value === stationName)}
              onChange={(option) => setStationName(option ? option.value : '')}
              placeholder="Search for a station..."
              required
            />
          </Form.Group>
        )}

        {/* Platform Number */}
        <Form.Group controlId="formPlatformNumber" className="mt-4">
          <Form.Label>Platform Number</Form.Label>
          <Form.Control 
            type="text" 
            value={platformNumber} 
            onChange={(e) => setPlatformNumber(e.target.value)} 
            placeholder="Enter platform number" 
            required 
          />
        </Form.Group>

        {/* PNR/UTS No */}
        <Form.Group controlId="formPnrUts" className="mt-4">
          <Form.Label>PNR/UTS No</Form.Label>
          <Form.Control 
            type="text" 
            value={pnrUts} 
            onChange={(e) => setPnrUts(e.target.value)} 
            placeholder="Enter PNR/UTS No" 
            required 
          />
        </Form.Group>

        {/* Incident Date */}
        <Form.Group controlId="formIncidentDate" className="mt-4">
          <Form.Label>Incident Date</Form.Label>
          <Form.Control 
            type="date" 
            value={incidentDate} 
            onChange={(e) => setIncidentDate(e.target.value)} 
            required 
          />
        </Form.Group>

        {/* Upload File */}
        <Form.Group controlId="formFileUpload" className="mt-4">
          <Form.Label>Upload File (Image/Video)</Form.Label>
          <Form.Control 
            type="file" 
            accept="image/*,video/*" 
            onChange={(e) => setFile(e.target.files[0])} 
          />
        </Form.Group>

        {/* Grievance Description */}
        <Form.Group controlId="formDescription" className="mt-4">
          <Form.Label>Grievance Description</Form.Label>
          <Form.Control 
            as="textarea" 
            rows="4" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe your grievance" 
            required 
          />
        </Form.Group>

        {/* Form submit */}
        <div className="text-center mt-4">
          <Button 
            variant="primary" 
            type="submit" 
            disabled={!isOtpVerified}
          >
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default StationComplaintForm;
