<template>
  <nav v-if="user.loggedIn">
    <div class="container">
      <template v-if="user.loggedIn">
        <div class="navbar">
          <p class="hello">Bonjour,</p>
          <p class="username">{{ username }}</p>
          <button type="submit" @click.prevent="signOut">DÉCONNEXION</button>
        </div>
      </template>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    ...mapGetters({
      // map `this.user` to `this.$store.getters.user`
      user: "user"
    })
  },
  data() {
    return {
      username: ""
    };
  },
  updated() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then(doc => {
          this.username = doc.data().username;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "login"
          });
        });
    }
  }
};
</script>
<style scoped>
.hello {
  align-self: center;
}
.username {
  font-weight: bold;
  font-size: 25px;
  margin-left: 5px;
  margin-top: 20px;
  align-self: center;
}
button {
  background-color: #f44336;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 15px;
  width: 250px;
  display: inline-block;
  font-size: 15px;
  cursor: pointer;
  margin-left: auto;
  align-self: center;
}
.navbar {
  margin-left: 10rem;
  margin-right: 10rem;
  display: flex;
  color: #8bc34a;
  font-size: 20px;
}
</style>