import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import PlayLists from "../views/PlayLists.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { 
       showNavBar: true,
       keepAlive: true,
    },
  },
  {
    path: "/hot",
    name: "Hot",
    component: () => import(/* webpackChunkName: "hot" */ "../views/Hot.vue"),
    meta: { showNavBar: true },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: { showNavBar: true },
  },
  {
    path: "/playlists",
    name: "PlayLists",
    component: PlayLists,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
