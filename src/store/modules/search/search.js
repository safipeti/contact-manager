export default {
    state() {
        return {
            searchTerm: "",
        };
    },

    getters: {
        searchTerm(state) {
            return state.searchTerm;
        },
    },

    mutations: {
        setSearchTerm(state, payload) {
            state.searchTerm = payload;
        },
    },

    actions: {
        setSearchTerm({ commit }, payload) {
            commit("setSearchTerm", payload);
        },
    },
};
