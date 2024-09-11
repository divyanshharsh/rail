import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleClose }) => {
  const navigate = useNavigate();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User signed in:', user);
      // Redirect or do something after successful sign-in
      handleClose(); // Close the modal
      navigate('/'); // Redirect to home page or wherever you need
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <button onClick={handleSignInWithGoogle}>Log In with Google</button>
    </div>
  );
};

export default LoginForm;
