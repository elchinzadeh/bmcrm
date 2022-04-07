<template>
    <el-drawer :visible.sync="visible" direction="rtl">
        <template slot="title">
            <div class="title">
                <Icon name="history" color="#ffffff" :size="22" />
                {{ $t('order.order_history') }}
                <span class="title__order-id">#12345</span>
            </div>
        </template>

        <template>
            <div
                class="history-card"
                v-for="(item, index) in data"
                :key="index"
            >
                <div class="history-card__title">{{ item.title }}</div>
                <div class="history-card__content">
                    <Avatar :size="24" :image="item.image" />
                    <div class="history-card__user">
                        {{ item.updatedBy.fullName }}
                        <!-- , <br />
                        Client -->
                    </div>
                    <div class="history-card__date" v-html="item.date"></div>
                </div>
            </div>
        </template>
    </el-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import API from "@/api/order";

export default {
    name: "OrderHistory",
    data() {
        return {
            data: [],
        };
    },
    methods: {
        ...mapActions("Orders", ["setActiveOrderHistoryId"]),
        getData() {
            API.getOrderHistory(this.activeOrderHistoryId).then((response) => {
                this.data = response.data;
            });
        },
    },
    computed: {
        ...mapGetters("Orders", ["activeOrderHistoryId"]),
        visible: {
            get() {
                return Boolean(this.activeOrderHistoryId);
            },
            set(val) {
                if (val === false) {
                    this.$store.dispatch(
                        "Orders/setActiveOrderHistoryId",
                        null
                    );
                }
            },
        },
    },
    watch: {
        visible() {
            this.getData();
        },
    },
};
</script>

<style lang="scss" scoped>
/deep/ {
    .history-card {
        background: #f9f9f9;
        border-radius: 15px;
        padding: 8px 21px 16px;

        &:not(:last-of-type) {
            margin-bottom: 10px;
        }

        &__title {
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
        }
        &__content {
            margin-top: 6px;
            display: flex;
            font-weight: 500;
            font-size: 11px;
            line-height: 15px;
            color: #767676;

            .avatar {
                margin-right: 10px;
            }
        }
        &__user {
            margin-right: auto;
        }
        &__date {
            font-size: 10px;
            text-align: right;
        }
    }
}
</style>