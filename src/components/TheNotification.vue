<template>
    <transition name="fadeAway">
        <div class="flash-card" :class="flashType" v-if="flashMsg">
            <h2 class="flash-card-title">
                Message
            </h2>

            <p>{{ flashMsg }}</p>
            <div class="flash-card-actions">
                <button
                    class="dismiss"
                    @click.prevent="dismiss"
                    aria-label="Dismiss Flash"
                >
                    CLOSE
                </button>
            </div>
        </div>
    </transition>
    <div class="flash-container"></div>
</template>

<script>
export default {
    name: "TheNotification",
    methods: {
        dismiss() {
            this.$store.dispatch("resetFlash");
        },
    },
    computed: {
        flash() {
            return this.$store.getters.flashMsg != "";
        },
        flashType() {
            return this.$store.getters.flashType;
        },
        flashMsg() {
            return this.$store.getters.flashMsg;
        },
    },
};
</script>

<style scoped>
.flash-card {
    border-radius: 5px;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, 50%);
    /* max-width: 400px; */
    width: 50%;
    min-width: 200px;
    overflow: hidden;
    z-index: 1000;
}
.flash-card.success {
    color: #8ce99a;
    background: #ebfbee;
    margin: 0 auto;
}
.flash-card.error {
    color: #f07575;
    background: #fce8e8;
    margin: 0 auto;
}
.flash-card p {
    padding: 1.6rem;
}
.flash-card-title {
    text-align: left;
    color: #ebfbee;
    padding: 5px 10px;
    font-size: 1.2em;
}
.flash-card.success .flash-card-title {
    background-color: #69db7c;
}

.flash-card.error .flash-card-title {
    background-color: #f07575;
}

.flash-card-actions {
    text-align: right;
    padding: 1rem;
}
.flash-card.flash-card.success .flash-card-actions {
    border-top: 1px solid #69db7c;
}
.flash-card.flash-card.error .flash-card-actions {
    border-top: 1px solid #f07575;
}

.flash-card-actions > button {
    cursor: pointer;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    border: none;
    font-weight: bold;
    color: #ebfbee;
}

.flash-card.error .flash-card-actions > button {
    background-color: #eb4747;
}
.flash-card.success .flash-card-actions > button {
    background-color: #8ce99a;
}
.flash-card-actions > button:hover {
    opacity: 0.8;
}

.fadeAway-enter-active {
    transition: all 0.3s ease;
}

.fadeAway-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.fadeAway-leave-to,
.fadeAway-enter {
    opacity: 0;
    /* transform: translateX(1000px); */
}
</style>
