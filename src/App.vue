<template>
    <div class="container">
        <the-notification></the-notification>
        <TheNav />
        <router-view />
    </div>
</template>
<script>
import TheNav from "./components/TheNav.vue";
import TheNotification from "./components/TheNotification.vue";
export default {
    components: {
        TheNav,
        TheNotification,
    },
    computed: {
        error() {
            return this.$store.state.error;
        },
    },
    created() {
        this.$store.dispatch("checkUser");
    },
};
</script>
