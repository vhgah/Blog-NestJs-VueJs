import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueCookies from 'vue3-cookies'

createApp(App).use(router).use(VueCookies).mount("#app");
