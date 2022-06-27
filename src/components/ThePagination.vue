<template>
    <section class="section-pagination">
        <ul class="pagination">
            <li class="page-item" v-if="currentPage > 1">
                <router-link
                    class="page"
                    :to="{ name: 'ContactList' }"
                    @click="paginate(currentPage - 1)"
                    ><i class="fa fa-chevron-left"></i
                ></router-link>
            </li>

            <li class="page-indicator" v-if="totalPages > 1">
                <span>{{ currentPage }}</span> &nbsp;/&nbsp;
                <span>{{ totalPages }}</span>
            </li>
            <li class="page-item" v-if="currentPage < totalPages">
                <router-link
                    :to="{
                        name: 'ContactList',
                        query: { page: currentPage + 1 },
                    }"
                    @click="paginate(currentPage + 1)"
                    class="page"
                    ><i class="fa fa-chevron-right"></i
                ></router-link>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    props: ["searchTerm"],
    computed: {
        totalPages() {
            return this.$store.getters.totalPages;
        },
        currentPage() {
            return this.$store.getters.currentPage;
        },
        limit() {
            return this.$store.getters.limit;
        },
    },
    methods: {
        paginate(currentPage) {
            if (currentPage >= 1 && currentPage <= this.totalPages) {
                this.$store.dispatch("setCurrentPage", currentPage);
                this.$store.dispatch("loadContacts");
            }
        },
    },
};
</script>
