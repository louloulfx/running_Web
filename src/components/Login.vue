<template>
  <div class="container">
    <div>
      <img class="run" src="../assets/logo.png" />
    </div>
    <div class="container2">
      <div class="login-container">
        <div class="title">ADMINISTRATION</div>
        <img class="runningman" src="../assets/bonhommequicours-vert.png" />
        <div class>
          <div v-if="error">{{error}}</div>
          <form action="#" @submit.prevent="submit">
            <div class>
              <label for="email" class>EMAIL</label>

              <div>
                <input
                  id="email"
                  type="email"
                  class
                  name="email"
                  value
                  autofocus
                  v-model="form.email"
                />
              </div>
            </div>

            <div class>
              <label for="password" class>MOT DE PASSE</label>

              <div class>
                <input id="password" type="password" class name="password" v-model="form.password" />
              </div>
            </div>
            <div>
              <button type="submit">SE CONNECTER</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      error: null
    };
  },
  mounted() {
    if (this.$store.getters.user.data != null) {
      this.$router.replace({ name: "Dashboard" });
    }
  },
  methods: {
    submit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(data => {
          console.log(data);
          this.$router.replace({ name: "Dashboard" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  }
};
</script>
<style scoped>
.container2 {
  display: flex;
  justify-content: center;
}
.runningman {
  margin-top: 5px;
  margin-bottom: 15px;
  height: 90px;
}
.run {
  height: 125px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.title {
  font-size: 25px;
  color: #8bc34a;
}
.login-container {
  border: 1px solid #c8c8c8;
  padding: 5px 25px 15px 25px;
  color: #121212;
  font-size: 18px;
  border-radius: 5px 50px 5px 50px;
}
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
}
input {
  background-color: #fff;
  width: 250px;
  height: 20px;
  border-radius: 5px;
  border: 1px solid #c8c8c8;
  margin-top: 15px;
  margin-bottom: 15px;
}
button {
  background-color: #8bc34a;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 8px;
  width: 250px;
  display: inline-block;
  font-size: 15px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 30px;
}
</style>