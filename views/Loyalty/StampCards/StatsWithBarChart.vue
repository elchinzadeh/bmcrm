<template>
    <div class="stats-with-bar-chart">
        <div class="header">
            <div class="title">
                <div class="count">{{ count }}</div>
                <div class="subtitle">{{ subtitle }}</div>
            </div>
            <!-- <div class="all">All</div> -->
        </div>
        <div class="chart">
            <ul>
                <li v-for="item in list" :key="item.id">
                    <Avatar :image="item.image" :size="18" />
                    <h4>{{ item.fullName }}</h4>
                    <div class="bar">
                        <div
                            class="bar__fill"
                            :class="'bar__fill--' + color"
                            :style="`width: ${getPercent(item.count)}%`"
                        ></div>
                        <div class="bar__count">{{ item.count }}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "StatsWithBarChart",
    props: {
        subtitle: {
            type: String,
            required: true,
        },
        count: {
            type: Number,
            required: true,
        },
        list: {
            type: Array,
            required: true,
        },
        color: {
            type: String,
            required: false,
            default: "green",
            validator(val) {
                return ["green", "blue"].includes(val);
            },
        },
    },
    data() {
        return {
            maxCount: 0,
        };
    },
    mounted() {
        this.maxCount = this.list
            .map((v) => Number(v.count))
            .sort((a, b) => a - b)
            .reverse()[0];
    },
    methods: {
        getPercent(num) {
            return (num / this.maxCount) * 100;
        },
    },
    watch: {
        list(val) {
            this.maxCount = val
                .map((v) => Number(v.count))
                .sort((a, b) => a - b)
                .reverse()[0];
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.stats-with-bar-chart {
    background: #f9f9f9;
    border: 1px solid #eeeeee;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 18px 30px;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            .count {
                font-weight: 600;
                font-size: 24px;
                line-height: 29px;
                text-transform: uppercase;
                color: #262626;
            }
        }
        .subtitle {
            font-size: 12px;
            line-height: 15px;
            color: #262626;
        }
    }

    .chart {
        margin-top: 30px;
        ul {
            list-style-type: none;
            padding: 0;

            li {
                display: flex;
                align-items: center;
                height: 26px;

                .avatar {
                }

                h4 {
                    font-weight: bold;
                    font-size: 12px;
                    line-height: 15px;
                    color: #262626;
                    margin: 0 10px;
                    width: 150px;
                }

                .bar {
                    margin: 0 36px;
                    flex: 1;
                    display: flex;
                    align-items: center;
                    height: 100%;
                    border-left: 1px solid #aaaaaa;

                    &__fill {
                        height: 10px;
                        width: 70%;

                        &--green {
                            background: #8ecb7f;
                        }
                        &--blue {
                            background: #2c80e2;
                        }
                    }

                    &__count {
                        margin-left: 15px;
                        font-weight: bold;
                        font-size: 10px;
                        line-height: 12px;
                        color: #262626;
                    }
                }
            }
        }
    }
}
</style>
