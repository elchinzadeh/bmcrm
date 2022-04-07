<template>
    <div class="orders-page">
        <!-- Tabs -->
        <el-tabs v-model="activeTab">
            <el-tab-pane
                v-for="tab in tabs"
                :key="tab.name"
                :label="tab.label"
                :name="tab.name"
            >
                <component :is="tab.component" />
            </el-tab-pane>
        </el-tabs>
        <OrderHistory />
        <!-- <OrderDelivery /> -->
    </div>
</template>

<script>
export default {
    name: "Orders",
    components: {
        OrderHistory: () => import("./OrderHistory"),
        // OrderDelivery: () => import("./OrderDelivery"),
    },
    data() {
        return {
            activeTab: "allOrders",
            tabs: [
                {
                    label: this.$t('order.all_orders'),
                    name: "allOrders",
                    component: () => import("./AllOrders"),
                },
                {
                    label: this.$t('order.calendar'),
                    name: "calendar",
                    component: () => import("./Calendar"),
                },
            ],
        };
    },
};
</script>