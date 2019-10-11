import * as firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import {config} from './firebase-config'

const FirebaseAuth = firebase.initializeApp(config);
const Firestore = FirebaseAuth.firestore();

const addLog = (action, uid, successCallback, failureCallback) => {
        var dt = new Date();
        var data = {
            'action': action,
            'timestamp': (dt.getTime()),
            'time': dt,
            'user-agent': navigator.userAgent
        }

        if(typeof(uid) === 'string' && uid.length > 0){

        }else{
            uid = FirebaseAuth.auth().currentUser.uid;
        }

       var userDocRef = Firestore.collection('users').doc(uid);
       userDocRef.set({'activityCount':firebase.firestore.FieldValue.increment(1)},{merge: true}).then(function(){
            userDocRef.collection('activities').doc(''+dt.getTime()).set(data)
            .then(function(){
                 if(typeof(successCallback) !== 'undefined'){
                     successCallback();
                 }
            }).catch(function(error){
                userDocRef.set({'activityCount':firebase.firestore.FieldValue.increment(-1)},{merge: true});
                 if(typeof(failureCallback) !== 'undefined'){
                     failureCallback(error);
                 }
            });
       }).catch(function(error){
            if(typeof(failureCallback) !== 'undefined'){
                failureCallback(error);
            }
       });
}

export {FirebaseAuth, Firestore, addLog};