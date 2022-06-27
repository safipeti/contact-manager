<template>
    <div class="search">
        <input
            type="text"
            class="search-field"
            v-model="searchTerm"
            @input="doSearch"
            placeholder="Search contact..."
        />
        <span @click="clearSearch"><i class="fas fa-times"></i></span></div
></template>

<script>
export default {
    data() {
        return {
            searchTerm: "",
        };
    },
    methods: {
        doSearch() {
            this.$router.replace();
            this.$store.dispatch("setCurrentPage", 1);
            this.$store.dispatch("setSearchTerm", this.searchTerm);
            this.$store.dispatch("loadContacts");
        },
        clearSearch() {
            if (this.searchTerm) {
                this.searchTerm = "";
                this.$router.replace();
                this.$store.dispatch("setSearchTerm", "");
                this.$store.dispatch("loadContacts");
            }
        },
    },
};
</script>
