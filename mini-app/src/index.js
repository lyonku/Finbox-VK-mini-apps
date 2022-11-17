import React, { createContext } from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import "./index.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyB-XLGtb7YKiz_rhd02eveZ5NZgaTzHneg",
  authDomain: "smartmoneyreviews-97c4b.firebaseapp.com",
  databaseURL:
    "https://smartmoneyreviews-97c4b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smartmoneyreviews-97c4b",
  storageBucket: "smartmoneyreviews-97c4b.appspot.com",
  messagingSenderId: "549540052009",
  appId: "1:549540052009:web:a979e9efcf8e4514e2f038",
  measurementId: "G-9WYPLHHEJE",
});

export const Context = createContext(null);

const firestore = firebase.firestore();

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(
  <Context.Provider
    value={{
      firebase,
      firestore,
    }}
  >
    <App />
  </Context.Provider>,
  document.getElementById("root")
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
