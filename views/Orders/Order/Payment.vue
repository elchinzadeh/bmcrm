<template>
    <div class="payment">
        <el-card class="instructions" v-if="order.delivery.note" shadow="none">
            <div class="instructions__heading">
                <Icon name="warning" :size="14" />
                {{ $t('order.special_instructions') }}
            </div>
            <div class="instructions__content">
                {{ order.delivery.note }}
            </div>
        </el-card>

        <div class="details">
            <div class="detail">
                <div class="detail__heading">
                    {{ $t('order.ordered_from') }}
                </div>
                <div class="detail__value detail__value--platform">
                    {{ order.platform }}
                </div>
            </div>
            <div class="detail">
                <div class="detail__heading">{{ $t('order.payment_status') }}</div>
                <div class="detail__value">{{ order.paymentStatus }}</div>
            </div>
            <hr />
            <div
                class="detail"
                v-for="product in order.products"
                :key="'p-' + product.id"
            >
                <div class="detail__heading">{{ product.title }}</div>
                <div class="detail__value">{{ product.price }}</div>
            </div>
            <div class="detail">
                <div class="detail__heading">{{ $t('order.card') }}</div>
                <div class="detail__value">
                    {{ order.payment.giftCardsPrice }}
                </div>
            </div>
            <div class="detail">
                <div class="detail__heading">{{ $t('order.promocode') }}</div>
                <div class="detail__value">
                    {{ order.payment.promoCodeDiscount }}
                </div>
            </div>
            <div class="detail">
                <div class="detail__heading">{{ $t('order.stampcards') }}</div>
                <div class="detail__value">
                    {{ order.payment.stampCardDiscount }}
                </div>
            </div>
            <div class="detail">
                <div class="detail__heading">{{ $t('order.delivery') }}</div>
                <div class="detail__value">
                    {{ order.payment.deliveryPrice }}
                </div>
            </div>
            <div class="detail">
                <div class="detail__heading">{{ $t('order.sunday_tax') }}</div>
                <div class="detail__value">
                    {{ order.payment.sundayTax }}
                </div>
            </div>
            <div class="detail detail--total-price">
                <div class="detail__heading">{{ $t('order.total_price') }}</div>
                <div class="detail__value">{{ order.payment.totalPrice }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Payment",
    computed: {
        ...mapGetters("Orders", ["order"]),
    },
    mounted() {},
};
</script>

<style lang="scss" scope>
.payment {
    padding-left: 18px;
    border-left: 1px solid #eeeeee;

    .instructions {
        margin-bottom: 32px;

        /deep/ .el-card__body {
            padding: 8px 18px;
        }

        &__heading {
            font-weight: 600;
            font-size: 12px;
            line-height: 18px;
            color: #eb5757;
            text-transform: uppercase;

            .icon {
                margin-right: 10px;
            }
        }

        &__content {
            margin-top: 12px;
            font-size: 14px;
            line-height: 18px;
            color: #767676;
        }
    }

    .details {
        .detail {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 0;

            &__heading {
                font-weight: 500;
                font-size: 14px;
                line-height: 18px;
                color: #767676;
            }
            &__value {
                font-weight: 600;
                font-size: 15px;
                line-height: 18px;
                color: #222222;

                &--platform {
                    border: 1px solid #2c80e2;
                    border-radius: 4px;
                    padding: 3px 11px;
                    font-weight: 500;
                    font-size: 12px;
                    line-height: 15px;
                    color: #2c80e2;
                }
            }

            &--total-price {
                padding: 8px 0;
                .detail__heading {
                    font-weight: 600;
                    text-transform: uppercase;
                    color: #222222;
                }
                .detail__value {
                    font-size: 27px;
                    color: #8ecb7f;
                }
            }
        }

        hr {
            margin: 25px 0 32px;
            border: none;
            background: #eeeeee;
            height: 1px;
        }
    }
}
</style>