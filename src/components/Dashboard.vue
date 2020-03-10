<template>
  <div class="container" v-if="user.loggedIn">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div
              v-for="(user, index) in users"
              :key="index"
              class="alert alert-success"
              role="alert"
            >
              {{ user.username }}
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
    ...mapGetters({
      user: "user"
    })
  },
  data() {
    return {
      username: "",
      users: []
    };
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.users.push(doc.data());
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }
};
</script>
