<template>
    <section class="usage-by-percentage">
        <header>
            <div class="title">Promocodes used</div>
            <router-link to="#">See all</router-link>
        </header>

        <article class="promocodes">
            <div
                class="promocode"
                v-for="promo in data"
                :key="promo.codeString"
            >
                <div class="promocode__total">{{ promo.usedAmount }}</div>
                <div class="promocode__block">
                    <div
                        class="promocode__filled"
                        :style="{
                            height: promo.usedPercentage + '%',
                        }"
                    ></div>
                    <div
                        :class="{
                            promocode__percentage: true,
                            'promocode__percentage--inside':
                                percentagePosition(promo.usedPercentage) ===
                                'inside',
                        }"
                        :style="{
                            bottom:
                                percentagePosition(promo.usedPercentage) ===
                                'outside'
                                    ? promo.usedPercentage + 5 + '%'
                                    : promo.usedPercentage - 25 + '%',
                        }"
                    >
                        {{ promo.usedPercentage.toFixed(2) }}%
                    </div>
                </div>
                <div class="promocode__name">{{ promo.codeString }}</div>
            </div>
        </article>
    </section>
</template>

<script>
import API from "@/api/promocode";

export default {
    name: "UsageByPercentage",
    data() {
        return {
            data: [],
        };
    },
    mounted() {
        this.getUsedStatistics();
    },
    methods: {
        getUsedStatistics() {
            API.getUsedStatistics({ params: { size: 10 } }).then((response) => {
                this.data = response.data;
            });
        },
        percentagePosition(percent) {
            return percent + 5 + 20 < 100 ? "outside" : "inside";
        },
    },
};
</script>

<style lang="scss" scoped>
.usage-by-percentage {
    padding: 15px 25px 20px;
    border: 1px solid #f9f9f9;

    header {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        a,
        a:visited {
            color: #222222;
        }
    }

    .promocodes {
        display: flex;
        gap: 14px;

        .promocode {
            text-align: center;
            font-weight: 500;
            flex: 1;

            &__total {
                font-size: 12px;
                line-height: 24px;
                color: #767676;
            }
            &__block {
                background: #f9f9f9;
                height: 100px;
                position: relative;
            }
            &__filled {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                background: #222222;
            }
            &__percentage {
                font-size: 14px;
                line-height: 20px;
                color: #000000;
                position: absolute;
                bottom: 15%;
                left: 0;
                right: 0;
                text-align: center;
                &--inside {
                    color: #ffffff;
                }
            }
            &__name {
                margin-top: 10px;
                font-size: 10px;
                line-height: 12px;
                text-align: center;
                text-transform: uppercase;
            }
        }
    }
}
</style>
