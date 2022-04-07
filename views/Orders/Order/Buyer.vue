<template>
    <el-card class="buyer" shadow="none">
        <div class="buyer__header">
            <img
                class="buyer__avatar"
                :src="order.user.image"
                :alt="order.user.name"
            />
            <div class="buyer__personal-info">
                <router-link
                    :to="{ name: 'User', params: { id: order.user.id } }"
                    class="buyer__name"
                >
                    {{ order.user.name }}
                    <Icon name="caret-right" />
                </router-link>

                <!-- FIXME -->
                <div
                    class="buyer__additional-info"
                    v-if="order.user.type === 'BUSINESS'"
                >
                    <div class="tag">Business</div>
                    <div class="deposit">
                        {{ $t('order.deposit') }}:
                        <b>€300</b>
                    </div>
                </div>
            </div>
        </div>
        <div class="buyer__contact">
            <div class="buyer__contact__item">
                <Icon name="phone" :size="16" />
                {{ order.user.phone }}
            </div>
            <div class="buyer__contact__item">
                <Icon name="mail" :size="16" />
                {{ order.user.email }}
            </div>
        </div>
    </el-card>
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
.buyer {
    /deep/ .el-card__body {
        padding: 0;
    }
    &__header {
        display: flex;
        padding: 14px 18px;
        background-color: #ffffff;
        border-radius: 5px;
        border-bottom: 1px solid #eeeeee;
    }
    &__personal-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    &__avatar {
        margin-right: 14px;
        width: 50px;
        height: 50px;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        border-radius: 5px;
    }
    &__name {
        font-weight: 700;
        font-size: 18px;
        line-height: 22px;
        text-transform: uppercase;
        color: #222222;
        text-decoration: none;

        .icon {
            margin-left: 8px;
        }
    }
    &__additional-info {
        display: flex;
        align-items: center;
        margin-top: 6px;

        .tag {
            display: inline-block;
            padding: 4px 5px;
            background: #767676;
            border-radius: 5px;
            font-weight: 500;
            font-size: 8px;
            line-height: 10px;
            text-transform: uppercase;
            color: #ffffff;
        }
        .deposit {
            display: inline-block;
            font-size: 8px;
            line-height: 10px;
            text-transform: uppercase;
            color: #222222;
            margin-left: 8px;

            b {
                display: block;
                font-weight: 700;
                font-size: 10px;
                line-height: 12px;
            }
        }
    }

    &__contact {
        padding: 14px 18px;

        &__item {
            display: flex;
            align-items: center;
            font-weight: 500;
            font-size: 14px;
            color: #222222;

            &:not(:last-child) {
                margin-bottom: 8px;
            }

            .icon {
                margin-right: 10px;
            }
        }
    }
}
</style>