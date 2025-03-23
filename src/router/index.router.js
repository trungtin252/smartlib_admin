import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Profile from "@/views/Profile.vue";
import Book from "@/views/Book.vue";
import User from "@/views/User.vue";
import Review from "@/views/Review.vue";
import Login from "@/views/Login.vue";
import { getCookie } from "@/utils/cookie";
import BookEdit from "@/components/layouts/BookEdit.vue";
import NotFound from "@/views/NotFound.vue";
import BookList from "@/components/layouts/BookList.vue";
import History from "@/views/History.vue";

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
      children: [
        {
          path: ":id",
          name: "book.edit",
          component: BookEdit,
          props: true,
        },
        {
          path: "add",
          name: "book.add",
          component: BookEdit,
          props: true,
        },
      ],
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
    {
      path: "/history",
      name: "history",
      component: History,
      meta: { requiresAuth: true },
    },
    { path: "/login", name: "login", component: Login },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = getCookie("staffId");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next(); // Cho phép truy cập nếu hợp lệ
  }
});

export default router;
