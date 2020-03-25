<template>
  <div v-if="user.loggedIn">
    <div>
      <div v-for="(user, index) in users" :key="index" class="username">
        <div>
          <p>{{ user.username }}</p>
          <p class="courses">4 courses</p>
        </div>
        <div class="delete">
          <img src="../assets/quit.png" alt />
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
<style scoped>
.username {
  margin-left: 10rem;
  margin-right: 10rem;
  margin-bottom: 20px;
  display: flex;
  border: 1px solid #c8c8c8;
  padding: 5px 25px 5px 25px;
  color: #121212;
  border-radius: 5px 50px 5px 50px;
  font-size: 20px;
}
.delete {
  margin-left: auto;
  align-self: center;
}
.courses {
  font-weight: bold;
}
img {
  margin-top: 10px;
  height: 64px;
}
</style>