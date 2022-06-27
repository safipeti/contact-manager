import axios from "axios";
import flashMessages from "../assets/js/flashMessages";

export const contactPictures = {
    data() {
        return {
            uploadContactPictureFile: null,
            selectedContactPicture: null,
        };
    },

    methods: {
        handleContactPictureSelect(ev) {
            const file = ev.target.files[0];

            if (file["type"].split("/")[0] !== "image") {
                this.showFlash(flashMessages.errorNotPicture);
                return;
            }

            if (file.size > 300000) {
                this.showFlash(flashMessages.errorPictureTooBig);
            }

            this.uploadContactPictureFile = file;
            let reader = new FileReader();
            reader.onload = (e) => {
                this.selectedContactPicture = reader.result;
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        },

        async uploadContactPicture(contactId) {
            let formData = new FormData();

            formData.append("picture", this.uploadContactPictureFile);

            return await axios.post(`api/upload/${contactId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        },

        async deleteContactPicture(contactId) {
            return await axios.post("api/delete-contact-picture", {
                contactId,
            });
        },
    },

    computed: {
        contactPicture() {
            if (this.contact.contact_picture) {
                return `${process.env.VUE_APP_BASE_URL}/${this.contact.contact_picture.filePath}`;
            }
            return null;
        },
    },
};
