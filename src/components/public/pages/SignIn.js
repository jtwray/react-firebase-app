import React from "react";
import { Link } from "react-router-dom";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseAuth from '../../auth/FirebaseAuth';
import * as firebase from "firebase/app";

const SignIn = () => {
  // Configure FirebaseUI.
  const uiConfig = {
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };

  return (
    <div className="SignIn">
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={FirebaseAuth.auth()} />
      <Link to="/">Home</Link>
    </div>
  );
};

export default SignIn;