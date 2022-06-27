<template>
    <ul
        class="data-list"
        v-if="
            contact.address.street ||
                contact.address.city ||
                contact.address.zipCode ||
                contact.address.country ||
                contact.address.misc
        "
    >
        <li class="data-list-item">
            <span>Street</span>
            <span>{{ contact.address.street }}</span>
        </li>
        <li class="data-list-item">
            <span>City</span>
            <span>{{ contact.address.city }}</span>
        </li>
        <li class="data-list-item">
            <span>ZIP Code</span>
            <span>{{ contact.address.zipCode }}</span>
        </li>
        <li class="data-list-item">
            <span>Country</span>
            <span>{{ contact.address.country }}</span>
        </li>
        <li class="data-list-item">
            <span>Misc</span>
            <span>{{ contact.address.misc }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["contact"],
};
</script>

<style></style>
