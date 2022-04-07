<template>
    <div>
        <el-row>
            <el-col :span="17">
                <Statistic />

                <el-row class="mb-30">
                    <el-col :span="16">
                        <Calendar />
                    </el-col>
                    <el-col :span="8" class="pl-30">
                        <MonthlyRevenue />
                    </el-col>

                    <div class="clearfix"></div>

                    <el-row class="mt-65">
                        <Orders />
                    </el-row>
                    <el-row class="mt-50">
                        <Employees />
                    </el-row>
                </el-row>
            </el-col>

            <el-col :span="7" class="pl-30">
                <YouBoard />
                <Task />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    components: {
        YouBoard: () => import("@/components/Dashboard/YouBoard"),
        Task: () => import("@/components/Dashboard/Task"),
        Statistic: () => import("@/components/Dashboard/Statistic"),
        MonthlyRevenue: () => import("@/components/Dashboard/MonthlyRevenue"),
        Calendar: () => import("@/components/Dashboard/Calendar"),

        Orders: () => import("@/views/Dashboard/Orders"),
        Employees: () => import("@/views/Dashboard/Employees"),
    },
    methods: {
        ...mapActions("Orders", ["getDashboardOrders"]),
    },
    async mounted() {
        // const loading = this.$loading({
        // 	lock: true,
        // 	text: 'Loading',
        // 	spinner: 'el-icon-loading',
        // 	background: 'rgba(0, 0, 0, 0.7)'
        // });
        await this.getDashboardOrders({
            period: "YEAR",
            size: 5,
            number: 0,
            sort: "id,DESC",
        });
        // loading.close();
    },
};
</script>

<style lang="scss">
.bg-purple-dark {
    background: #99a9bf;
}
.bg-purple {
    background: #d3dce6;
}
.bg-purple-light {
    background: #e5e9f2;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>
