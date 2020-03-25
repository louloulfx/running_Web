<template>
  <nav v-if="user.loggedIn">
    <div class="container">
      <template v-if="user.loggedIn">
        <div class="navbar">
          <p>Bonjour,</p>
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
.username {
  font-weight: bold;
  font-size: 25px;
  margin-top: 15px;
  margin-left: 5px;
}
button {
  background-color: #f44336;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 8px;
  width: 250px;
  display: inline-block;
  font-size: 13px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 30px;
  margin-left: auto;
}
.navbar {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  justify-content: space-between;
  color: #8bc34a;
  font-size: 20px;
}
</style>