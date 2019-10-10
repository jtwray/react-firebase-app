import React from "react";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { FirebaseAuth, addLog } from '../../auth/FirebaseAuth';
import * as firebase from "firebase/app";

const SignIn = () => {
  // Configure FirebaseUI.
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        addLog(authResult.user.uid,
        {
          'action':'signed in',
          'timnestamp':(new Date()),
          'user-agent':navigator.userAgent
        },function(){
          document.location.href = '/';
        },function(error){
          document.location.href = '/';
        });
        /*
        var collection = Firestore.collection('users');
        collection.doc(authResult.user.uid).collection('activities').doc(''+(new Date().getTime())).set({
          'action':'sign-in',
          'timnestamp':(new Date()),
          'user-agent':navigator.userAgent
        }).then(function(){
          document.location.href = '/';
        }).catch(function(error){
          document.location.href = '/';
        })
        */
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