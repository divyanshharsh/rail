import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select'; // Import react-select for autocomplete
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration (adjust the path as necessary)
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

function AppreciationForm() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [mode, setMode] = useState('');
  const [trainNumber, setTrainNumber] = useState('');
  const [stationName, setStationName] = useState('');
  const [positiveAspects, setPositiveAspects] = useState('');
  const [experience, setExperience] = useState('');
  const [rating, setRating] = useState('');
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
        const docRef = await addDoc(collection(db, 'appreciations'), {
          mobileNumber,
          mode,
          trainNumber,
          stationName,
          positiveAspects,
          experience,
          rating,
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Appreciation submitted successfully!");
        // Navigate to a confirmation or home page
        navigate('/');
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting appreciation.");
      }
    } else {
      alert('Please verify OTP before submitting the form.');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Appreciation Form</h1>
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

        {/* Mode of Appreciation */}
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

        {/* Positive Aspects */}
        <Form.Group controlId="formPositiveAspects" className="mt-4">
          <Form.Label>Positive Aspects</Form.Label>
          <Form.Control 
            as="select" 
            value={positiveAspects} 
            onChange={(e) => setPositiveAspects(e.target.value)} 
            required
          >
            <option value="">Select Positive Aspects</option>
            <option value="Service">Service</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Timeliness">Timeliness</option>
            <option value="Staff Behavior">Staff Behavior</option>
            {/* Add more options as needed */}
          </Form.Control>
        </Form.Group>

        {/* Experience */}
        <Form.Group controlId="formExperience" className="mt-4">
          <Form.Label>Experience</Form.Label>
          <Form.Control 
            as="textarea" 
            rows="4" 
            value={experience} 
            onChange={(e) => setExperience(e.target.value)} 
            placeholder="Describe your experience" 
            required 
          />
        </Form.Group>

        {/* Feedback Rating */}
        <Form.Group controlId="formRating" className="mt-4">
          <Form.Label>Feedback Rating</Form.Label>
          <Form.Control 
            as="select" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </Form.Control>
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

export default AppreciationForm;
