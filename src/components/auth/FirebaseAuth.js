import * as firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import {config} from './firebase-config'

const FirebaseAuth = firebase.initializeApp(config);
const Firestore = FirebaseAuth.firestore();

const addLog = (data, uid, successCallback, failureCallback) => {
        var collection = Firestore.collection('users');
        if(typeof(uid) === 'string' && uid.length > 0){

        }else{
            uid = FirebaseAuth.auth().currentUser.uid;
        }
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