<template>
    <div>
        <el-card
            class="video-message"
            v-for="product in order.products.filter((p) => p.video)"
            :key="product.id"
            shadow="none"
        >
            <div class="video-message__avatar">
                <Avatar image="" :size="64" />
                <div class="video-message__avatar__icon">
                    <Icon name="eye" />
                </div>
            </div>
            <div class="video-message__content">
                <div class="video-message__title">
                    {{ $t('order.video_message') }}
                    <Icon name="print" />
                </div>
                <div class="video-message__qr">
                    <Icon name="qr" />
                    {{ $t('order.download_qr_code') }}
                </div>
            </div>
            <div class="video-message__duration">30 sec</div>
        </el-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "VideoMessage",
    computed: {
        ...mapGetters("Orders", ["order"]),
    },
};
</script>

<style lang="scss" scoped>
.video-message {
    background-color: #ffffff;
    display: flex;

    &:not(:last-child) {
        margin-bottom: 10px;
    }

    /deep/ .el-card__body {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }

    &__avatar {
        display: flex;
        position: relative;

        &__icon {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 4px;
            bottom: 4px;
            background-color: #ffffff;
            width: 24px;
            height: 24px;
            border-radius: 5px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &__title {
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        text-transform: uppercase;
        color: #222222;

        .icon {
            margin-left: 4px;
        }
    }

    &__qr {
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        color: #6a9a5e;

        .icon {
            margin-right: 8px;
            color: #505050;
        }
    }

    &__duration {
        font-size: 12px;
        line-height: 15px;
        color: #767676;
    }
}
</style>