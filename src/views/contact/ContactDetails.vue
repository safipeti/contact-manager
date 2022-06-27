<template>
    <h1 class="title">Contact Details</h1>
    <div class="top-section">
        <section class="contact-picture">
            <img
                v-if="contactPicture"
                :src="contactPicture"
                alt="Profile picture of {{contact.name}}"
                class="contact-img"
            />
            <img v-else src="@/assets/noprofile.jpg" alt="" />
        </section>
        <section class="personal-details">
            <div class="form-element">
                <label for="email"><i class="fa-solid fa-user"></i></label>
                <p>{{ contact.name }}</p>
            </div>
            <div class="form-element">
                <label for="email"
                    ><i class="fa-solid fa-cake-candles"></i
                ></label>
                <p v-if="contact.dob">{{ contact.dob }}</p>
            </div>
        </section>
        <div class="control-group vertical">
            <button class="btn btn-alert" @click="openDialog = true">
                <i class="fa-solid fa-trash-can"></i>
            </button>
            <router-link
                class="btn btn-primary"
                :to="{ name: 'ContactUpdate', params: { id: contact.id } }"
            >
                <i class="fa-solid fa-pen-to-square"></i>
            </router-link>
            <router-link :to="{ name: 'ContactList' }" class="btn btn-neutral">
                <i class="fa-solid fa-chevron-left"></i>
            </router-link>
        </div>
    </div>
    <div class="bottom-section">
        <the-tab @tabChanged="setTab"></the-tab>
        <section class="data">
            <the-phone
                v-if="activeTab == 'phones'"
                :contact="contact"
            ></the-phone>
            <the-email
                v-if="activeTab == 'emails'"
                :contact="contact"
            ></the-email>
            <the-address
                v-if="activeTab == 'address'"
                :contact="contact"
            ></the-address>
            <the-note v-if="activeTab == 'notes'" :contact="contact"></the-note>
        </section>
        <the-confirm
            v-if="openDialog"
            @deleteConfirmed="handleDelete(contact.id)"
            @dismissDialog="openDialog = false"
        ></the-confirm>
    </div>
</template>

<script>
import notifmixin from "../../mixins/flash.mixin";
import { contactPictures } from "../../mixins/picture.mixin";
import { tabMixin } from "../../mixins/tab.mixin";
import ThePhone from "../../components/sections/ThePhone.vue";
import TheEmail from "../../components/sections/TheEmail.vue";
import TheAddress from "../../components/sections/TheAddress.vue";
import TheNote from "../../components/sections/TheNote.vue";
import flashMessages from "../../assets/js/flashMessages";
import TheConfirm from "../../components/TheConfirm.vue";

export default {
    mixins: [contactPictures, tabMixin, notifmixin],
    name: "ContactDetails",
    components: {
        "the-phone": ThePhone,
        "the-email": TheEmail,
        "the-address": TheAddress,
        "the-note": TheNote,
        "the-confirm": TheConfirm,
    },
    data() {
        return {
            openDialog: false,
        };
    },
    methods: {
        // confirmDelete(id) {
        //     this.openDialog = true;
        // },

        async handleDelete(id) {
            this.openDialog = false;
            const { error } = await this.$store.dispatch("deleteContact", {
                id,
            });
            if (error) {
                this.showFlash(flashMessages.errorDelete);
                return;
            }
            this.showFlash(flashMessages.successDelete);
            this.$router.push({
                name: "ContactList",
            });
        },
    },

    computed: {
        contact() {
            return this.$store.getters.contact;
        },
    },

    async created() {
        const response = await this.$store.dispatch("loadContact", {
            id: this.$route.params.id,
        });
        if (response.error) {
            this.showFlash(flashMessages.errorShow);
        }
    },
};
</script>
