<template>
    <li class="contact-list-item">
        <router-link
            :to="{
                name: 'ContactDetails',
                params: { id: contact.id },
            }"
            class="contact-item"
        >
            <img
                v-if="contactPicture"
                :src="contactPicture"
                alt="Profile picture of {{contact.name}}"
                class="contact-img"
            />

            <img
                v-else
                class="no-profile-img"
                src="@/assets/noprofile.jpg"
                alt=""
            />
            <span class="contact-name">{{ contact.name }}</span>
            <div class="contact-details-icons">
                <span><i class="fas fa-chevron-right"></i></span>
            </div>
        </router-link>
    </li>
</template>

<script>
import { contactPictures } from "../mixins/picture.mixin";
export default {
    name: "ContactListItem",
    props: ["contact"],
    mixins: [contactPictures],
};
</script>
