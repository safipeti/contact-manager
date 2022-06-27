<template>
    <ul class="data-list" v-if="contact.emails.length > 1">
        <li
            class="data-list-item"
            v-for="(email, i) in contact.emails.filter(
                (email) => email.emailAddress
            )"
            :key="i"
        >
            <span>{{ email.emailAddress }}</span>
            <span class="label">{{ email.type }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["contact"],
};
</script>

<style></style>
