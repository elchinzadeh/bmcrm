<template>
    <div class="card-view custom-scrollbar">
        <div class="card-view__list" v-for="list in lists" :key="list.type">
            <div
                class="list__header"
                :style="{
                    color: $gbUtilities.getStatusColor(list.type).main,
                    borderColor: $gbUtilities.getStatusColor(list.type).main,
                    backgroundColor: $gbUtilities.getStatusColor(list.type)
                        .secondary,
                }"
            >
                {{ list.title }}
            </div>
            <div class="list__content">
                <OrderCard
                    v-for="item in getListItems(list.type)"
                    :key="item.id"
                    :data="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "CardView",
    components: {
        OrderCard: () => import("./OrderCard.vue"),
    },
    data() {
        return {
            lists: [
                {
                    type: "PENDING",
                    title: this.$t('order.pending'),
                },
                {
                    type: "ACCEPTED",
                    title: this.$t('order.accepted'),
                },
                {
                    type: "IN_PROGRESS",
                    title: this.$t('order.in_progress'),
                },
                {
                    type: "DONE",
                    title: this.$t('order.done'),
                },
                {
                    type: "CANCELED",
                    title: this.$t('order.canceled'),
                },
            ],
        };
    },
    methods: {
        getListItems(status) {
            return this.orders.filter((item) => item.status === status);
        },
    },
    computed: {
        ...mapGetters("OrdersCalendar", ["orders"]),
    },
};
</script>

<style lang="scss" scoped>
.card-view {
    display: flex;
    min-width: 100%;
    overflow: auto;

    &__list {
        min-width: 300px;
        flex: 1;
        padding: 20px 16px;

        &:first-child {
            padding-left: 0;
        }
        &:last-child {
            padding-right: 0;
        }

        &:not(:last-child) {
            border-right: 1px solid #eeeeee;
        }

        .list {
            &__header {
                height: 50px;
                padding: 8px;
                font-weight: 500;
                font-size: 14px;
                line-height: 14px;
                display: flex;
                align-items: center;
                text-transform: uppercase;
                border-bottom: 2px solid transparent;
                margin-bottom: 8px;

                &--requested {
                    background: #f5eefc;
                    color: #bb6bd9;
                    border-color: #bb6bd9;
                }
                &--in-progress {
                    background: rgba(86, 204, 242, 0.1);
                    color: #2d9cdb;
                    border-color: #2d9cdb;
                }
                &--checked {
                    background: rgba(50, 26, 152, 0.1);
                    color: #321a98;
                    border-color: #321a98;
                }
                &--on-delivery {
                    background: rgba(255, 172, 50, 0.1);
                    color: #ffb648;
                    border-color: #ffb648;
                }
            }
        }
    }
}
</style>