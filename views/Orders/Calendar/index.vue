<template>
    <div>
        <Header />
        <!-- <component :is="DayView"> -->
        <component :is="component" />
    </div>
</template>

<script>
export default {
    name: "Calendar",
    components: {
        Header: () => import("./Header"),
        DayView: () => import("./DayView"),
        MonthView: () => import("./MonthView"),
    },
    mounted() {
        this.$store.dispatch("OrdersCalendar/getOrdersCount");
    },
    computed: {
        component() {
            const components = {
                day: "DayView",
                month: "MonthView",
            };
            return components[
                this.$store.getters["OrdersCalendar/pageViewType"]?.value
            ];
        },
    },
};
</script>