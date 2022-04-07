<template>
    <section class="usage-by-date">
        <header>
            Promocodes used
            <div class="total">{{ total }}</div>
        </header>
        <article>
            <div class="chart">
                <apexchart
                    ref="promocodes"
                    height="150"
                    :options="chartOptions"
                    :series="series"
                />
            </div>
        </article>
    </section>
</template>

<script>
import API from "@/api/promocode";
import moment from "moment";

export default {
    name: "UsageByDate",
    data() {
        return {
            series: [
                {
                    data: [],
                },
            ],
            chartOptions: {
                chart: {
                    height: 350,
                    type: "line",
                    zoom: {
                        enabled: false,
                    },
                    toolbar: {
                        show: false,
                    },
                },
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: "smooth",
                    width: 2,
                    colors: ["#8ECB7F"],
                },
                grid: {
                    show: false,
                },
                xaxis: {
                    categories: [],
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                },
                yaxis: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            total: 0,
        };
    },
    mounted() {
        this.getCountUsedByDates();
    },
    methods: {
        getCountUsedByDates() {
            API.getCountUsedByDates({
                params: {
                    startDate: moment().subtract(1, "years").unix() * 1000,
                },
            }).then((res) => {
                this.$refs.promocodes.updateSeries([
                    {
                        data: Object.values(res.data),
                    },
                ]);

                this.$refs.promocodes.updateOptions({
                    xaxis: {
                        categories: Object.keys(res.data).map((timestamp) =>
                            moment(timestamp, "x").format("MMM")
                        ),
                    },
                });

                this.total = Object.values(res.data).reduce(
                    (prev = 0, curr) => prev + curr
                );
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.usage-by-date {
    header {
        font-size: 14px;
        line-height: 17px;

        .total {
            font-weight: 600;
            font-size: 36px;
            line-height: 44px;
        }
    }
}
</style>
