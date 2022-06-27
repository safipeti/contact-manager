<template>
    <ul class="data-list">
        <li v-for="(email, i) in contact.emails" :key="i">
            <div class="form-element">
                <select name="" id="">
                    <option>work</option>
                    <option selected>private</option>
                </select>
                <input
                    type="text"
                    v-model="email.emailAddress"
                    @input="addInput(i, 'emails', 'emailAddress')"
                    @keyup="del(i, 'emails', 'emailAddress')"
                />
                <span
                    class="delete-item"
                    v-if="email.emailAddress != null"
                    @click="removeInput(i, 'emails')"
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
