<template>
    <el-drawer title="I am the title" :visible.sync="visible" direction="rtl">
        <template slot="title">
            <div class="title">
                <Icon name="location" color="#ffffff" :size="22" />
                {{ $t('order.delivery') }}
                <span class="title__order-id">#12345</span>
            </div>
        </template>

        <template>
            <h3>{{ $t('order.history_of_order') }}</h3>
            <div class="summary">
                <div class="dates">
                    <div class="dates__start">15 Aug, 2021, 14:10</div>
                    <div class="dates__separator"></div>
                    <div class="dates__end">16 Aug, 2021, 20:00</div>
                </div>
                <div class="addresses">
                    <div class="addresses__from">
                        Nieuwe Hescheweg 2905342 NM Oss
                    </div>
                    <div class="addresses__to">
                        Zoggelsestraat 60, 5384 VE Heesch
                    </div>
                </div>
            </div>
            <el-timeline>
                <el-timeline-item
                    v-for="item in history"
                    :key="item.id"
                    :class="{ active: true }"
                >
                    <div class="delivery__title">{{ item.status }}</div>
                    <div class="delivery__content">
                        <Avatar :size="24" :image="item.updatedBy.image" />
                        <div class="delivery__user">
                            {{ item.updatedBy.fullName }}, <br />
                            {{ item.updatedBy.position }}
                        </div>
                        <div class="delivery__date">
                            {{ $gbUtilities.getDate(item.date).fullTime }},
                            <br />
                            {{ $gbUtilities.getDate(item.date).fullDate }}
                        </div>
                    </div>
                </el-timeline-item>
            </el-timeline>
        </template>
    </el-drawer>
</template>

<script>
import { mapGetters } from "vuex";
import OrderAPI from "@/api/order";

export default {
    name: "OrderHistory",
    data() {
        return {
            history: [],
        };
    },
    methods: {
        getDeliveryHistory(id) {
            OrderAPI.getOrderDelivery(id).then((res) => {
                this.history = res.data;
            });
        },
    },
    computed: {
        ...mapGetters("Orders", ["activeOrderDeliveryId"]),
        visible: {
            get() {
                return Boolean(this.activeOrderDeliveryId);
            },
            set(val) {
                if (val === false) {
                    this.$store.dispatch(
                        "Orders/setActiveOrderDeliveryId",
                        null
                    );
                }
            },
        },
    },
    watch: {
        activeOrderDeliveryId(val) {
            if (val) {
                this.getDeliveryHistory(val);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
/deep/ {
    h3 {
        margin: 0;
        font-weight: bold;
        font-size: 18px;
        line-height: 32px;
        text-transform: uppercase;
    }
    .summary {
        margin-top: 22px;

        .dates {
            display: flex;
            font-weight: 500;
            font-size: 10px;
            line-height: 14px;
            color: #767676;
            align-items: center;

            &__separator {
                width: 80px;
                height: 1px;
                background-color: #aaaaaa;
                margin: 0 10px;
            }
        }
        .addresses {
            margin-top: 12px;
            display: flex;
            justify-content: space-between;

            & > * {
                width: 45%;
                font-weight: 500;
                font-size: 14px;
                line-height: 17px;
            }
        }
    }
    .el-timeline {
        margin-top: 60px;
        padding-left: 12px;

        &-item {
            &.active {
                .el-timeline-item__node--normal {
                    border-color: #8ecb7f;
                }
                .el-timeline-item__tail {
                    border-color: #8ecb7f;
                }
            }

            &__node--normal {
                width: 11px;
                height: 11px;
                border: 3px solid #aaaaaa;
                box-sizing: border-box;
                background-color: #ffffff;
            }
            &__tail {
                border-color: #aaaaaa;
            }
        }
    }
    .delivery {
        &__title {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
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