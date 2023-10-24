import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';


library.add(fas);
createApp(App).use(router).use(Vuetify).component("fa", FontAwesomeIcon).mount("#app");
