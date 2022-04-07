<template>
    <div class="statistics">
        <el-row :gutter="14">
            <el-col :span="8">
                <IncomingOrders />
            </el-col>
            <el-col :span="16">
                <PopularOrdersTime />
            </el-col>
            <el-col :span="6">
                <TodaysOrders />
            </el-col>
            <el-col :span="12">
                <OrdersStatuses />
            </el-col>
            <el-col :span="6">
                <Platforms />
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Statistics",
    components: {
        IncomingOrders: () => import("./IncomingOrders"),
        PopularOrdersTime: () => import("./PopularOrdersTime"),
        TodaysOrders: () => import("./TodaysOrders"),
        OrdersStatuses: () => import("./OrdersStatuses"),
        Platforms: () => import("./Platforms"),
    },
};
</script>

<style lang="scss" scoped>
.statistics {
    .el-row {
        display: flex;
        flex-wrap: wrap;
    }

    .el-col {
        margin-bottom: 14px;
    }

    .el-card {
        &__body {
            padding: 15px 20px;
        }
    }

    &::v-deep {
        .title {
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #222222;
        }
    }
}
</style>