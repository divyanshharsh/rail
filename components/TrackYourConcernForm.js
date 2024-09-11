import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function TrackYourConcernForm() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Reference Number:', referenceNumber);
    // Logic to handle reference number submission (e.g., API call)
    // Navigate to another page if needed
    // navigate('/some-other-page');
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Track Your Concern</h1>
      <Form onSubmit={handleSubmit}>
        {/* Reference Number Input */}
        <Form.Group controlId="formReferenceNumber">
          <Form.Label>Reference Number</Form.Label>
          <Form.Control
            type="text"
            value={referenceNumber}
            onChange={(e) => setReferenceNumber(e.target.value)}
            placeholder="Enter your reference number"
            required
          />
        </Form.Group>

        {/* Form Submit */}
        <div className="text-center mt-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default TrackYourConcernForm;
