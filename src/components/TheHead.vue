<template>
    <header class="header">
        <the-search></the-search>

        <router-link class="btn btn-add" :to="{ name: 'ContactCreate' }"
            ><i class="fa-solid fa-plus"></i
        ></router-link>
    </header>
</template>

<script>
import TheSearch from "./TheSearch.vue";
export default {
    components: {
        "the-search": TheSearch,
    },
};
</script>

<style></style>
