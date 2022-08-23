import React, { Component } from 'react';
import Wmap from './components/Wmap';
// Firebase deps
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyAlwgnETafa0JFgAWYfbPnEe1BycLlF5a8",
  authDomain: "wmapchat.firebaseapp.com",
  projectId: "wmapchat",
  storageBucket: "wmapchat.appspot.com",
  messagingSenderId: "623997961309",
  appId: "1:623997961309:web:92de103b097aa4c36e39b4",
  measurementId: "G-0SY71RB1Q2"
});

function App() {
  return (
    <div>
      <Wmap />
    </div>
  );
}

export default App;
