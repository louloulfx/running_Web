<template>
  <nav v-if="user.loggedIn">
    <div class="container">
      <template v-if="user.loggedIn">
        <div class="nav-item">Bonjour, {{ username }}</div>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="signOut">Déconnexion</a>
        </li>
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
