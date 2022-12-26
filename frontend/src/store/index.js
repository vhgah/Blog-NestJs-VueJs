import { createStore } from "vuex";
import axiosClient from "../axios";
import { useCookies } from "vue3-cookies";

const { cookies } = useCookies();

const store = createStore({
  state: {
    user: {
      data: {
        imageUrl:
          "https://us.123rf.com/450wm/praewpailin/praewpailin2009/praewpailin200900539/155901199-picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector-illustration-.jpg?ver=6",
        name: "",
      },
      token: sessionStorage.getItem("TODO_APP_TOKEN"),
    },
  },
  getters: {},
  actions: {
    async register({ commit }, user) {
      const { data } = await axiosClient.post("/users", user);
      commit("setUser", data);
      return data;
    },
    async login({ commit }, user) {
      const { data } = await axiosClient.post("/auth/login", user);
      commit("setUser", data);
      return data;
    },
    async logout({ commit }) {
      return axiosClient.post("/auth/logout").then((response) => {
        commit("logout");
        return response;
      });
    },
    async getPosts({ commit }, todo) {
      const { data } = await axiosClient.post("/posts", todo,  {withCredentials: true});
      return data;
    },
  },
  mutations: {
    setUser: (state, userData) => {
      state.user.data.name = userData.username;
      state.user.token = userData.token;
      let d = new Date();
      d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie =
        "Authentication=" + state.user.token + ";" + expires + ";path=/dashboard";

      sessionStorage.setItem("TODO_APP_TOKEN", state.user.token);
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TODO_APP_TOKEN");
    },
  },
  modules: {},
});

export default store;
