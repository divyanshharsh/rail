import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase'; // Adjust this path according to your project structure
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ComplaintForm() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [journeyType, setJourneyType] = useState('');
  const [type, setType] = useState('');
  const [subType, setSubType] = useState('');
  const [pnr, setPnr] = useState('');
  const [uts, setUts] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  // Define the types and their corresponding subtypes
  const typeOptions = {
    "Train Services": ["Cleanliness", "Delayed Train", "Ticket Issues"],
    "Station Services": ["Amenities", "Cleanliness", "Overcrowding"],
    "Food Complaints": ["Quality", "Service", "Overcharging"],
    "Staff Behavior": ["Rudeness", "Non-cooperation", "Misbehavior"]
  };

  const handleSendOtp = () => {
    // Logic to send OTP (mock for now)
    setIsOtpSent(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (!isOtpSent) {
    //   alert('Please send OTP before submitting the form.');
    //   return;
    // }

    try {
      // Handle file upload
      // // let fileUrl = null;
      // if (file) {
      //   const fileRef = ref(storage, `complaints/${file.name}`); // Create a reference with a unique path
      //   await uploadBytes(fileRef, file); // Upload file
      //   fileUrl = await getDownloadURL(fileRef); // Get file URL
      // }

      // Prepare form data
      const formData = {
        mobileNumber,
        otp,
        journeyType,
        pnr,
        uts,
        type,
        subType,
        incidentDate,
        description,
        // file: fileUrl, // Store file URL
        // timestamp: new Date()
      };

      // Save form data to Firestore
      await addDoc(collection(db, 'complaints'), formData);

      // Log form data to console
      console.log('Form submitted', formData);
      alert("Form hoagya");

      // Navigate to home page
      navigate('/');
    } catch (error) {
      console.error("Error submitting complaint: ", error.message); // Log the error message
      alert('Error submitting complaint. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Train Complaint Form</h1>
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
          <Button variant="primary" onClick={handleSendOtp}>
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
              <Button variant="link" className="mt-2">Resend OTP</Button>
            </div>
          )}
        </Form.Group>

        {/* Journey Details */}
        <Form.Group controlId="formJourneyType" className="mt-4">
          <Form.Label>Journey Details</Form.Label>
          <Form.Control 
            as="select" 
            onChange={(e) => setJourneyType(e.target.value)} 
            required
          >
            <option value="">Select Journey Type</option>
            <option value="pnr">PNR</option>
            <option value="uts">UTS</option>
          </Form.Control>
        </Form.Group>

        {journeyType === 'pnr' && (
          <Form.Group controlId="formPnr" className="mt-3">
            <Form.Label>Enter PNR</Form.Label>
            <Form.Control 
              type="text" 
              value={pnr} 
              onChange={(e) => setPnr(e.target.value)} 
              placeholder="Enter PNR" 
              required 
            />
          </Form.Group>
        )}

        {journeyType === 'uts' && (
          <Form.Group controlId="formUts" className="mt-3">
            <Form.Label>Enter UTS No and Train No</Form.Label>
            <Form.Control 
              type="text" 
              value={uts} 
              onChange={(e) => setUts(e.target.value)} 
              placeholder="Enter UTS No and Train No" 
              required 
            />
          </Form.Group>
        )}

        {/* Complaint Type */}
        <Form.Group controlId="formComplaintType" className="mt-4">
          <Form.Label>Complaint Type</Form.Label>
          <Form.Control 
            as="select" 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            required
          >
            <option value="">Select Complaint Type</option>
            {Object.keys(typeOptions).map((typeOption, index) => (
              <option key={index} value={typeOption}>{typeOption}</option>
            ))}
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
              {typeOptions[type].map((subTypeOption, index) => (
                <option key={index} value={subTypeOption}>{subTypeOption}</option>
              ))}
            </Form.Control>
          </Form.Group>
        )}

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
          <Button variant="primary" type="submit" disabled={!isOtpSent}>
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ComplaintForm;

// // src/components/SimpleForm.js
// import React, { useState } from 'react';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '../firebase';

// function SimpleForm() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Add a new document to Firestore
//       const docRef = await addDoc(collection(db, 'users'), {
//         name,
//         email
//       });
//       console.log("Document written with ID: ", docRef.id);
//       alert("Data submitted successfully!");
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       alert("Error submitting data.");
//     }
//   };

//   return (
//     <div>
//       <h2>Submit User Data</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default SimpleForm;
