import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import FirebaseAuth from '../../auth/FirebaseAuth';
import * as firebase from "firebase/app";

const SignIn = ({ history }) => {
  // Configure FirebaseUI.
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        /*
        // call api to set httponly cookie
        FirebaseAuth.auth().currentUser.getIdToken().then(function (token){
          console.log(token);
        });
        */
        // redirect to homepage
        history.push('/');
        return false;
      }
    },
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
    </div>
  );
};

export default SignIn;