<template>
    <div class="stats-with-column-chart">
        <div class="content">
            <div class="title">
                <div class="image" :class="'image--' + color">
                    <Icon :name="icon" />
                </div>
                <div class="count">{{ count }}</div>
            </div>
            <div class="subtitle">{{ subtitle }}</div>
        </div>
        <div class="chart">
            <Chart color="green" :series="series" :text="dateRange" />
        </div>
    </div>
</template>

<script>
import Chart from "@/components/Dashboard/BarChart";

export default {
    name: "StatsWithColumnChart",
    components: {
        Chart,
    },
    props: {
        color: {
            type: String,
            required: false,
            default: "black",
            validator(val) {
                return ["black", "green"].includes(val);
            },
        },
        icon: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
        series: {
            type: Array,
            required: true,
        },
        dateRange: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.stats-with-column-chart {
    background: #f9f9f9;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 26px 40px;
    display: flex;
    justify-content: space-between;

    .content {
        .title {
            display: flex;
            align-items: center;

            .image {
                border-radius: 5px;
                width: 36px;
                height: 36px;
                display: flex;
                justify-content: center;
                align-items: center;

                &--black {
                    background: #222222;
                }
                &--green {
                    background: $primary;
                }

                .icon {
                    font-size: 16px;
                    color: #ffffff;
                }
            }
            .count {
                margin-left: 15px;
                font-weight: 600;
                font-size: 36px;
                line-height: 44px;
                text-transform: uppercase;
                color: #222222;
            }
        }
        .subtitle {
            margin-top: 10px;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            color: #222222;
        }
    }

    .chart {
    }
}
</style>
