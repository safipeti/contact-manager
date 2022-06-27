import { createStore } from "vuex";
import authModule from "./modules/auth";
import paginationModule from "./modules/pagination";
import contactsModule from "./modules/contacts/index";
import searchModule from "./modules/search/search";
import flashModule from "./modules/flash";
const store = createStore({
    modules: {
        authModule,
        contactsModule,
        searchModule,
        paginationModule,
        flashModule,
    },
});
export default store;
