export default {
    state() {
        return {
            flash: { flashType: "", flashMsg: "" },
        };
    },
    getters: {
        flash(state) {
            return state.flash;
        },
        flashType(state) {
            return state.flash.flashType;
        },
        flashMsg(state) {
            return state.flash.flashMsg;
        },
    },
    mutations: {
        setFlash(state, payload) {
            state.flash = payload;
        },

        resetFlash(state) {
            state.flash = { flashType: "", flashMsg: "" };
        },
    },
    actions: {
        setFlash(context, payload) {
            context.commit("setFlash", payload);
        },
        resetFlash(context) {
            context.commit("resetFlash");
        },
    },
};
