<template>
    <div class="orders-header">
        <div class="page-header-title">{{ $t("order.orders") }}</div>
        <Search
            v-model="search"
            :placeholder="$t('order.search_placeholder')"
            @submit="searchOnSubmit"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Header",
    components: {
        Search: () => import("@/components/common/Search"),
    },
    data() {
        return {
            search: "",
        };
    },
    methods: {
        ...mapActions("Orders", ["setFilterData", "filterOrders"]),
        searchOnSubmit() {
            this.setFilterData({
                body: {
                    keyWord: this.search,
                },
            });
        },
    },
    computed: {
        ...mapGetters("Orders", ["filterData"]),
    },
    watch: {
        "filterData.body.keyWord"(val) {
            this.search = val;
        },
    },
};
</script>

<style lang="scss" scoped>
.orders-header {
    display: flex;
    align-items: center;
}
</style>
