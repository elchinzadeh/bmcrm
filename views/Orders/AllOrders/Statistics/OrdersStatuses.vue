<template>
    <el-card class="orders-statuses" shadow="none">
        <div class="title">{{ $t("order.orders_statuses") }}</div>
        <el-row>
            <el-col :span="10">
                <div class="status status--purple">
                    <span class="subtitle">{{ $t("order.requested") }}</span>
                    <b>{{ REQUESTED }}</b>
                </div>
                <div class="status status--blue">
                    <span class="subtitle">{{ $t("order.on_delivery") }}</span>
                    <b>{{ ON_DELIVERY }}</b>
                </div>
                <div class="status status--indigo">
                    <span class="subtitle">{{ $t("order.in_progress") }}</span>
                    <b>{{ IN_PROGRESS }}</b>
                </div>
            </el-col>
            <el-col :span="10" :push="4">
                <div class="status status--yellow">
                    <span class="subtitle">{{ $t("order.delivered") }}</span>
                    <b>{{ DELIVERED }}</b>
                </div>
                <div class="status status--green">
                    <span class="subtitle">{{ $t("order.checked") }}</span>
                    <b>{{ CHECKED }}</b>
                </div>
                <div class="status status--coral">
                    <span class="subtitle">{{ $t("order.canceled") }}</span>
                    <b>{{ CANCELED }}</b>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import API from "@/api/widget";

export default {
    name: "OrdersStatuses",
    data() {
        return {
            REQUESTED: 0,
            ON_DELIVERY: 0,
            IN_PROGRESS: 0,
            DELIVERED: 0,
            CHECKED: 0,
            CANCELED: 0,
        };
    },
    mounted() {
        this.getOrderStatuses();
    },
    methods: {
        getOrderStatuses() {
            API.getOrderStatuses().then((res) => {
                const {
                    REQUESTED,
                    ON_DELIVERY,
                    IN_PROGRESS,
                    DELIVERED,
                    CHECKED,
                    CANCELED,
                } = res.data;
                this.REQUESTED = REQUESTED;
                this.ON_DELIVERY = ON_DELIVERY;
                this.IN_PROGRESS = IN_PROGRESS;
                this.DELIVERED = DELIVERED;
                this.CHECKED = CHECKED;
                this.CANCELED = CANCELED;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.orders-statuses {
    .title {
        margin-bottom: 20px;
    }
    .status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2px;

        &--purple b {
            color: #c486dc;
        }
        &--blue b {
            color: #2d9cdb;
        }
        &--indigo b {
            color: #321a98;
        }
        &--yellow b {
            color: #ffb648;
        }
        &--green b {
            color: #8ecb7f;
        }
        &--coral b {
            color: #fa8282;
        }
    }
    b {
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
    }
    .subtitle {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #767676;
    }

    /deep/ {
        .el-card__body {
            height: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;

            .el-row {
                flex: 1;

                .el-col {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                }
            }
        }
    }
}
</style>
