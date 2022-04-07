<template>
    <div class="orders-filters">
        <div class="active-filters">
            <div
                class="active-filters__item"
                v-for="(filter, index) in activeFilters"
                :key="index"
            >
                {{ filter.label }}
                <Icon
                    name="cross"
                    color="#ffffff"
                    :size="10"
                    @click.native="removeFilter(filter)"
                />
            </div>
            <div
                class="active-filters__clear-all"
                @click="removeAllFilters"
                v-if="activeFilters.length"
            >
                <Icon name="cross" :size="22" />
                {{ $t("order.clear_all") }}
            </div>
        </div>
        <div class="filter-fields">
            <div class="title">{{ $t("order.filter") }}:</div>
            <div class="period">
                <el-button-group>
                    <el-button type="info" disabled>{{
                        $t("order.period")
                    }}</el-button>
                    <el-button type="default" @click="toggleShowPeriodCalendar">
                        <Icon name="date" :size="20" />
                        {{ $t("order.choose_period") }}

                        <vc-date-picker
                            class="period-calendar"
                            ref="periodCalendar"
                            v-if="showPeriodCalendar"
                            title-position="left"
                            :first-day-of-week="2"
                            :is-range="true"
                            color="green"
                            :value="period"
                            @input="periodOnChange"
                            @click.native.stop
                        >
                            <div slot="header-title" slot-scope="header">
                                {{ header.monthLabel }}
                            </div>
                            <span slot="header-left-button">
                                <font-awesome-icon
                                    icon="caret-left"
                                    size="1x"
                                />
                            </span>
                            <span slot="header-right-button">
                                <font-awesome-icon
                                    icon="caret-right"
                                    size="1x"
                                />
                            </span>
                        </vc-date-picker>
                    </el-button>
                    <el-button
                        type="default"
                        @click="periodSortOnChange(true)"
                        :class="{ active: filterData.body.incoming }"
                    >
                        {{ $t("order.incoming") }}
                    </el-button>
                    <el-button
                        type="default"
                        @click="periodSortOnChange(false)"
                        :class="{ active: filterData.body.upcoming }"
                    >
                        {{ $t("order.upcoming") }}
                    </el-button>
                </el-button-group>
            </div>
            <Select
                v-model="orderStatusesModel"
                :options="orderStatuses"
                placeholder="Status"
            />
            <!-- @change="statusOnChange" -->
            <Select
                :value="labelsModel"
                @optionChange="labelsModel = [$event]"
                :options="labels"
                placeholder="Label"
                labelKey="name"
                valueKey="id"
            />
            <div class="add-order">
                <el-button type="success" icon="el-icon-plus" disabled>
                    {{ $t("dashboard.order.add") }}
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { mapActions, mapGetters } from "vuex";
import { orderStatuses } from "@/data";

export default {
    name: "Filters",
    data() {
        return {
            showPeriodCalendar: false,
            period: null,
            orderStatuses,
            status: null,
            label: null,
        };
    },
    mounted() {
        this.labelsModel = [this.labels[0].id];
    },
    methods: {
        ...mapActions("Orders", ["setFilterData", "filterOrders"]),
        toggleShowPeriodCalendar(val) {
            if (typeof val === "boolean") {
                this.showPeriodCalendar = val;
            } else {
                this.showPeriodCalendar = !this.showPeriodCalendar;
            }
        },
        periodOnChange(val) {
            this.period = val;
            this.showPeriodCalendar = false;
            this.setFilterData({
                body: {
                    period: {
                        min: moment(val.start).toDate().getTime(),
                        max: moment(val.end).toDate().getTime(),
                    },
                },
            });
        },
        periodSortOnChange(isIncoming) {
            if (
                this.filterData.body.period.min ||
                this.filterData.body.period.max
            ) {
                this.setFilterData({
                    body: {
                        incoming: isIncoming,
                        upcoming: !isIncoming,
                    },
                });
            } else {
                this.toggleShowPeriodCalendar(true);
            }
        },
        // statusOnChange(val) {
        //     this.status = val;
        //     this.setFilterData({
        //         body: {
        //             orderStatuses: val,
        //         },
        //     });
        // },
        labelOnChange(val) {
            this.label = val;
            this.setFilterData({
                body: {
                    // label: val
                },
            });
        },
        removeFilter({ property, value = "" }) {
            if (property === "period") {
                this.setFilterData({
                    body: {
                        period: {
                            min: 0,
                            max: 0,
                        },
                        incoming: false,
                        upcoming: false,
                    },
                });
                this.period = null;
            }
            if (property === "periodSort") {
                this.setFilterData({
                    body: {
                        incoming: false,
                        upcoming: false,
                    },
                });
            }
            if (property === "keyWord") {
                this.setFilterData({
                    body: {
                        keyWord: "",
                    },
                });
            }
            if (property === "orderStatus") {
                const data = this.filterData.body.orderStatuses.filter(
                    (s) => s !== value
                );
                this.setFilterData({
                    body: {
                        orderStatuses: data,
                    },
                });
            }
        },
        removeAllFilters() {
            this.setFilterData({
                body: {
                    incoming: false,
                    upcoming: false,
                    keyWord: "",
                    orderStatuses: [],
                    period: {
                        max: 0,
                        min: 0,
                    },
                },
            });
        },
    },
    computed: {
        ...mapGetters("Orders", ["filterData"]),
        ...mapGetters("General", ["labels"]),
        activeFilters() {
            const filters = [];

            // Keyword
            if (this.filterData.body.keyWord) {
                filters.push({
                    label: this.filterData.body.keyWord,
                    property: "keyWord",
                });
            }

            //Period
            if (
                this.filterData.body.period.min ||
                this.filterData.body.period.max
            ) {
                const min = moment(this.filterData.body.period.min).format(
                    "DD/MM/YYYY"
                );
                const max = moment(this.filterData.body.period.max).format(
                    "DD/MM/YYYY"
                );
                filters.push({
                    label: min + " - " + max,
                    property: "period",
                });
            }

            if (this.filterData.body.incoming) {
                filters.push({
                    label: this.$t("order.incoming"),
                    property: "periodSort",
                });
            }

            if (this.filterData.body.upcoming) {
                filters.push({
                    label: this.$t("order.upcoming"),
                    property: "periodSort",
                });
            }

            // Orders statuses
            if (this.filterData.body.orderStatuses.length) {
                this.filterData.body.orderStatuses.forEach((status) => {
                    filters.push({
                        label: orderStatuses.find((s) => s.value === status)
                            .label,
                        value: orderStatuses.find((s) => s.value === status)
                            .value,
                        property: "orderStatus",
                    });
                });
            }

            // Labels
            // if (this.filterData.headers.label.length) {
            //     this.filterData.headers.label.forEach((label) => {
            //         filters.push({
            //             label: this.labels.find((l) => l.id === label).name,
            //             value: label,
            //             property: "label",
            //         });
            //     });
            // }

            return filters;
        },
        orderStatusesModel: {
            get() {
                return this.filterData.body.orderStatuses;
            },
            set(val) {
                this.setFilterData({
                    body: {
                        orderStatuses: val,
                    },
                });
            },
        },
        labelsModel: {
            get() {
                return this.filterData.headers.label;
            },
            set(val) {
                this.setFilterData({
                    headers: {
                        label: [...val],
                    },
                });
            },
        },
    },
    watch: {
        filterData: {
            deep: true,
            handler() {
                this.filterOrders();
            },
        },
        labels(val) {
            if (val.length && !this.labelsModel.length) {
                this.labelsModel = [this.labels[0].id];
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.orders-filters {
    margin: 24px 0 26px;

    .active-filters,
    .filter-fields {
        display: flex;
        align-items: center;
    }

    .active-filters {
        margin-bottom: 30px;

        &__item {
            height: 28px;
            padding: 0 8px;
            background: #767676;
            border-radius: 4px;
            font-size: 14px;
            line-height: 24px;
            color: #ffffff;
            display: flex;
            align-items: center;
            margin-right: 10px;

            .icon {
                margin-left: 8px;
                opacity: 0.4;
                cursor: pointer;
            }
        }
        &__clear-all {
            display: flex;
            align-content: center;
            font-weight: 500;
            font-size: 15px;
            line-height: 24px;
            color: #222222;
            cursor: pointer;

            .icon {
                margin-right: 6px;
            }
        }
    }

    .filter-fields {
        & > *:not(:last-child) {
            margin-right: 15px;
        }

        .title {
            font-weight: 600;
            font-size: 16px;
            text-transform: uppercase;
            color: #222222;
            flex: 1;
        }

        .period {
            .el-button-group > .el-button {
                font-size: 14px;
                color: #222222;
                padding: 7px 16px;
                line-height: 20px;
                border: 1px solid #eeeeee;
                border-left-width: 0;
                border-right-width: 0;

                &:hover,
                &:focus,
                &:active {
                    background-color: #ffffff;
                }
                &:first-child {
                    border-top-left-radius: 10px;
                    border-bottom-left-radius: 10px;
                    cursor: default;
                    background-color: #767676;
                    border-color: #767676;
                    color: #eeeeee;
                    border-left-width: 1px;
                }
                &:last-child {
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    border-right-width: 1px;
                }
                &::v-deep span {
                    display: flex;
                    align-items: center;
                }
                .icon {
                    margin-right: 8px;
                }
                &.active {
                    background-color: #767676;
                    border-color: #767676;
                    color: #eeeeee;
                }
            }
        }

        .add-order .el-button {
            padding: 10px 20px;
        }

        .period-calendar {
            position: absolute;
            z-index: 2;
            top: 50px;
            border-radius: 5px;
            border: none;
            filter: drop-shadow(35px 45px 73px rgba(32, 32, 35, 0.07));

            &::v-deep {
                .vc-pane {
                    min-width: 350px;
                }
                .vc-header {
                    padding: 18px 50px;
                    background: #222222;
                    border-radius: 5px 5px 0 0;

                    .vc-title {
                        font-weight: bold;
                        font-size: 18px;
                        line-height: 22px;
                        text-transform: uppercase;
                        color: #f9f9f9;
                    }
                }
                .vc-arrows-container {
                    padding: 18px 50px;

                    .vc-arrow {
                        padding: 0 8px;

                        &:hover {
                            background-color: rgba(
                                $color: #ffffff,
                                $alpha: 0.2
                            );
                        }

                        &.is-left {
                            margin-right: 2px;
                        }
                    }
                    .svg-inline--fa {
                        height: 20px;
                        color: #f9f9f9;
                    }
                }
                .vc-weeks {
                    padding: 18px 34px;
                }
                .vc-weekday {
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 15px;
                    color: #8ecb7f;
                }
                .vc-day {
                    min-height: 28px;
                }
                .vc-day.is-not-in-month * {
                    opacity: 1;
                    color: #bdbdbd;
                    pointer-events: all;
                }
            }
        }
    }
}
</style>
