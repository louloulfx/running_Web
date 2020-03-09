<template>
  <nav v-if="user.loggedIn">
    <div class="container">
      <template v-if="user.loggedIn">
        <div class="nav-item" @click.prevent="ys">{{ user.data.uid }}</div>
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
    },
    ys() {
      console.log(this.user.data.uid);
    }
  }
};
</script>
