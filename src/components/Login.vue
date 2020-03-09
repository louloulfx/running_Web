<template>
  <div class="container">
    <div class>
      <div class>Administation</div>
      <div class>
        <div v-if="error">{{error}}</div>
        <form action="#" @submit.prevent="submit">
          <div class>
            <label for="email" class>Email</label>

            <div class="col-md-6">
              <input
                id="email"
                type="email"
                class
                name="email"
                value
                required
                autofocus
                v-model="form.email"
              />
            </div>
          </div>

          <div class>
            <label for="password" class>Password</label>

            <div class>
              <input
                id="password"
                type="password"
                class
                name="password"
                required
                v-model="form.password"
              />
            </div>
          </div>
          <div class="col-md-8 offset-md-4">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
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