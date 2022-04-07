<template>
    <el-card shadow="none">
        <el-row class="platforms">
            <el-col :span="8">
                <div class="platforms__text">
                    <div class="title">{{ $t("order.platforms") }}</div>
                    <div class="legends">
                        <Legend :label="$t('order.web')" color="#8ECB7F" />
                        <Legend :label="$t('order.app')" color="#2C80E2" />
                    </div>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="chart">
                    <apexchart
                        ref="platforms"
                        :options="chartOptions"
                        :series="series"
                    />
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import API from "@/api/widget";

export default {
    name: "Platforms",
    components: {
        Legend: () => import("@/components/common/Legend"),
    },
    data() {
        return {
            series: [0, 0],
            chartOptions: {
                chart: {
                    type: "donut",
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: "40%",
                        },
                    },
                },
                legend: {
                    show: false,
                },
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return val;
                    },
                    // background: {
                    //     enabled: true,
                    //     foreColor: "#222222",
                    //     padding: 4,
                    //     borderRadius: 20,
                    //     borderWidth: 0,
                    //     borderColor: "#fff",
                    //     opacity: 1,
                    //     dropShadow: {
                    //         enabled: false,
                    //     },
                    // },
                    dropShadow: {
                        enabled: false,
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
        };
    },
    mounted() {
        this.getPlatformOrders();
    },
    methods: {
        getPlatformOrders() {
            API.getPlatformOrders().then((res) => {
                this.$refs.platforms.updateSeries([
                    Number(res.data.app.toFixed(2)),
                    Number(res.data.web.toFixed(2)),
                ]);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.platforms {
    display: flex;

    &__text {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .legends {
        margin-top: auto;
    }

    // &::v-deep {
    //     .apexcharts-datalabels rect {
    //         height: 30px;
    //         width: 30px;
    //     }

    //     .apexcharts-datalabels text {
    //         transform: translate(5px, 8px);
    //     }
    // }
}
</style>
