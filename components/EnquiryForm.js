import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Select from 'react-select'; // Import react-select for autocomplete
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// Mock list of commodities (replace this with API data)
const commodityOptions = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Food', label: 'Food' },
  // Add more commodities as needed
];

// List of popular Indian Railway stations (for demo purposes)
const stationOptions = [
  { value: 'NDLS', label: 'New Delhi (NDLS)' },
  { value: 'BOM', label: 'Mumbai (BOM)' },
  { value: 'HWH', label: 'Howrah (HWH)' },
  { value: 'MAS', label: 'Chennai Egmore (MAS)' },
  { value: 'BLR', label: 'Bangalore (BLR)' },
  { value: 'HYB', label: 'Hyderabad (HYB)' },
  { value: 'PUNE', label: 'Pune (PUNE)' },
  { value: 'AGC', label: 'Agra Cantt (AGC)' },
  { value: 'JMP', label: 'Jamshedpur (JMP)' },
  { value: 'GKP', label: 'Gorakhpur (GKP)' },
  { value: 'RJPB', label: 'Rajendra Nagar (RJPB)' },
  { value: 'PNBE', label: 'Patna (PNBE)' },
  { value: 'SRC', label: 'Santragachi (SRC)' },
  { value: 'SDAH', label: 'Sealdah (SDAH)' },
  { value: 'CSTM', label: 'Mumbai CST (CSTM)' },
  // Add more stations as needed
];

function EnquiryForm() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [type, setType] = useState('');
  const [subType, setSubType] = useState('');
  const [fromStation, setFromStation] = useState('');
  const [toStation, setToStation] = useState('');
  const [approxVolume, setApproxVolume] = useState('');
  const [commodity, setCommodity] = useState('');
  const [file, setFile] = useState(null);
  const [inquiryDate, setInquiryDate] = useState('');
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
        const docRef = await addDoc(collection(db, 'enquiries'), {
          mobileNumber,
          type,
          subType,
          fromStation,
          toStation,
          approxVolume,
          commodity,
          file: file ? file.name : null, // Store file name or URL if needed
          inquiryDate
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Enquiry submitted successfully!");
        // Navigate to home page
        navigate('/');
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting enquiry.");
      }
    } else {
      alert('Please verify OTP before submitting the form.');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Enquiry Form</h1>
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

        {/* Type of Enquiry */}
        <Form.Group controlId="formType" className="mt-4">
          <Form.Label>Type of Enquiry</Form.Label>
          <Form.Control 
            as="select" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required
          >
            <option value="">Select Type</option>
            <option value="Luggage/Parcel">Luggage/Parcel</option>
            <option value="Goods">Goods</option>
          </Form.Control>
        </Form.Group>

        {/* Sub-Type based on selected type */}
        {type && (
          <Form.Group controlId="formSubType" className="mt-3">
            <Form.Label>Sub-Type</Form.Label>
            <Form.Control 
              as="select" 
              value={subType} 
              onChange={(e) => setSubType(e.target.value)} 
              required
            >
              <option value="">Select Sub-Type</option>
              {type === 'Luggage/Parcel' && (
                <option value="Parcel Facilitation">Parcel Facilitation</option>
              )}
              {/* Add more sub-types for Goods if needed */}
            </Form.Control>
          </Form.Group>
        )}

        {/* Inquiry Details */}
        {type && (
          <>
            <Form.Group controlId="formFromStation" className="mt-4">
              <Form.Label>From Station</Form.Label>
              <Form.Control 
                as="select"
                value={fromStation}
                onChange={(e) => setFromStation(e.target.value)}
                required
              >
                <option value="">Select From Station</option>
                {stationOptions.map(station => (
                  <option key={station.value} value={station.value}>
                    {station.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formToStation" className="mt-4">
              <Form.Label>To Station</Form.Label>
              <Form.Control 
                as="select"
                value={toStation}
                onChange={(e) => setToStation(e.target.value)}
                required
              >
                <option value="">Select To Station</option>
                {stationOptions.map(station => (
                  <option key={station.value} value={station.value}>
                    {station.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formApproxVolume" className="mt-4">
              <Form.Label>Approx Volume</Form.Label>
              <Form.Control 
                type="text" 
                value={approxVolume} 
                onChange={(e) => setApproxVolume(e.target.value)} 
                placeholder="Enter approximate volume" 
                required 
              />
            </Form.Group>

            {type === 'Goods' && (
              <Form.Group controlId="formCommodity" className="mt-4">
                <Form.Label>Select Commodity</Form.Label>
                <Select
                  options={commodityOptions}
                  value={commodityOptions.find(option => option.value === commodity)}
                  onChange={(option) => setCommodity(option ? option.value : '')}
                  placeholder="Select a commodity..."
                  required
                />
              </Form.Group>
            )}

            <Form.Group controlId="formInquiryDate" className="mt-4">
              <Form.Label>Inquiry Date</Form.Label>
              <Form.Control 
                type="date" 
                value={inquiryDate} 
                onChange={(e) => setInquiryDate(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formFileUpload" className="mt-4">
              <Form.Label>Upload File (Image/Video)</Form.Label>
              <Form.Control 
                type="file" 
                accept="image/*,video/*" 
                onChange={(e) => setFile(e.target.files[0])} 
              />
            </Form.Group>
          </>
        )}

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

export default EnquiryForm;
