<template>
    <el-card shadow="none">
        <el-row class="popular-orders-time">
            <el-col :span="6">
                <div class="popular-orders-time__text">
                    <div class="title">
                        {{ $t("order.popular_orders_time") }}
                    </div>
                    <div class="date-range">{{ $t("order.this_week") }}</div>
                    <div class="legends">
                        <Legend
                            :label="$t('order.for_today')"
                            color="#222222"
                        />
                        <Legend
                            :label="$t('order.for_different_day')"
                            color="#2c80e2"
                        />
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <el-tabs v-model="activeTab">
                    <el-tab-pane
                        v-for="tab in tabs"
                        :key="tab"
                        :label="tab"
                        :name="tab"
                    />
                </el-tabs>
                <apexchart
                    ref="popularOrders"
                    height="150"
                    :options="chartOptions"
                    :series="series"
                />
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import API from "@/api/widget";
import moment from "moment";

export default {
    name: "PopularOrdersTime",
    components: {
        Legend: () => import("@/components/common/Legend"),
    },
    data() {
        return {
            series: [
                {
                    name: "For today",
                    data: [],
                },
                {
                    name: "For different day",
                    data: [],
                },
            ],
            chartOptions: {
                chart: {
                    type: "bar",
                    stacked: true,
                    toolbar: {
                        show: false,
                    },
                    zoom: {
                        enabled: false,
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: "50%",
                    },
                },
                xaxis: {
                    type: "category",
                    categories: ["9:00", "12:00", "15:00", "18:00", "21:00"],
                    tickPlacement: "between",
                    style: {
                        cssClass: "xaxis-label",
                    },
                },
                yaxis: {
                    show: false,
                },
                legend: {
                    show: false,
                },
                fill: {
                    opacity: 1,
                },
                grid: {
                    show: false,
                },
                colors: ["#222222", "#2C80E2"],
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            tabs: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            activeTab: "Mon",
            activeTabNo: 0,
            responseData: null,
        };
    },
    mounted() {
        this.getOrderStatisticsCurrentWeek();
        this.activeTab = this.tabs[moment().isoWeekday() - 1];
        this.activeTabNo = moment().isoWeekday() - 1;
    },
    methods: {
        getOrderStatisticsCurrentWeek() {
            API.getOrderStatisticsCurrentWeek().then((res) => {
                this.responseData = res.data;
                this.updateSeries();
            });
        },
        updateSeries() {
            if (!this.responseData) return;

            const weekDays = [
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ];

            this.$refs.popularOrders.updateSeries([
                {
                    name: "For today",
                    data: Object.values(
                        this.responseData.statisticsByCurrentWeek.chartPoint[
                            weekDays[this.activeTabNo]
                        ]
                    ),
                },
                {
                    name: "For different day",
                    data: Object.values(
                        this.responseData.statisticsByMostOfHour
                    ),
                },
            ]);
        },
    },
    watch: {
        activeTab() {
            this.updateSeries();
        },
    },
};
</script>

<style lang="scss">
.popular-orders-time {
    display: flex;

    &__text {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .date-range {
        margin-top: 7px;
        font-size: 14px;
        color: #767676;
    }

    .legends {
        margin-top: auto;
    }

    .el-tabs {
        &__nav {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        &__nav-wrap::after {
            display: none;
        }

        &__item {
            height: auto;
            flex: 1;
            text-align: center;
            font-size: 10px;
            line-height: 12px;
            padding-bottom: 6px;
        }
    }

    .apexcharts-xaxis-label tspan {
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        color: #262626;
    }
}
</style>
