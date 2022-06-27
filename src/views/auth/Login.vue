<template>
    <form @submit.prevent="login" class="auth-form">
        <div class="error" v-if="authErrorMsg">
            <p>{{ authErrorMsg }}</p>
        </div>
        <h1 class="title">Login</h1>
        <div class="form-set">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email" />
        </div>
        <div class="form-set">
            <label for="passowrd">Passowrd</label>
            <input type="password" id="passowrd" v-model="password" />
        </div>
        <button type="submit" class="btn">Login</button>
        <div class="login-links">
            <span
                >Do not have an account?
                <router-link :to="{ name: 'Register' }"
                    >Register</router-link
                ></span
            >
            <span
                >Forgot Password?
                <router-link :to="{ name: 'ForgotPassword' }">
                    Reset</router-link
                ></span
            >
        </div>
    </form>
</template>

<script>
import axios from "axios";
export default {
    name: "login",
    data() {
        return {
            email: "",
            password: "",
            authErrorMsg: null,
        };
    },

    methods: {
        login: async function() {
            try {
                const credentials = {
                    email: this.email,
                    password: this.password,
                };

                await this.$store.dispatch("login", credentials);

                this.$router.push({ name: "ContactList" });
            } catch (error) {
                this.authErrorMsg = error.response.data.error_message;
                setTimeout(() => {
                    this.authErrorMsg = null;
                }, 3000);
            }
        },
    },
};
</script>
