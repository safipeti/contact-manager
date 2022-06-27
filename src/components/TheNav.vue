<template>
    <header v-if="isLoggedIn" class="nav">
        <a href="/" class="btn"><i class="fa-solid fa-house"></i></a>

        <p>
            Hello, <span class="username">{{ user.name }}!</span>
        </p>
        <button class="btn" @click.prevent="logout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
    </header>
    <!-- <div v-if="isLoggedIn">
        
    </div> -->
    <!-- <div v-else>
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Register' }">Register</router-link>
    </div> -->
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        user() {
            return this.$store.getters.user;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
            this.$router.replace({ name: "Login" });
        },
    },
};
</script>
