<template>
  <div v-if="user.loggedIn">
    <div>
      <div v-for="(user, index) in usersUpdate" :key="index" class="username">
        <router-link v-bind:to="'/stats/' + user.user_id">
          <p>{{ user.username }}</p>
          <p class="courses">{{ user.nbCourses }} Courses</p>
        </router-link>
        <div class="delete">
          <img v-on:click="deleteUser(user.user_id)" src="../assets/quit.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
require("firebase-functions");
export default {
  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  data() {
    return {
      username: "",
      users: [],
      courses: [],
      usersUpdate: []
    };
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          let array = doc.data();
          array.user_id = doc.id;
          this.users.push(array);
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
    firebase
      .firestore()
      .collection("courses")
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.courses.push({ user_id: doc.data().user_id });
          this.listCourses();
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    listCourses() {
      this.usersUpdate = [];
      let users = this.users;
      for (let i = 0; i < users.length; i++) {
        users[i].nbCourses = 0;
        for (let j = 0; j < this.courses.length; j++) {
          if (users[i].user_id === this.courses[j].user_id) {
            users[i].nbCourses = users[i].nbCourses + 1;
          }
        }
      }
      this.usersUpdate = users;
    },
    deleteUser(user_id) {
      console.log(user_id);

      const functions = firebase.functions();
      // Appel de la fonction présente dans le index.js du dossier functions
      const deleteUser = functions.httpsCallable("deleteAccount");
      firebase
        .firestore()
        .collection("users")
        .doc(user_id)
        .delete()
        .then(() => {
          console.log("User deleted");
        })
        .catch(error => {
          console.log(error);
        });
      deleteUser(user_id).then(result => {
        console.log(result);
        location.reload();
      });
    }
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
  cursor: pointer;
  margin-top: 10px;
  height: 64px;
}

a {
  text-decoration: none;
  color: black;
}
</style>
