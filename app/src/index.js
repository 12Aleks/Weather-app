import React, {createContext}  from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './i18n';
import './style/style.scss'
import useIndex from "./store/index";
import firebase  from "firebase/app";


// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDfoDgC-nwhw1SLdBm-6EQ4ZBRZrIKiucc",
    authDomain: "weather-97994.firebaseapp.com",
    projectId: "weather-97994",
    storageBucket: "weather-97994.appspot.com",
    messagingSenderId: "34254192655",
    appId: "1:34254192655:web:acf33ab58291597435a37a",
    measurementId: "G-M06KL0WS2E"
});

//podkluczajem store czerez hook useContext
export const Context = createContext(null)

ReactDOM.render(
   <Context.Provider value={{
       data: new useIndex(),
   }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

