<template>
    <ul class="data-list">
        <li v-for="(phone, i) in contact.phones" :key="i">
            <div class="form-element">
                <select name="" id="">
                    <option>mobile</option>
                    <option>work</option>
                    <option>home</option>
                </select>
                <input
                    type="text"
                    v-model="phone.phoneNumber"
                    @input="addInput(i, 'phones', 'phoneNumber')"
                    @keyup="del(i, 'phones', 'phoneNumber')"
                />
                <span
                    class="delete-item"
                    v-if="phone.phoneNumber != null"
                    @click="removeInput(i, 'phones')"
                    >&times;</span
                >
            </div>
        </li>
    </ul>
</template>

<script>
import { inputHandler } from "../../mixins/input.mixin";

export default {
    props: ["contact"],
    mixins: [inputHandler],
};
</script>

<style></style>
