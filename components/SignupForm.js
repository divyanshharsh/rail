import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ handleClose }) => {
  const navigate = useNavigate();

  const handleSignUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User signed up:', user);
      // Redirect or do something after successful sign-in
      handleClose(); // Close the modal
      navigate('/'); // Redirect to home page or wherever you need
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handleSignUpWithGoogle}>Sign Up with Google</button>
    </div>
  );
};

export default SignupForm;
