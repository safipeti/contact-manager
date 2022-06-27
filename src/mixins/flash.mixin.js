export default {
    methods: {
        showFlash(payload) {
            this.$store.dispatch("setFlash", payload);
            setTimeout(() => {
                this.$store.dispatch("resetFlash");
            }, 3000);
        },
    },
};
