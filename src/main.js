import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.router";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App);
app.use(router);
app.mount("#app");
