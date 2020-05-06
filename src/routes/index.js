import Vue from "vue";
import Router from "vue-router";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Statistiques from "../components/Statistiques";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard,
    },
    {
      path: "/stats/:id",
      name: "Statistiques",
      component: Statistiques,
    },
  ],
});

export default router;
