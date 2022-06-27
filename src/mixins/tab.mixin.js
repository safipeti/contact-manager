import TheTab from "../components/sections/TheTab.vue";
export const tabMixin = {
    components: {
        "the-tab": TheTab,
    },
    data() {
        return {
            activeTab: "phones",
        };
    },
    methods: {
        setTab(tab) {
            this.activeTab = tab;
        },
    },
};
