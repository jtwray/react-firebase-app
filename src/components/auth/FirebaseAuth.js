import * as firebase from "firebase/app";
import "firebase/auth";
import {config} from './firebase-config'

const FirebaseAuth = firebase.initializeApp(config);

export default FirebaseAuth;