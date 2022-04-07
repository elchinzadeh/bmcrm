<template>
    <section>
        <header>
            <div class="image">
                <img
                    :src="require(`@/assets/images/brand/${label.type}.svg`)"
                    :alt="label.name"
                />
            </div>
            <h2>{{ label.name }}</h2>
        </header>

        <main>
            <el-row :gutter="36">
                <el-col :span="12">
                    <StatsWithColumnChart
                        icon="card"
                        subtitle="Today`s used stamp cards"
                        :count="countUsedByToday"
                        :series="Object.values(countUsedLastWeek)"
                        :dateRange="getDateRangeText(countUsedLastWeek)"
                    />
                </el-col>
                <el-col :span="12">
                    <StatsWithColumnChart
                        color="green"
                        icon="bm"
                        subtitle="Today`s gived stamp card"
                        :count="countGivenByToday"
                        :series="Object.values(countGivenLastWeek)"
                        :dateRange="getDateRangeText(countGivenLastWeek)"
                    />
                </el-col>
                <el-col :span="12">
                    <StatsWithBarChart
                        subtitle="Today`s gived stamp card"
                        :count="totalCount"
                        :list="countByAccount"
                    />
                </el-col>
                <el-col :span="12">
                    <StatsWithBarChart
                        subtitle="Today`s gived stamp card"
                        :count="totalAmount"
                        :list="amountByAccount"
                        color="blue"
                    />
                </el-col>
            </el-row>
        </main>
    </section>
</template>

<script>
import StatsWithColumnChart from "./StatsWithColumnChart";
import StatsWithBarChart from "./StatsWithBarChart";
import API from "@/api/stampCard";
import moment from "moment";

export default {
    name: "StampCardsSection",
    props: {
        label: {
            type: Object,
            required: true,
        },
    },
    components: {
        StatsWithColumnChart,
        StatsWithBarChart,
    },
    data() {
        return {
            countUsedByToday: 0,
            countUsedLastWeek: {},
            countGivenByToday: 0,
            countGivenLastWeek: {},
            totalCount: 0,
            countByAccount: [],
            totalAmount: 0,
            amountByAccount: [],
        };
    },
    mounted() {
        this.getCountUsedByToday();
        this.getCountUsedByDates();
        this.getCountGivenByToday();
        this.getCountGivenByDates();
        this.getCountTotal();
        this.getCountByAccount();
        this.getTotalAmount();
        this.getAccountsWithStamps();
    },
    methods: {
        getCountUsedByToday() {
            API.getCountUsedByToday({
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.countUsedByToday = res.data || 0;
            });
        },
        getCountUsedByDates() {
            API.getCountUsedByDates({
                params: {
                    startDate: moment().subtract(6, "days").unix() * 1000,
                },
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.countUsedLastWeek = res.data;
            });
        },
        getCountGivenByToday() {
            API.getCountGivenByToday({
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.countGivenByToday = res.data || 0;
            });
        },
        getCountGivenByDates() {
            API.getCountGivenByDates({
                params: {
                    startDate: moment().subtract(6, "days").unix() * 1000,
                },
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.countGivenLastWeek = res.data;
            });
        },
        getCountTotal() {
            API.getCountTotal({
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.totalCount = res.data || 0;
            });
        },
        getCountByAccount() {
            API.getCountByAccount({
                params: {
                    size: 8,
                },
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.countByAccount = res.data;
            });
        },
        getTotalAmount() {
            API.getTotalAmount({
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.totalAmount = res.data || 0;
            });
        },
        getAccountsWithStamps() {
            API.getAccountsWithStamps({
                params: {
                    size: 8,
                },
                headers: { tenantId: this.label.id },
            }).then((res) => {
                this.amountByAccount = res.data;
            });
        },

        getDateRangeText(dates) {
            if (!Object.keys(dates).length) return "";

            const first = Number(Object.keys(dates)[0]);
            const last = Number(Object.keys(dates).reverse()[0]);

            return (
                moment(first).format("D MMM") +
                " - " +
                moment(last).format("D MMM")
            );
        },
    },
};
</script>

<style scoped lang="scss">
section {
    margin-top: 30px;

    header {
        background: #f9f9f9;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;

        .image {
            margin-right: 12px;
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            border-radius: 5px;
            padding: 6px 12px;
            img {
                height: 32px;
            }
            transform: translateY(-1px);
        }

        h2 {
            font-weight: bold;
            font-size: 14px;
            line-height: 17px;
            text-transform: uppercase;
            color: #222222;
        }
    }

    .stats-with-bar-chart {
        margin-top: 26px;
    }
}
</style>
