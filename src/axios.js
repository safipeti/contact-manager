import axios from "axios";
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("contact_manager_access_token");
