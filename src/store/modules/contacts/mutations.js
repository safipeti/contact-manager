export default {
    setContact(state, payload) {
        payload.emails.push({ type: "private", emailAddress: null });
        payload.phones.push({ type: "mobile", phoneNumber: null });
        if (!payload.address) {
            payload.address = {};
        }
        state.contact = payload;
    },

    setContacts(state, payload) {
        state.contacts = payload;
    },
};
