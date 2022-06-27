<template>
    <h1 class="title">Add contact</h1>
    <form @submit.prevent="handleSubmit" v-if="contact">
        <div class="top-section">
            <section class="contact-picture" v-if="!selectedContactPicture">
                <input
                    class="contact-picture-file"
                    type="file"
                    @change="handleContactPictureSelect"
                />
                <span class="guide-text">Click to upload or drag image</span>
            </section>
            <section class="contact-picture" v-if="selectedContactPicture">
                <img :src="selectedContactPicture" alt="" />
            </section>
            <button
                v-if="selectedContactPicture"
                class="remove-profile-picture btn"
                @click="selectedContactPicture = null"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>
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
import { tabMixin } from "../../mixins/tab.mixin";
import { contactPictures } from "../../mixins/picture.mixin";
import FormPhone from "../../components/sections/FormPhone.vue";
import FormEmail from "../../components/sections/FormEmail.vue";
import FormAddress from "../../components/sections/FormAddress.vue";
import FormNote from "../../components/sections/FormNote.vue";
import flashMessages from "../../assets/js/flashMessages";

export default {
    mixins: [contactPictures, tabMixin, notifmixin],
    components: {
        "form-phone": FormPhone,
        "form-email": FormEmail,
        "form-address": FormAddress,
        "form-note": FormNote,
    },
    data() {
        return {
            activeTab: "phones",
            contact: {
                name: null,
                dob: null,
                notes: "",
                picture: null,

                phones: [{ type: "home", phoneNumber: null }],
                emails: [{ type: "private", emailAddress: null }],
                address: {
                    country: null,
                    city: null,
                    zipCode: null,
                    misc: null,
                    street: null,
                },
            },
            error: false,
        };
    },

    methods: {
        async handleSubmit() {
            if (!this.contact.name) {
                this.error = true;
                return;
            }

            const newContact = {
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
                this.showFlash(flashMessages.errorAdd);
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
            }

            this.showFlash(flashMessages.successAdd);

            this.$router.push({
                name: "ContactDetails",
                params: { id: contact.id },
            });
        },
    },
};
</script>
