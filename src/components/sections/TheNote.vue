<template>
    <p class="notes" v-if="contact.notes">
        {{ contact.notes }}
    </p>
</template>

<script>
export default {
    props: ["contact"],
};
</script>

<style></style>
