import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";
import Vue from "vue";

Vue.use(VueFire);

firebase.initializeApp({
  projectId: "runningapp-da94c",
  apiKey: "AIzaSyAOOYnYnkVEXDh3lCDXqymuEFWJcNYRPcw",
  authDomain: "runningapp-da94c.firebaseio.com",
  databaseURL: "https://runningapp-da94c.firebaseio.com",
  storageBucket: "runningapp-da94c.appspot.com"
});

export const db = firebase.firestore();
