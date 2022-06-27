<template>
    <h1 class="title">Contacts</h1>
    <TheHead />
    <ul class="contact-list">
        <contact-list-item
            v-for="contact in contacts"
            :key="contact.id"
            :contact="contact"
        />
    </ul>
    <the-pagination></the-pagination>
    <the-flash
        v-if="flash"
        :flashMsg="flash.flashMsg"
        :flashType="flash.flashType"
    ></the-flash>
</template>

<script>
import notifmixin from "../../mixins/flash.mixin";
import ThePagination from "../../components/ThePagination.vue";
import ContactListItem from "../../components/ContactListItem.vue";
import TheHead from "../../components/TheHead.vue";

import { contactPictures } from "../../mixins/picture.mixin";
import flashMessages from "../../assets/js/flashMessages";

export default {
    components: { ThePagination, ContactListItem, TheHead },
    mixins: [contactPictures, notifmixin],

    methods: {
        loadContacts() {
            this.$store.dispatch("loadContacts");
        },
    },

    computed: {
        contacts() {
            return this.$store.getters.contacts;
        },
    },

    async created() {
        try {
            if (this.$route.query.page) {
                this.$store.dispatch("setCurrentPage", this.$route.query.page);
            }

            const response = await this.$store.dispatch("loadContacts");
            if (response.error) {
                this.showFlash(flashMessages.errorList);
            }
        } catch (error) {
            return { error };
        }
    },
};
</script>
