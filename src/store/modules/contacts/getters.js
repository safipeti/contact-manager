export default {
    contact(state) {
        return state.contact;
    },
    contacts(state) {
        return state.contacts;
    },

    params(state) {
        return state.params;
    },
    totalContacts(state) {
        return state.contacts.length;
    },
};
