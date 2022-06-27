<template>
    <div>
        <div v-if="authErrorMsg">
            <p class="error">{{ authErrorMsg }}</p>
        </div>
        <!-- Registration USE SLOT HERE!!!-->
        <form @submit.prevent="handleReset" class="auth-form">
            <h1 class="title">Reset Password</h1>
            <div class="form-set">
                <label for="passowrd">Passowrd</label>
                <input type="password" id="passowrd" v-model="password" />
            </div>
            <span class="error" v-if="validErrors.password">
                {{ validErrors.password[0] }}
            </span>
            <div class="form-set">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confi" v-model="password_confirm" />
            </div>
            <span class="error" v-if="validErrors.password_confirm">
                {{ validErrors.password_confirm[0] }}
            </span>
            <button type="submit" class="btn">Reset Password</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            password: "",
            password_confirm: "",
            validErrors: {
                password: null,
                password_confirm: null,
            },
        };
    },
    name: "reset-password",

    methods: {
        async handleReset() {
            try {
                const resetData = {
                    password: this.password,
                    password_confirm: this.password_confirm,
                    token: this.$route.params.token,
                };

                await this.$store.dispatch("reset", resetData);

                this.$router.replace({ name: "Login" });
            } catch (error) {
                if (error.response.data.errors) {
                    this.validErrors = error.response.data.errors;
                    setTimeout(() => {
                        for (const prop in this.validErrors) {
                            this.validErrors[prop] = null;
                        }
                    }, 3000);
                }
            }
        },
    },
};
</script>
