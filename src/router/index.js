import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import SongLists from "../views/SongLists.vue";
import Player from "../views/Player.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      showNavBar: true,
      keepAlive: true,
      animateIn: "animate__fadeInUp",
      animateOut: "animate__fadeOutDown",
    },
    beforeEnter: (to, from, next) => {
      if (from.name == "Hot" || from.name == "Search") {
        to.meta.animateIn = "animate__slideInLeft";
        to.meta.animateOut = "animate__slideOutRight";
      }else{
        to.meta.animateIn = "animate__fadeInUp";
        to.meta.animateOut = "animate__fadeOutDown";
      }
      next();
    },
  },
  {
    path: "/hot",
    name: "Hot",
    component: () => import(/* webpackChunkName: "hot" */ "../views/Hot.vue"),
    meta: {
      showNavBar: true,
      animateIn: "",
      animateOut: "",
    },
    beforeEnter: (to, from, next) => {
      if (from.name == "Home") {
        to.meta.animateIn = "animate__slideInRight";
        to.meta.animateOut = "animate__slideOutLeft";
      } else if (from.name == "Search") {
        to.meta.animateIn = " animate__slideInLeft";
        to.meta.animateOut = "animate__slideOutRight";
      }else{
        to.meta.animateIn = "animate__fadeInUp";
        to.meta.animateOut = "animate__fadeOutDown";
      }
      next();
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      showNavBar: true,
      animateIn: "",
      animateOut: "",
    },
    beforeEnter: (to, from, next) => {
      if (from.name == "Hot" || from.name == "Home") {
        to.meta.animateIn = "animate__slideInRight";
        to.meta.animateOut = "animate__slideOutLeft";
      }else{
        to.meta.animateIn = "animate__fadeInUp";
        to.meta.animateOut = "animate__fadeOutDown";
      }
      next();
    },
  },
  {
    path: "/Songlists",
    name: "SongLists",
    component: SongLists,
    meta: {
      showNavBar: false,
      animateIn: "animate__fadeInUp",
      animateOut: "animate__fadeOutDown",
    },
  },
  {
    path: "/player",
    name: "player",
    component: Player,
    meta: {
      showNavBar: false,
      animateIn: "animate__fadeInUp",
      animateOut: "animate__fadeOutDown",
    },

  },
];

const router = new VueRouter({
  routes,
});

export default router;
