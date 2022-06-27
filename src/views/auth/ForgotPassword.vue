<template>
    <div>
        <div v-if="message">
            <p class="error">{{ message }}</p>
        </div>
        <!-- Login USE SLOT HERE!!!-->
        <form @submit.prevent="forgot" class="auth-form">
            <h1 class="title">Forgot Password</h1>
            <div class="form-set">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email" />
            </div>
            <span class="error" v-if="validErrors.email">
                {{ validErrors.email[0] }}
            </span>
            <button type="submit" class="btn">Reset Password</button>
            <div class="login-links login-links-center">
                <span
                    >Remember your pw?
                    <router-link :to="{ name: 'Login' }"
                        >Login!</router-link
                    ></span
                >
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            email: null,
            message: "",
            validErrors: {
                email: null,
            },
        };
    },

    name: "ForgotPassword",

    methods: {
        async forgot() {
            try {
                const response = await this.$store.dispatch("forgot", {
                    email: this.email,
                });
                this.message = response.data.message;
            } catch (error) {
                this.validErrors = error.response.data.errors;
                this.message = error.response.data.message;
                setTimeout(() => {
                    for (const prop in this.validErrors) {
                        this.validErrors[prop] = null;
                    }
                }, 3000);
            }
        },
    },
};
</script>

<style></style>
