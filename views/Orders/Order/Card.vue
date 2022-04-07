<template>
    <div>
        <el-card
            class="order-card"
            v-for="product in order.products.filter((p) => p.giftCard)"
            :key="product.id"
            shadow="none"
        >
            <div class="order-card__header">
                <div class="order-card__title">
                    {{ $t('order.CARD') }}: {{ product.giftCard.title }}
                    <Icon name="print" />
                </div>
                <div class="order-card__price">
                    {{ product.giftCard.price }}
                </div>
            </div>
            <div class="order-card__desc">
                {{ product.giftCard.text }}
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Card",
    computed: {
        ...mapGetters("Orders", ["order"]),
    },
};
</script>

<style lang="scss" scoped>
.order-card {
    &:not(:last-child) {
        margin-bottom: 10px;
    }

    /deep/ .el-card__body {
        background-color: #ffffff;
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #222222;
        font-weight: 600;
        line-height: 18px;
    }
    &__title {
        display: flex;
        align-items: center;
        font-size: 12px;

        .icon {
            margin-left: 4px;
        }
    }
    &__price {
        font-size: 14px;
    }
    &__desc {
        margin-top: 8px;
        font-size: 12px;
        line-height: 15px;
        color: #767676;
    }
}
</style>