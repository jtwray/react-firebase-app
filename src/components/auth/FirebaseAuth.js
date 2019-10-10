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
        var collection = Firestore.collection('users');
        if(typeof(uid) === 'string' && uid.length > 0){

        }else{
            uid = FirebaseAuth.auth().currentUser.uid;
        }
        collection.doc(uid)
            .collection('activities').doc(''+dt.getTime()).set(data)
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