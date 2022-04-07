<template>
    <el-card class="delivery-info" shadow="none">
        <div class="delivery-info__heading">
            <Icon name="truck" :size="32" />
            <h3>{{ $t("order.delivery") }}</h3>
            <Icon name="edit" :size="14" />
        </div>
        <div class="delivery-info__address">
            <div class="delivery-info__address__item">
                <Icon name="location" :size="14" />
                <span>
                    {{ deliveryAddress }}
                </span>
            </div>
        </div>
        <div class="delivery-info__contact">
            <div class="delivery-info__contact__item">
                <Icon name="user" :size="14" />
                <span>{{ order.delivery.fullName }}</span>
            </div>
            <div class="delivery-info__contact__item">
                <Icon name="phone" :size="14" />
                <span>{{ order.delivery.phone }}</span>
            </div>
        </div>
        <div class="delivery-info__date">
            <div class="delivery-info__date__item">
                <Icon name="date" :size="14" />
                <span>{{ order.delivery.date }}</span>
            </div>
            <!-- <div class="delivery-info__date__item">
                <Icon name="clock" :size="14" />
                <span>{{ date.fullTime }}</span>
            </div> -->
        </div>
    </el-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "DeliveryInfo",
    computed: {
        ...mapGetters("Orders", ["order"]),
        deliveryAddress() {
            return this.$gbUtilities.getFullDeliveryAddress(
                this.order.delivery
            );
        },
        date() {
            return this.$gbUtilities.getDate(this.order.date);
        },
    },
};
</script>

<style lang="scss" scoped>
.delivery-info {
    background-color: #ffffff;
    color: #222222;

    /deep/ .el-card__body {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__heading {
        display: flex;
        align-items: center;
        h3 {
            margin: 0 3px 0 13px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
        }
    }
    &__address,
    &__contact,
    &__date {
        font-size: 14px;
        line-height: 18px;

        &__item {
            display: flex;
        }

        .icon {
            margin-right: 10px;
        }
    }
}
</style>
