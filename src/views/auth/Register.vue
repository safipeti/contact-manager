<template>
    <div>
        <div v-if="authErrorMsg">
            <p class="error">{{ authErrorMsg }}</p>
        </div>
        <!-- Registration USE SLOT HERE!!!-->
        <form @submit.prevent="register" class="auth-form">
            <h1 class="title">Register</h1>
            <span class="error" v-if="validErrors.name">
                {{ validErrors.name[0] }}
            </span>
            <div class="form-set">
                <label for="email">Username:</label>
                <input type="text" id="name" v-model="name" />
            </div>
            <span class="error" v-if="validErrors.email">
                {{ validErrors.email[0] }}
            </span>
            <div class="form-set">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email" />
            </div>
            <div class="form-set">
                <label for="passowrd">Passowrd</label>
                <input type="password" id="passowrd" v-model="password" />
            </div>
            <span class="error" v-if="validErrors.password">
                {{ validErrors.password[0] }}
            </span>
            <div class="form-set">
                <label for="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    v-model="password_confirm"
                />
            </div>
            <span class="error" v-if="validErrors.password_confirm">
                {{ validErrors.password_confirm[0] }}
            </span>
            <button type="submit" class="btn">Register</button>
            <div class="login-links login-links-center">
                <span
                    >Already have an account?
                    <router-link :to="{ name: 'Login' }"
                        ><span>Login</span></router-link
                    ></span
                >
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "resigter",
    data() {
        return {
            name: null,
            email: null,
            password: null,
            password_confirm: null,
            validErrors: {
                name: null,
                email: null,
                password: null,
                password_confirm: null,
            },
            authErrorMsg: null,
        };
    },

    methods: {
        register: async function() {
            try {
                const regData = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirm: this.password_confirm,
                };

                await this.$store.dispatch("register", regData);

                this.$router.replace({ name: "Login" });
            } catch (error) {
                this.validErrors = error.response.data.errors;
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
