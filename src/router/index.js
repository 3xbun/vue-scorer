import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Admin from "../views/Admin.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/:id",
    name: "User",
    component: User,
  },
  {
    path: "/dashboard",
    name: "Admin Dashboard",
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
