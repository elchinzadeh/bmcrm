<template>
    <vc-calendar
        ref="calendar"
        :masks="masks"
        :attributes="attributes"
        disable-page-swipe
        is-expanded
        @update:to-page="calendarOnUpdate"
    >
        <template v-slot:day-content="{ day, attributes }">
            <div class="flex flex-col h-full z-10 overflow-hidden">
                <span class="day-label text-sm text-gray-900">
                    {{ day.day }}
                </span>
                <div class="flex-grow overflow-y-auto overflow-x-auto">
                    <div
                        v-for="(attr, index) in attributes"
                        :key="index"
                        class="order-count"
                        @click="dayClick(attr)"
                    >
                        <span class="order-count__count">
                            {{ attr.customData.orders }}
                        </span>
                        {{ $t("order.orders") }}
                    </div>
                </div>
            </div>
        </template>

        <template v-slot:header-left-button>
            <Icon name="caret-left" />
        </template>
        <template v-slot:header-right-button>
            <Icon name="caret-right" />
        </template>
    </vc-calendar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Calendar",
    data() {
        return {
            masks: {
                weekdays: "WWW",
            },
            attributes: [],
        };
    },
    computed: {
        ...mapGetters("OrdersCalendar", ["ordersCount", "activeMonth"]),
    },
    methods: {
        ...mapActions("OrdersCalendar", ["setActiveMonth"]),
        async calendarOnUpdate({ month, year }) {
            await this.setActiveMonth({
                month: month - 1,
                year: year,
            });

            this.$store.dispatch("OrdersCalendar/getOrdersCount");
        },
        setAttributes() {
            const array = [];

            Object.keys(this.ordersCount).forEach((day) => {
                if (this.ordersCount[day]) {
                    array.push({
                        key: day,
                        customData: {
                            orders: this.ordersCount[day],
                        },
                        dates: new Date(
                            this.activeMonth.year,
                            this.activeMonth.month,
                            Number(day)
                        ),
                    });
                }
            });

            this.attributes = array;
        },
        dayClick() {
            // console.log(attr);
        },
    },
    watch: {
        ordersCount: {
            handler() {
                this.setAttributes();
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.vc-container {
    border-width: 1px 0 0 0;
    border-color: #eeeeee;
    border-style: solid;
    border-radius: 0;
    width: 100%;
}

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
    .vc-weeks > * {
        border: 1px solid #eeeeee;
        padding: 20px;
        box-sizing: border-box;
    }
    .vc-weekday {
        background: #f9f9f9;
        font-weight: 600;
        font-size: 16px;
        line-height: 19px;
        text-transform: uppercase;
        color: #222222;
        text-align: left;
    }
    .day-label {
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        text-transform: uppercase;
        color: #222222;
    }
    .vc-day {
        min-height: 150px;
        &.is-today .day-label {
            width: 26px;
            height: 26px;
            background: #222222;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 13px;
            transform: translate(-5px, -5px);
        }

        &.is-not-in-month * {
            opacity: 1;
            pointer-events: all;
            .day-label {
                color: #aaaaaa;
            }
        }

        .order-count {
            display: inline-block;
            margin-top: 6px;
            background: rgba(157, 216, 143, 0.1);
            border-radius: 5px;
            font-size: 12px;
            line-height: 18px;
            color: #6a9a5e;
            font-weight: 500;
            padding: 2px 5px;
            // cursor: pointer;

            &__count {
                font-weight: 700;
            }
        }
    }
}
</style>
