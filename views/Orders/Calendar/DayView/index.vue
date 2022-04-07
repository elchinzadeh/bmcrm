<template>
    <div>
        <Calendar />
        <component :is="component" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "DayView",
    components: {
        Calendar: () => import("./Calendar"),
        ListView: () => import("./ListView"),
        CardView: () => import("./CardView/index.vue"),
    },
    computed: {
        ...mapGetters("OrdersCalendar", ["dataViewType"]),
        component() {
            const components = {
                list: "ListView",
                card: "CardView",
            };

            return components[this.dataViewType];
        },
    },
};
</script>