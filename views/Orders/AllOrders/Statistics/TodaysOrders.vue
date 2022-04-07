<template>
    <el-card class="todays-orders" shadow="none">
        <div class="title">{{ $t("order.todays_orders") }}</div>
        <el-row>
            <el-col :span="12">
                <b>{{ received }}</b>
                <div class="subtitle">{{ $t("order.to_be_received") }}</div>
            </el-col>
            <el-col :span="12">
                <b>{{ delivered }}</b>
                <div class="subtitle">{{ $t("order.to_be_delivered") }}</div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import API from "@/api/order";
export default {
    name: "TodaysOrders",
    data() {
        return {
            received: 0,
            delivered: 0,
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            API.getTodaysOrders().then((response) => {
                this.received = response.data.incoming;
                this.delivered = response.data.upcoming;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.todays-orders {
    .title {
        margin-bottom: 20px;
    }
    b {
        font-weight: 600;
        font-size: 30px;
        line-height: 29px;
        color: #222222;
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
                    justify-content: center;
                }
            }
        }
    }
}
</style>
