<template>
  <div v-if="user.loggedIn">
    <h1>username : {{user_data[0].username}}</h1>
    <h1>birthday: {{user_data[0].birthday}}</h1>
    <h1>email : {{user_data[0].email}}</h1>
    <h1>role : {{user_data[0].role}}</h1>
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
      id: this.$route.params.id,
      user_data: []
    };
  },
  created() {
    console.log(this.id);
    firebase
      .firestore()
      .collection("users")
      .doc(this.id)
      .get()
      .then(data => {
        if (!data.exists) {
          console.log("Document inexistant");
        } else {
          this.user_data.push(data.data());
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>