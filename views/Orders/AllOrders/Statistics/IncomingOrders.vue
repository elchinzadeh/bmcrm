<template>
    <el-card shadow="none">
        <el-row class="incoming-orders">
            <el-col :span="12">
                <div class="chart">
                    <apexchart
                        ref="incomingOrders"
                        :options="chartOptions"
                        :series="series"
                    ></apexchart>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="title">{{ $t("order.incoming_orders") }}</div>
                <div class="legends">
                    <div class="legend">
                        <div class="legend__percent legend__percent--today">
                            {{ today }}%
                        </div>
                        <div class="legend__text">{{ $t("order.today") }}</div>
                    </div>
                    <div class="legend">
                        <div class="legend__percent legend__percent--tomorrow">
                            {{ tomorrow }}%
                        </div>
                        <div class="legend__text">
                            {{ $t("order.tomorrow") }}
                        </div>
                    </div>
                    <div class="legend">
                        <div class="legend__percent legend__percent--this-week">
                            {{ thisWeek }}%
                        </div>
                        <div class="legend__text">
                            {{ $t("order.this_week") }}
                        </div>
                    </div>
                    <div class="legend">
                        <div class="legend__percent legend__percent--next-week">
                            {{ nextWeek }}%
                        </div>
                        <div class="legend__text">
                            {{ $t("order.next_week") }}
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import API from "@/api/widget";

export default {
    name: "IncomingOrders",
    data() {
        return {
            today: 0,
            tomorrow: 0,
            thisWeek: 0,
            nextWeek: 0,
            series: [0, 0, 0, 0],
            chartOptions: {
                chart: {
                    type: "donut",
                },
                legend: {
                    show: false,
                },
                dataLabels: {
                    enabled: false,
                },
                tooltip: {
                    enabled: false,
                },
                colors: ["#8ecb7f", "#222222", "#c1c1c1", "#2C80E2"],
            },
        };
    },
    mounted() {
        this.getUpcomingOrders();
    },
    methods: {
        getUpcomingOrders() {
            API.getUpcomingOrders().then((res) => {
                const { today, tomorrow, thisWeek, nextWeek } = res.data;
                this.today = today;
                this.tomorrow = tomorrow;
                this.thisWeek = thisWeek;
                this.nextWeek = nextWeek;

                this.$refs.incomingOrders.updateSeries([
                    today || 1,
                    tomorrow || 1,
                    thisWeek || 1,
                    nextWeek || 1,
                ]);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.incoming-orders {
    .legends {
        margin-top: 20px;

        .legend {
            display: flex;
            align-items: center;
            margin-bottom: 2px;

            &__percent {
                width: 45px;
                font-weight: 600;
                font-size: 20px;
                line-height: 24px;
                text-transform: uppercase;

                &--today {
                    color: #8ecb7f;
                }
                &--tomorrow {
                    color: #222222;
                }
                &--this-week {
                    color: #c1c1c1;
                }
                &--next-week {
                    color: #2c80e2;
                }
            }
            &__text {
                margin-left: 16px;
                font-size: 12px;
                line-height: 15px;
                color: #222222;
            }
        }
    }
}
</style>
