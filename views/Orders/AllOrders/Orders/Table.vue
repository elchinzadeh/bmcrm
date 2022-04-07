<template>
    <div class="custom-table">
        <Table
            :loading="loading"
            :rows="tableData"
            :columns="columns"
            @sortChange="handleSort"
        >
            <template slot="menu" slot-scope="scope">
                <button class="actions__button">
                    <Icon name="three-dots" :size="16" />
                </button>
                <div class="actions__menu">
                    <div
                        class="actions__menu__item"
                        @click="openOrder(scope.row.orderId)"
                    >
                        <Icon name="eye" color="#ffffff" />
                        {{ $t("order.view_order") }}
                    </div>
                    <div
                        class="actions__menu__item"
                        @click="openHistory(scope.row.orderId)"
                    >
                        <Icon name="history" color="#ffffff" />
                        {{ $t("order.history_of_changes") }}
                    </div>
                    <!-- <div
                        class="actions__menu__item"
                        @click="openDelivery(scope.row.orderId)"
                    >
                        <Icon name="location-white" color="#ffffff"/>
                        {{ $t("order.delivery") }}
                    </div> -->
                </div>
            </template>
        </Table>

        <div class="pagination">
            <span>{{ $t("pagination.row_per_page") }}</span>
            <el-select v-model="pageSize" placeholder="">
                <el-option
                    v-for="item in [10, 20, 30]"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
            <el-pagination
                :page-size="pageSize"
                :current-page="pageNumber"
                layout="prev, pager, next"
                :total="paginationData.totalElements"
                @current-change="setPageNumber"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "AllOrders",
    data() {
        const getLabelImage = (label) => {
            return this.$gbUtilities.getLabelImage(
                this.labels.find((l) => l.id === label).type
            );
        };

        return {
            columns: [
                {
                    prop: "label",
                    label: this.$t("order.label"),
                    sortable: false,
                    class: "cell--label",
                    width: 90,
                    component: () => import("@/components/common/Avatar"),
                    props: (row) => ({
                        image: getLabelImage(row.label),
                    }),
                },
                {
                    prop: "photo",
                    label: this.$t("order.photo"),
                    class: "cell--photo",
                    width: 70,
                    render: (row) => {
                        return `<img src="${row.photo}" />`;
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
    mounted() {
        this.filterOrders();
    },
    computed: {
        ...mapGetters({
            tableData: "Orders/allOrders",
            loading: "Orders/dataLoading",
            filterData: "Orders/filterData",
            paginationData: "Orders/paginationData",
        }),
        ...mapGetters("General", ["labels"]),
        pageSize: {
            get() {
                return this.filterData.query.size;
            },
            set(val) {
                this.setFilterData({
                    query: {
                        size: val,
                    },
                });
            },
        },
        pageNumber() {
            return this.filterData.query.page;
        },
    },
    methods: {
        ...mapActions("Orders", ["setFilterData", "filterOrders"]),
        handleSort({ column, order }) {
            let prop = column.property;
            order = order === "ascending" ? "ASC" : "DESC";

            if (prop === "price") {
                prop = "orderPrice";
            }
            if (prop === "deliveryDate") {
                prop = "deliveryInfo.startDeliveryWindow";
            }
            this.setFilterData({
                query: {
                    sort: `${prop},${order}`,
                },
            });
        },
        openOrder(id) {
            this.$router.push({
                name: "Order",
                params: {
                    id,
                },
            });
        },
        openHistory(id) {
            this.$store.dispatch("Orders/setActiveOrderHistoryId", id);
        },
        openDelivery(id) {
            this.$store.dispatch("Orders/setActiveOrderDeliveryId", id);
        },
        setPageNumber(val) {
            this.setFilterData({
                query: {
                    page: val,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
/deep/ {
    .cell {
        &--label {
            background-color: transparent;
            img {
                background-color: transparent;
                object-fit: contain;
                border-radius: 0;
            }
        }
    }
}
</style>
