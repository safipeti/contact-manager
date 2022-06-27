import axios from "axios";
export default {
    // payload is type of FormData
    async insertContact(context, payload) {
        try {
            if (payload.id === null || payload.id === undefined) {
                const response = await axios.post("contacts", payload);
                return response.data;
            } else {
                const response = await axios.post(
                    `contacts/${payload.id}?_method=PATCH`,
                    payload
                );
                return response.data;
            }
        } catch (error) {
            return { error };
        }
    },

    async loadContact(context, payload) {
        try {
            const response = await axios.get(`contacts/${payload.id}`);
            const contact = response.data;
            if (!response.data.error) {
                context.commit("setContact", contact);
            }
            return response.data;
        } catch (error) {
            return { error };
        }
    },

    async deleteContact(context, payload) {
        try {
            const response = await axios.delete(`contacts/${payload.id}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            return { error };
        }
    },

    async uploadPicture(context, payload) {
        try {
            const response = await axios.post("upload", payload);
            return response.data;
        } catch (error) {
            return { error };
        }
    },

    async deletePicture(context, payload) {
        try {
            const response = await axios.post("delete-picture", {
                contactId: payload,
            });
            return response.data;
        } catch (error) {
            return { error };
        }
    },

    async loadContacts(context, payload) {
        try {
            const response = await axios.get("contacts", {
                params: {
                    params: {
                        page: context.getters.currentPage,
                        searchTerm: context.getters.searchTerm,
                        limit: context.getters.limit,
                    },
                },
            });
            const contacts = response.data.contacts;
            const totalContacts = response.data.totalContacts;
            if (!response.data.error) {
                context.commit("setContacts", contacts);
                context.commit("setTotalPages", totalContacts);
            }
            return response.data;
        } catch (error) {
            return { error };
        }
    },

    setError(context, errorMsg) {
        context.commit("setError", errorMsg);
    },
};
