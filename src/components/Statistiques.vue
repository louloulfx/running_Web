<template>
  <div v-if="user.loggedIn">
    <div v-for="(user, index) in user_data" :key="index" class="username">
      <div style="width: 100%">
        <h2>Profil</h2>
        <div class="container1">
          <p class="profilContent">username : {{user.username}}</p>
          <p class="profilContent">birthday: {{user.birthday}}</p>
          <p class="profilContent">email : {{user.email}}</p>
        </div>
      </div>
    </div>
    <div class="historycontainer">
      <h2>Historique</h2>
      <div v-for="(courses, index) in user_courses" :key="index" class="courses">
        <div class="container2">
          <p class="startDate">{{ courses.start_date }}</p>
          <p class="hour">{{ courses.hour}}</p>
        </div>
        <hr />
        <div class="container2">
          <p class="hour">{{ courses.runTime}} •</p>
          <p class="hour">{{courses.distance}} km</p>
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
      id: this.$route.params.id,
      user_data: [],
      courses: [],
      user_courses: []
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
    firebase
      .firestore()
      .collection("courses")
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.courses.push(doc.data());
          this.listCourses();
        });
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    listCourses() {
      console.log(this.courses);
      this.user_courses = [];
      for (let j = 0; j < this.courses.length; j++) {
        if (this.id === this.courses[j].user_id) {
          let date = new Date(this.courses[j].start_date.seconds * 1000);
          let difference =
            (this.courses[j].end_date.seconds -
              this.courses[j].start_date.seconds) *
            1000;
          let time = new Date(difference);
          let oneHour = new Date(0);
          let runTime =
            ("0" + (time.getHours() - oneHour.getHours())).slice(-2) +
            ":" +
            ("0" + time.getMinutes()).slice(-2) +
            ":" +
            ("0" + time.getSeconds()).slice(-2);
          let dayDate =
            ("0" + date.getDate()).slice(-2) +
            "/" +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            date.getFullYear();
          let hour =
            ("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2);
          this.courses[j].start_date.runTime = runTime;
          this.courses[j].start_date.date = dayDate;
          this.courses[j].start_date.hour = hour;
          console.log(this.courses[j]);
          this.user_courses.push({
            distance: this.courses[j].distance,
            start_date: dayDate,
            hour: hour,
            runTime: runTime
          });
        }
      }
    }
  }
};
</script>

<style scoped>
.username {
  margin-top: 20px;
  margin-left: 10rem;
  margin-right: 10rem;
  margin-bottom: 30px;
  display: flex;
  border: 1px solid #c8c8c8;
  padding: 5px 25px 5px 25px;
  color: #121212;
  border-radius: 5px 5px 5px 5px;
  font-size: 20px;
  text-align: center;
}
.container1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}
.container2 {
  display: flex;
  flex-direction: row;
}
.profilContent {
  margin-left: 70px;
}
.courses {
  margin-bottom: 20px;
  flex-direction: column;
  align-items: center;
  display: flex;
  border: 1px solid #c8c8c8;
  color: #121212;
  border-radius: 5px 50px 5px 50px;
  font-size: 20px;
}

.hour {
  font-size: 18px;
  margin-top: 15px;
  margin-left: 5px;
}
.startDate {
  margin-top: 10px;
  font-size: 25px;
  margin-bottom: 10px;
}
hr {
  margin-top: 0px;
  margin-bottom: 0px;
  width: 100px;
}
.historycontainer {
  margin-left: 10rem;
  margin-right: 10rem;
  border: 1px solid #c8c8c8;
  border-radius: 5px;
  padding: 20px;
}
h2 {
  text-align: center;
  font-size: 30px;
}
</style>