<template>
    <ul class="data-list" v-if="contact.phones.length > 1">
        <li
            class="data-list-item"
            v-for="(phone, i) in contact.phones.filter(
                (phones) => phones.phoneNumber
            )"
            :key="i"
        >
            <span>{{ phone.phoneNumber }}</span>
            <span class="label">{{ phone.type }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["contact"],
};
</script>

<style></style>
