<template>
    <div class="form-element">
        <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="contact.notes"
        ></textarea>
    </div>
</template>

<script>
export default {
    props: ["contact"],
};
</script>

<style></style>
