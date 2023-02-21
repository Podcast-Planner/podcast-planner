// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyBiJUQBgknxw1egxoAsm6VdXcDd2Lvkp7I",

    authDomain: "podcast-planner-3d12f.firebaseapp.com",

    databaseURL: "https://podcast-planner-3d12f-default-rtdb.firebaseio.com",

    projectId: "podcast-planner-3d12f",

    storageBucket: "podcast-planner-3d12f.appspot.com",

    messagingSenderId: "378970313853",

    appId: "1:378970313853:web:1256635c6d974e437b0d14"

};


// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;