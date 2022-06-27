import axios from "axios";
const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

export default {
    state() {
        return {
            user: null,
            token: null,
        };
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.user = payload.user;
        },
    },
    actions: {
        async login(context, payload) {
            const response = await axios.post("login", payload);

            // save to localStorage
            localStorage.setItem(
                "contact_manager_access_token",
                response.data.token
            );
            localStorage.setItem(
                "contact_manager_logged_in_user",
                JSON.stringify(response.data.user)
            );

            context.commit("setUser", response.data);
        },

        async register(context, payload) {
            return await axios.post("/register", payload, headers);
        },

        checkUser(context) {
            const token = localStorage.getItem("contact_manager_access_token");
            const user = JSON.parse(
                localStorage.getItem("contact_manager_logged_in_user")
            );

            context.commit("setUser", { token, user });
        },

        logout(context) {
            localStorage.removeItem("contact_manager_access_token");

            context.commit("setUser", { token: null, user: null });
        },

        async forgot(context, payload) {
            return await axios.post("forgot", payload);
        },

        async reset(context, payload) {
            return await axios.post("reset", payload);
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        token(state) {
            return state.token;
        },
        isLoggedIn(state) {
            return !!state.token && !!state.user;
        },
    },
};
