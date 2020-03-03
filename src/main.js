import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index";
import * as firebase from "firebase";
import store from "./store";

Vue.config.productionTip = false;

const firebaseConfig = {
  projectId: "runningapp-da94c",
  apiKey: "AIzaSyAOOYnYnkVEXDh3lCDXqymuEFWJcNYRPcw",
  authDomain: "runningapp-da94c.firebaseio.com",
  databaseURL: "https://runningapp-da94c.firebaseio.com",
  storageBucket: "runningapp-da94c.appspot.com"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
