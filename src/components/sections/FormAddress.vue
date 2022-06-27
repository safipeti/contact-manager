<template>
    <ul class="address">
        <li>
            <div class="form-element">
                <label class="address-label">Street</label>
                <input type="text" v-model="contact.address.street" />
            </div>
        </li>
        <li>
            <div class="form-element">
                <label class="address-label">City</label>
                <input type="text" v-model="contact.address.city" />
            </div>
        </li>
        <li>
            <div class="form-element">
                <label class="address-label">ZIP Code</label>
                <input type="text" v-model="contact.address.zipCode" />
            </div>
        </li>
        <li>
            <div class="form-element">
                <label class="address-label">Country</label>
                <input type="text" v-model="contact.address.country" />
            </div>
        </li>
        <li>
            <div class="form-element">
                <label class="address-label">Misc</label>
                <input type="text" v-model="contact.address.misc" />
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ["contact"],
};
</script>

<style></style>
