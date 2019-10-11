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
        var add = (userDoc, data, success, failure) => {
            console.log(userDoc);
            userDoc.collection('activities').doc(''+dt.getTime()).set(data)
                .then(function(){
                    userDoc.update({
                        'activities': firebase.firestore.FieldValue.increment(1)
                    })
                    if(typeof(success) !== 'undefined'){
                        success();
                    }
                }).catch(function(error){
                    if(typeof(failure) !== 'undefined'){
                        failure(error);
                    }
                });
        }
        var collection = Firestore.collection('users');
        if(typeof(uid) === 'string' && uid.length > 0){

        }else{
            uid = FirebaseAuth.auth().currentUser.uid;
        }
        collection.doc(uid).get().then(function(doc){
            if(doc.exists){
                add(collection.doc(uid), data, successCallback, failureCallback);
            }else{
                collection.doc(uid).set({
                    'activities': 0
                }).then(function(){
                    add(collection.doc(uid), data, successCallback, failureCallback)
                }).catch(function(error){
                    if(typeof(failureCallback) !== 'undefined'){
                        failureCallback(error);
                    }
                });
            }
        }).catch(function(error){
            console.log(error);
            if(typeof(failureCallback) !== 'undefined'){
                failureCallback(error);
            }
        });
}

export {FirebaseAuth, Firestore, addLog};