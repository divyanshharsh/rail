// import React, { useState } from 'react';
// import { Navbar, Button, Container, Row, Col, Modal } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import LoginForm from './LoginForm';
// import SignupForm from './SignupForm';

// function NavigationBar({ currentUser }) {
//   const [showLogin, setShowLogin] = useState(false);
//   const [showSignup, setShowSignup] = useState(false);
//   const navigate = useNavigate();

//   const handleLoginClose = () => setShowLogin(false);
//   const handleLoginShow = () => setShowLogin(true);
//   const handleSignupClose = () => setShowSignup(false);
//   const handleSignupShow = () => setShowSignup(true);

//   return (
//     <>
//       <Navbar bg="white" variant="light" expand="lg" className="navbar-custom">
//         <Container>
//           <Row className="w-100 align-items-center">
//             <Col xs={12} md={4} className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
//               <div className="logo-section text-center text-md-start">
//                 <h1 className="brand-text">RailMadad</h1>
//                 <p className="brand-subtext">For Inquiry, Assistance & Grievance Redressal</p>
//               </div>
//             </Col>
//             <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
//               <Button variant="warning" className="call-button mb-2">
//                 <span className="call-icon">📞</span> 139
//               </Button>
//               <p className="call-text">for Security/Medical Assistance</p>
//             </Col>
//             <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-end align-items-center">
//               {currentUser ? (
//                 <span className="user-info me-2">Hello, {currentUser.email}</span>
//               ) : (
//                 <>
//                   <Button variant="outline-primary" className="me-2 mb-2 mb-md-0" onClick={handleLoginShow}>Log In</Button>
//                   <Button variant="outline-danger" className="me-2 mb-2 mb-md-0" onClick={handleSignupShow}>Sign Up</Button>
//                 </>
//               )}
//               <select className="form-select language-selector me-2 mb-2 mb-md-0" style={{ maxWidth: '100px' }}>
//                 <option>English</option>
//                 <option>Hindi</option>
//                 <option>Other</option>
//               </select>
//               <Button variant="outline-secondary" className="mic-button me-2 mb-2 mb-md-0">
//                 🎤
//               </Button>
//               <Button variant="outline-primary" className="accessibility-button">
//                 👤
//               </Button>
//             </Col>
//           </Row>
//         </Container>
//       </Navbar>
//       <Modal show={showLogin} onHide={handleLoginClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Log In</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <LoginForm handleClose={handleLoginClose} />
//         </Modal.Body>
//       </Modal>
//       <Modal show={showSignup} onHide={handleSignupClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Sign Up</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <SignupForm handleClose={handleSignupClose} />
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default NavigationBar;
import React from 'react';
import { Navbar, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function NavigationBar({ currentUser, onSignOut }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);
  const handleSignupClose = () => setShowSignup(false);
  const handleSignupShow = () => setShowSignup(true);

  const handleSignOut = () => {
    // Sign out logic
    auth.signOut().then(() => {
      console.log('User signed out');
      onSignOut(); // Call the parent component's sign out handler
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <>
      <Navbar bg="white" variant="light" expand="lg" className="navbar-custom">
        <Container>
          <Row className="w-100 align-items-center">
            <Col xs={12} md={4} className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 mb-md-0">
              <div className="logo-section text-center text-md-start">
                <h1 className="brand-text">RailMadad</h1>
                <p className="brand-subtext">For Inquiry, Assistance & Grievance Redressal</p>
              </div>
            </Col>
            <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
              <Button variant="warning" className="call-button mb-2">
                <span className="call-icon">📞</span> 139
              </Button>
              <p className="call-text">for Security/Medical Assistance</p>
            </Col>
            <Col xs={12} md={4} className="d-flex justify-content-center justify-content-md-end align-items-center">
              {!currentUser ? (
                <>
                  <Button variant="outline-primary" className="me-2 mb-2 mb-md-0" onClick={handleLoginShow}>Log In</Button>
                  <Button variant="outline-danger" className="me-2 mb-2 mb-md-0" onClick={handleSignupShow}>Sign Up</Button>
                </>
              ) : (
                <>
                  <span className="user-info me-2">Hello, {currentUser.displayName || currentUser.email}</span>
                  <Button variant="outline-danger" className="me-2 mb-2 mb-md-0" onClick={handleSignOut}>Sign Out</Button>
                </>
              )}
              <select className="form-select language-selector me-2 mb-2 mb-md-0" style={{ maxWidth: '100px' }}>
                <option>English</option>
                <option>Hindi</option>
                <option>Other</option>
              </select>
              <Button variant="outline-secondary" className="mic-button me-2 mb-2 mb-md-0">
                🎤
              </Button>
              <Button variant="outline-primary" className="accessibility-button">
                👤
              </Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Modal show={showLogin} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm handleClose={handleLoginClose} />
        </Modal.Body>
      </Modal>
      <Modal show={showSignup} onHide={handleSignupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignupForm handleClose={handleSignupClose} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavigationBar;
