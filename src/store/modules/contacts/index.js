import axios from "axios";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
    state() {
        return {
            contact: null,
            contacts: [],
            limit: 3,
            error: "",

            params: {
                page: 1,
                searchTerm: "",
                limit: 3,
            },
        };
    },
    mutations,
    actions,
    getters,
};
