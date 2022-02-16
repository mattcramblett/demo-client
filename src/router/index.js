import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/components/Home.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/components/Test/Test.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
