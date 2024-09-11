import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TrainIcon from '@mui/icons-material/Train';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import './Home.css'; // Custom styles

import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Home() {
  const navigate = useNavigate(); // Initialize navigate hook

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Rail Madad</h1>
      <p>Report issues related to train services, stations, or provide suggestions for improvement.</p>

      <Row className="mt-4">
        {/* Train Complaints */}
        <Col md={4} className="mb-4">
          <Card className="custom-card shadow-lg" onClick={() => navigate('/complaintform')}>
            <Card.Body>
              <TrainIcon style={{ fontSize: 80, color: '#007bff' }} />
              <Card.Title>Train Complaints</Card.Title>
              <Card.Text>Report issues related to train services.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Station Complaints */}
        <Col md={4} className="mb-4">
          <Card className="custom-card shadow-lg" onClick={() => navigate('/stationcomplaint')}>
            <Card.Body>
              <LocationCityIcon style={{ fontSize: 80, color: '#28a745' }} />
              <Card.Title>Station Complaints</Card.Title>
              <Card.Text>Report issues related to station services.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Appreciation/Rail Anubhav */}
        <Col md={4} className="mb-4">
          <Card className="custom-card shadow-lg" onClick={() => navigate('/appreciationform')}>
            <Card.Body>
              <ThumbUpIcon style={{ fontSize: 80, color: '#17a2b8' }} />
              <Card.Title>Appreciation / Rail Anubhav</Card.Title>
              <Card.Text>Share your positive experiences.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Enquiry */}
        <Col md={4} className="mb-4">
          <Card className="custom-card shadow-lg" onClick={() => navigate('/enquiry')}>
            <Card.Body>
              <HelpOutlineIcon style={{ fontSize: 80, color: '#ffc107' }} />
              <Card.Title>Enquiry</Card.Title>
              <Card.Text>Get answers to your queries.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Track Your Concern */}
        <Col md={4} className="mb-4">
          <Card className="custom-card shadow-lg" onClick={() => navigate('/trackyourconcern')}>
            <Card.Body>
              <TrackChangesIcon style={{ fontSize: 80, color: '#dc3545' }} />
              <Card.Title>Track Your Concern</Card.Title>
              <Card.Text>Check the status of your complaint.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Suggestions */}
        <Col md={4} className="mb-4">
          <Card className="custom-card shadow-lg">
            <Card.Body>
              <LightbulbIcon style={{ fontSize: 80, color: '#6f42c1' }} />
              <Card.Title>Suggestions</Card.Title>
              <Card.Text>Provide suggestions for improvement.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
