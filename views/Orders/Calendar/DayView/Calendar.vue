<template>
    <div>
        <vc-calendar
            ref="calendar"
            class="calendar-weekly"
            :disable-page-swipe="false"
            is-expanded
            @update:to-page="calendarOnUpdate"
        >
            <template v-slot:day-content="{ day }">
                <div
                    :class="{
                        'day-label__wrapper': true,
                        'day-label__wrapper--active': isDayActive(day),
                        'day-label__wrapper--has-dot': hasDot(day),
                    }"
                    @click="handleDayClick(day)"
                >
                    <span class="day-label">
                        {{ day.day }}
                    </span>
                </div>
            </template>

            <template v-slot:header-left-button>
                <Icon name="caret-left" />
            </template>
            <template v-slot:header-right-button>
                <Icon name="caret-right" />
            </template>
        </vc-calendar>

        <div class="sub-header">
            <div class="sub-header__left">
                <button class="sub-header__prev">
                    <Icon name="caret-left" :size="10" />
                    {{ $t('order.yesterday') }}
                </button>
            </div>

            <div class="sub-header__title">
                <b>{{ pagination.totalElements }}</b> {{ $t('order.x_orders') }}
            </div>

            <div class="sub-header__right">
                <button
                    class="sub-header__list-view active"
                    @click="setDataViewType('list')"
                >
                    <Icon name="list-view" :size="18" />
                </button>
                <button
                    class="sub-header__card-view"
                    @click="setDataViewType('card')"
                >
                    <Icon name="card-view" :size="18" />
                </button>
                <button class="sub-header__next">
                    {{ $t('order.tomorrow') }}
                    <Icon name="caret-right" :size="10" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";

export default {
    name: "Calendar",
    data() {
        return {
            activeDate: null,
        };
    },
    mounted() {
        this.activeDate = moment.utc().valueOf();
    },
    methods: {
        ...mapActions("OrdersCalendar", [
            "setDataViewType",
            "getOrders",
            "setActiveMonth",
        ]),
        async calendarOnUpdate({ month, year }) {
            await this.setActiveMonth({
                month: month - 1,
                year: year,
            });

            this.$store.dispatch("OrdersCalendar/getOrdersCount");
        },
        handleDayClick(day) {
            this.activeDate = this.$gbUtilities.getTimestamp(day.date);
        },
        isDayActive(day) {
            return moment(this.$gbUtilities.getTimestamp(day.date)).isSame(
                moment(this.activeDate),
                "day"
            );
            // return (
            //     moment.utc(day.date.toLocaleString()).format("LL") ===
            //     moment.utc(this.activeDate).format("LL")
            // );
        },
        hasDot(day) {
            const dayNumber = day.date.getDate();
            return Boolean(this.ordersCount[dayNumber]);
        },
    },
    computed: {
        ...mapGetters("OrdersCalendar", [
            "orders",
            "pagination",
            "ordersCount",
        ]),
    },
    watch: {
        activeDate(val) {
            if (val) {
                this.getOrders({
                    epochMilli: val,
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.calendar-weekly {
    border-width: 1px 0 0 0;
    border-color: #eeeeee;
    border-style: solid;
    border-radius: 0;
    width: 100%;

    /deep/ {
        .vc-header,
        .vc-arrows-container {
            padding: 18px 0 13px;
        }

        .vc-title {
            font-weight: 600;
            font-size: 24px;
            line-height: 29px;
            text-transform: uppercase;
            color: #222222;
        }

        .vc-arrow {
            height: 30px;
            width: 30px;
        }

        .vc-weekday,
        .is-not-in-month {
            display: none;
        }
        .vc-weeks {
            display: flex;
            border-width: 1px 0;
            border-style: solid;
            border-color: #eeeeee;
            padding: 0;

            .vc-day.in-month {
                flex: 1;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100px;

                &.weekday {
                    &-1:not(.day-from-end-1) {
                        padding-right: 20px;
                        border-right: 1px solid #eeeeee;
                    }
                    &-2:not(.day-1) {
                        padding-left: 20px;
                    }

                    &-1,
                    &-2,
                    &-3,
                    &-4,
                    &-5,
                    &-6,
                    &-7 {
                        .day-label__wrapper {
                            &--has-dot:after {
                                content: "";
                                width: 4px;
                                height: 4px;
                                border-radius: 2px;
                                background-color: #eeeeee;
                                position: absolute;
                                bottom: 18px;
                            }

                            &:hover,
                            &--active {
                                background: linear-gradient(
                                    360deg,
                                    rgba(0, 0, 0, 0.2) -30%,
                                    rgba(0, 0, 0, 0) 97%
                                );
                            }
                            &--active {
                                border-bottom: 1px solid $primary;
                                .day-label {
                                    color: $primary;
                                }
                                &:after {
                                    background-color: $primary;
                                }
                            }
                        }

                        &:before {
                            position: absolute;
                            top: 10px;
                            font-size: 14px;
                            color: #aaaaaa;
                        }
                    }

                    &-1:before {
                        content: "S";
                    }
                    &-2:before {
                        content: "M";
                    }
                    &-3:before {
                        content: "T";
                    }
                    &-4:before {
                        content: "W";
                    }
                    &-5:before {
                        content: "T";
                    }
                    &-6:before {
                        content: "F";
                    }
                    &-7:before {
                        content: "S";
                    }
                }

                .day-label {
                    font-weight: 600;
                    font-size: 14px;
                    color: #aaaaaa;

                    &__wrapper {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.sub-header {
    padding: 10px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    & > * {
        flex: 1;
    }
    &__right {
        display: flex;
        justify-content: flex-end;

        & > *:not(:last-child) {
            margin-right: 10px;
        }
    }
    &__title {
        text-align: center;
        font-weight: 500;
        font-size: 14px;
        text-transform: uppercase;
        color: #aaaaaa;

        b {
            margin-right: 10px;
            font-weight: 600;
            font-size: 18px;
            color: #222222;
        }
    }
    &__prev,
    &__next {
        display: inline-block;
        border: 1px solid #aaaaaa;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 7px;
        font-weight: 600;
        font-size: 12px;
        text-transform: uppercase;
        color: #222222;
        cursor: pointer;
        background-color: transparent;
    }
    &__prev .icon {
        margin-right: 5px;
    }
    &__next .icon {
        margin-left: 5px;
    }
    &__list-view,
    &__card-view {
        padding: 5px;
        border: 1px solid #222222;
        box-sizing: border-box;
        border-radius: 5px;
        background-color: transparent;
        width: 30px;
    }
    button {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
}
</style>