import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/style.css";
import "./axios";

import store from "./store";

let app;
if (!app) {
    app = createApp(App);
}
app.use(store);
app.use(router);
app.mount("#app");
