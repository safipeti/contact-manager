export default {
    state() {
        return { totalPages: 1, limit: 3, currentPage: 1 };
    },
    getters: {
        totalPages(state) {
            return state.totalPages;
        },

        currentPage(state) {
            return state.currentPage;
        },
        limit(state) {
            return state.limit;
        },
    },
    mutations: {
        setTotalPages(state, payload) {
            state.totalPages = Math.ceil(payload / state.limit);
        },

        setCurrentPage(state, payload) {
            state.currentPage = payload;
        },
    },
    actions: {
        setCurrentPage(context, currentPage) {
            context.commit("setCurrentPage", currentPage);
        },
    },
};
