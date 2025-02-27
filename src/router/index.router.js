import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Book from "@/views/Book.vue";
import User from "@/views/User.vue";
import Review from "@/views/Review.vue";
import Login from "@/views/Login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
    {
      path: "/book",
      name: "book",
      component: Book,
      meta: { requiresAuth: true },
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: { requiresAuth: true },
    },
    {
      path: "/review",
      name: "review",
      component: Review,
      meta: { requiresAuth: true },
    },
    { path: "/login", name: "login", component: Login },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next(); // Cho phép truy cập nếu hợp lệ
  }
});

export default router;
