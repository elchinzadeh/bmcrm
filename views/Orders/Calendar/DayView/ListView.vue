<template>
    <Table :loading="loading" :rows="tableData" :columns="columns" />
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "List",
    data() {
        return {
            columns: [
                {
                    prop: "label",
                    label: this.$t("order.label"),
                    sortable: true,
                    class: "cell--label",
                    width: 90,
                    render: (row) => {
                        return `
                            <img src="${row.label}" />
                        `;
                    },
                },
                {
                    prop: "photo",
                    label: this.$t("order.photo"),
                    class: "cell--photo",
                    width: 70,
                    render: (row) => {
                        return `
                            <img src="${row.photo}" />
                        `;
                    },
                },
                {
                    prop: "product",
                    label: this.$t("order.product"),
                    class: "cell--product",
                    render: (row) => {
                        return `
                            <div class="product__name">${row.product}</div>
                            ${
                                row?.customizations?.[0]
                                    ? `<div class="product__size">${row.customizations[0]?.name}: ${row.customizations[0]?.value}</div>`
                                    : ""
                            }
                        `;
                    },
                },
                {
                    prop: "orderId",
                    label: this.$t("order.order"),
                    render: (row) => {
                        return "#" + row.orderId;
                    },
                },
                {
                    prop: "client",
                    label: this.$t("order.client"),
                },
                {
                    prop: "price",
                    label: this.$t("order.price"),
                    sortable: true,
                },
                {
                    prop: "orderCreateType",
                    label: this.$t("order.from"),
                },
                {
                    prop: "status",
                    label: this.$t("order.status"),
                    component: () => import("@/components/common/Tag"),
                    props: (row) => ({
                        label: row.status,
                        type: row.status,
                        color: this.$gbUtilities.getStatusColor(row.status),
                    }),
                },
                {
                    prop: "assigned",
                    label: this.$t("order.assigned"),
                },
                {
                    prop: "address",
                    label: this.$t("order.delivery_address"),
                    width: 160,
                },
                {
                    prop: "date",
                    label: this.$t("order.date"),
                    sortable: true,
                    render: (row) => {
                        return row.date;
                    },
                },
                {
                    prop: "deliveryDate",
                    label: this.$t("order.delivery_date"),
                    sortable: true,
                    render: (row) => {
                        return row.deliveryDate;
                    },
                },
            ],
        };
    },
    computed: {
        ...mapGetters("OrdersCalendar", {
            tableData: "orders",
            loading: "loading",
        }),
    },
};
</script>
