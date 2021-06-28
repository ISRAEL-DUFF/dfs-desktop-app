import { createWebHistory, createRouter } from "vue-router";
// import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import About from "@/views/About.vue";
import Wallet from "@/views/Wallet.vue";
import Profile from "@/views/profile/Profile";
import ProfileUpload from "@/views/profile/Upload";
import Market from "@/views/Market";
import Dashboard from "@/views/Dashboard";
import Chat from '@/views/chat/Chat';

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: 'Dashboard'
    // component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [
      {
        path: "",
        component: Wallet,
      },
      {
        path: "profile",
        component: Profile,
      },
      {
        path: "upload",
        component: ProfileUpload,
      },
      {
        path: "market",
        component: Market,
      },
      {
        path: "chat",
        component: Chat,
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;