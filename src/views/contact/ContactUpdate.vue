<template>
    <h1 class="title">Edit contact</h1>
    <form @submit.prevent="handleSubmit" v-if="contact">
        <div class="top-section">
            <div v-if="contact.contact_picture && showContactPicture">
                <section class="contact-picture">
                    <img :src="contactPicture" alt="" />
                </section>
                <button
                    class="remove-profile-picture btn"
                    @click="removeProfilePicture"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div v-else>
                <section class="contact-picture" v-if="!selectedContactPicture">
                    <input
                        class="contact-picture-file"
                        type="file"
                        @change="handleContactPictureSelect"
                        v-if="!selectedContactPicture"
                    />
                    <span class="guide-text"
                        >Click to upload or drag image</span
                    >
                </section>
                <section class="contact-picture" v-if="selectedContactPicture">
                    <img :src="selectedContactPicture" alt="" />
                </section>
                <div class="picture-controls">
                    <button
                        v-if="selectedContactPicture"
                        class="remove-profile-picture btn"
                        @click="selectedContactPicture = null"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <button
                        v-if="contact.contact_picture && !showContactPicture"
                        class="set-original btn"
                        @click="setOriginalProfilePicture"
                    >
                        <i class="fa-solid fa-arrow-rotate-left"></i>
                    </button>
                </div>
            </div>

            <section class="personal-details">
                <span v-if="error" class="error"
                    >The name field cannot be empty</span
                >
                <div class="form-element">
                    <label for="email"><i class="fa-solid fa-user"></i></label>
                    <input type="text" v-model="contact.name" />
                </div>
                <div class="form-element">
                    <label for="email"
                        ><i class="fa-solid fa-cake-candles"></i
                    ></label>
                    <input type="text" v-model="contact.dob" />
                </div>
                <!-- <span class="control back icon"
                        ><i class="fa-solid fa-chevron-left"></i
                    ></span> -->
            </section>
            <div class="control-group">
                <button class="btn btn-primary">
                    <i class="fa-solid fa-check"></i>
                </button>
                <router-link
                    class="btn btn-neutral"
                    :to="{ name: 'ContactList' }"
                    ><i class="fa-solid fa-chevron-left"></i
                ></router-link>
            </div>
        </div>
        <div class="bottom-section">
            <the-tab @tabChanged="setTab"></the-tab>

            <section class="data">
                <form-phone
                    v-if="activeTab == 'phones'"
                    :contact="contact"
                ></form-phone>
                <form-email
                    v-if="activeTab == 'emails'"
                    :contact="contact"
                ></form-email>
                <form-address
                    v-if="activeTab == 'address'"
                    :contact="contact"
                ></form-address>
                <form-note
                    v-if="activeTab == 'notes'"
                    :contact="contact"
                ></form-note>
            </section>
        </div>
    </form>
</template>

<script>
import notifmixin from "../../mixins/flash.mixin";
import FormPhone from "../../components/sections/FormPhone.vue";
import FormEmail from "../../components/sections/FormEmail.vue";
import FormAddress from "../../components/sections/FormAddress.vue";
import FormNote from "../../components/sections/FormNote.vue";

import { tabMixin } from "../../mixins/tab.mixin";
import { contactPictures } from "../../mixins/picture.mixin";
import flashMessages from "../../assets/js/flashMessages";

export default {
    components: {
        "form-phone": FormPhone,
        "form-email": FormEmail,
        "form-address": FormAddress,
        "form-note": FormNote,
    },
    props: ["id"],
    mixins: [tabMixin, contactPictures, notifmixin],
    data() {
        return {
            showContactPicture: true,
            activeTab: "phones",
            cancelButtonShow: false,
            contactPictureMarkedForDelete: false,
            error: false,
        };
    },

    methods: {
        removeProfilePicture() {
            this.contactPictureMarkedForDelete = true;
            this.selectedContactPicture = null;
            this.uploadContactPictureFile = null;
            this.showContactPicture = false;
        },

        setOriginalProfilePicture() {
            this.showContactPicture = true;
            this.selectedContactPicture = null;
            this.contactPictureMarkedForDelete = false;
        },

        async handleSubmit() {
            if (!this.contact.name) {
                this.error = true;
                return;
            }
            const newContact = {
                id: this.$route.params.id,
                name: this.contact.name,
                dob: this.contact.dob,
                address: this.contact.address,
                emails: this.contact.emails.filter(
                    (email) => email.emailAddress
                ),
                phones: this.contact.phones.filter(
                    (phone) => phone.phoneNumber
                ),
                notes: this.contact.notes,
                picture: this.uploadContactPictureFile,
            };

            const { error, contact, message } = await this.$store.dispatch(
                "insertContact",
                newContact
            );

            if (error) {
                this.showFlash(flashMessages.errorUpdate);
                return;
            }

            if (this.uploadContactPictureFile) {
                const formData = new FormData();
                formData.append("picture", this.uploadContactPictureFile);
                formData.append("contactId", contact.id);
                const { error } = await this.$store.dispatch(
                    "uploadPicture",
                    formData
                );
                if (error) {
                    this.showFlash(flashMessages.errorPictureUpload);
                    this.selectedContactPicture = null;
                    return;
                }
            } else if (
                this.contactPicture &&
                this.contactPictureMarkedForDelete
            ) {
                const { error } = await this.$store.dispatch(
                    "deletePicture",
                    contact.id
                );
                if (error) {
                    alert("ERROR!!!");
                    this.showFlash(flashMessages.errorPictureDelete);
                    this.selectedContactPicture = null;
                    return;
                }
            }

            this.showFlash(flashMessages.successUpdate);

            this.$router.push({
                name: "ContactDetails",
                params: { id: contact.id },
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
    },
};
</script>
