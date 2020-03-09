<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <div v-if="user" class="alert alert-success" role="alert">
              You are logged in!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
export default {
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {
    const { currentUser } = firebase.auth();
    if (currentUser) {
      console.log(currentUser.uid);
    } else {
      setTimeout(() => {
        console.log(this.$store.getters.user.data.uid);
      }, 2000);
    }
  }
};
</script>
