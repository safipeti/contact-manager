<template>
    <section class="tabs">
        <span
            :class="[activeTab == 'phones' ? 'active-tab' : '']"
            @click.prevent="changeTab('phones')"
            ><i class="fa-solid fa-phone"></i
        ></span>
        <span
            :class="[activeTab == 'emails' ? 'active-tab' : '']"
            @click.prevent="changeTab('emails')"
            ><i class="fa-solid fa-envelope"></i
        ></span>
        <span
            :class="[activeTab == 'address' ? 'active-tab' : '']"
            @click.prevent="changeTab('address')"
            ><i class="fa-solid fa-location-dot"></i
        ></span>
        <span
            :class="[activeTab == 'notes' ? 'active-tab' : '']"
            @click.prevent="changeTab('notes')"
            ><i class="fa-solid fa-file-pen"></i
        ></span>
    </section>
</template>

<script>
export default {
    data() {
        return {
            activeTab: "phones",
        };
    },

    methods: {
        changeTab(tab) {
            this.activeTab = tab;
            this.$emit("tabChanged", tab);
        },
    },
};
</script>

<style></style>
