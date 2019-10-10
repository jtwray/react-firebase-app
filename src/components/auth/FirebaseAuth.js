import * as firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import {config} from './firebase-config'

const FirebaseAuth = firebase.initializeApp(config);
const Firestore = FirebaseAuth.firestore();

const addLog = (uid, data, successCallback, failureCallback) => {
        var collection = Firestore.collection('users');
        collection.doc(uid)
            .collection('activities').doc(''+(new Date().getTime())).set(data)
            .then(function(){
                if(typeof(successCallback) !== 'undefined'){
                    successCallback();
                }
            }).catch(function(error){
                if(typeof(failureCallback) !== 'undefined'){
                    failureCallback(error);
                }
            });
}

export {FirebaseAuth, Firestore, addLog};