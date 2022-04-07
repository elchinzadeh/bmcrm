<template>
    <div class="calendar-header">
        <div class="page-header-title">{{ $t('order.calendar') }}</div>
        <Switcher
            :options="pageViewTypeOptions"
            :value="pageViewType"
            @input="handlePageViewType"
        />
    </div>
</template>

<script>
export default {
    name: "Header",
    components: {
        Switcher: () => import("@/components/common/Switcher.vue"),
    },
    data() {
        return {
            pageViewTypeOptions: [
                {
                    value: "month",
                    label: this.$t('order.month'),
                },
                {
                    value: "day",
                    label: this.$t('order.day'),
                },
            ],
        };
    },
    mounted() {
        this.handlePageViewType(this.pageViewTypeOptions[1]);
    },
    methods: {
        handlePageViewType(val) {
            this.$store.dispatch("OrdersCalendar/setPageViewType", val);
        },
    },
    computed: {
        pageViewType() {
            return this.$store.getters["OrdersCalendar/pageViewType"];
        },
    },
};
</script>

<style lang="scss" scoped>
.calendar-header {
    margin-bottom: 14px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>