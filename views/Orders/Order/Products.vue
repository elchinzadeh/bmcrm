<template>
    <div>
        <el-card
            class="product"
            v-for="product in order.products"
            :key="product.id"
            shadow="none"
        >
            <img :src="product.image" alt="" />
            <div class="product__content">
                <h3>{{ product.title }}</h3>
                <div class="product__specs">
                    <div
                        class="product__spec"
                        v-for="(customization, index) in product.customizations"
                        :key="index"
                    >
                        <h5>{{ $t('order.size') }}</h5>
                        <span>M</span>
                    </div>
                    <div class="product__spec">
                        <h5>{{ $t('order.history_of_order') }}</h5>
                        <span>{{ product.quantity }}</span>
                    </div>
                    <div class="product__spec"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Buyer",
    computed: {
        ...mapGetters("Orders", ["order"]),
    },
};
</script>

<style lang="scss" scoped>
.product {
    &:not(:last-child) {
        margin-bottom: 10px;
    }

    /deep/ .el-card__body {
        padding: 0;
        display: flex;
        justify-content: space-between;
    }

    img {
        width: 200px;
        height: 200px;
        border-radius: 5px;
    }

    &__content {
        padding: 32px 20px;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        text-transform: uppercase;
        color: #222222;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
    }
    &__specs {
    }
    &__spec {
        display: flex;
        justify-content: space-between;
        font-weight: 500;
        text-transform: uppercase;
        margin-top: 6px;

        h5 {
            margin: 0;
            font-size: 12px;
            line-height: 20px;
        }
        span {
            font-size: 14px;
            line-height: 24px;
            color: #767676;
        }
    }
}
</style>