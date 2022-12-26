import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import ToDoView from "../page/ToDoView.vue";
import Dashboard from "../page/Dashboard.vue";
import Todo from "../page/Todo.vue";
import Login from "../page/Login.vue";
import Register from "../page/Register.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
        { path: "/dashboard", name: "Dashboard", component: Dashboard },
        { path: "/todo", name: "Todo", component: Todo },
        { path: "/todo/create", name: "TodoCreate", component: ToDoView },
        { path: "/todo/:id", name: "TodoView", component: ToDoView },
    ],
  },
  {
    path: "/auth",
    redirect: "/login",
    name: "Auth",
    component: AuthLayout,
    meta: {
      isGuest: true,
    },
    children: [
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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "Login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
