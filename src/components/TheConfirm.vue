<template>
    <div class="confirm-dialog-container">
        <div class="confirm-dialog-bg"></div>
        <div class="confirm-dialog">
            <p>Are you sure you want to delete it?</p>
            <div class="confirm-buttons">
                <button class="btn confirm-btn" @click="confirm">
                    Confirm
                </button>
                <button class="btn dismiss-btn" @click="dismiss">
                    Dismiss
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        dismiss() {
            this.$emit("dismiss-dialog");
        },
        confirm() {
            this.$emit("delete-confirmed");
        },
    },
};
</script>

<style scoped>
.confirm-dialog-bg {
    background-color: #000;
    opacity: 0.5;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100;
}

.confirm-dialog {
    background-color: #ebfbee;
    padding: 1rem;
    border-radius: 5px;
    position: absolute;
    z-index: 1000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.confirm-dialog p {
    margin: 1.5rem auto;
    margin-bottom: 2.5rem;
    width: 30rem;
    text-align: center;
}

.confirm-buttons {
    display: flex;
    justify-content: center;
    gap: 3rem;
}
.confirm-buttons button {
    text-transform: uppercase;
    font-weight: bold;
}

.confirm-btn {
    background-color: #f07575;
    color: #ebfbee;
}
.confirm-btn:hover {
    opacity: 0.8;
}
.dismiss-btn {
    background-color: #69db7c;
    color: #ebfbee;
}
.dismiss-btn:hover {
    opacity: 0.8;
}

.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.ok-btn {
    color: red;
    text-decoration: underline;
    line-height: 2.5rem;
    cursor: pointer;
}

.cancel-btn {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>
