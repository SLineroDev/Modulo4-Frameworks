import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Members from "../views/Members.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Members",
    component: Members,
  },
  {
    path: "/member/:login",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
