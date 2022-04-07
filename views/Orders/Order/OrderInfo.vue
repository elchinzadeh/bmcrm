<template>
    <el-card class="order-info" shadow="none">
        <div class="order-info__general">
            <div class="order-no" :data-id="order.id" @click="copyOrderId">
                #{{ order.id }}
            </div>
            <div class="order-date">{{ $t('order.created') }} {{ createDate }}</div>
        </div>
        <div class="order-info__assigned">
            <div class="title">{{ $t('order.assigned_to') }}</div>

            <div class="assigned-user" v-if="order.assignedTo">
                <img
                    src="@/assets/images/avatar.png"
                    alt=""
                    class="assigned-user__image"
                />
                <span class="assigned-user__name">Jack Johnson, florist</span>
            </div>
        </div>
        <div class="order-info__status">
            <div class="title">{{ $t('order.status') }}</div>
            <Tag
                :label="order.orderStatus"
                :type="order.orderStatus"
                :color="$gbUtilities.getStatusColor(order.orderStatus)"
            />
        </div>
        <div class="order-info__checked">
            <div class="title">{{ $t('order.checked') }}</div>
            <div class="users" v-if="order.assignedTo || order.checkedBy">
                <Avatar :size="24" class="mr-12" />
                <Avatar :size="24" />
            </div>
        </div>
        <div class="order-info__actions">
            <Icon name="three-dots" />
        </div>
    </el-card>
</template>

<script>
import { mapGetters } from "vuex";
import { Notification } from "element-ui";

export default {
    name: "OrderInfo",
    computed: {
        ...mapGetters("Orders", ["order"]),
        createDate() {
            const datetime = this.$gbUtilities.getDate(this.order.date);
            const date = datetime.fullDate;
            const time = datetime.fullTime;
            return time + ", " + date;
        },
    },
    methods: {
        copyOrderId(e) {
            navigator.clipboard.writeText(e.target.dataset.id);
            Notification.success({
                title: this.$t('notification.copied.title'),
                message: this.$t('notification.copied.message'),
                type: "success",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.order-info {
    /deep/ .el-card__body {
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
    }

    .order {
        &-no {
            display: inline-block;
            padding: 0 8px;
            font-weight: bold;
            font-size: 30px;
            color: #2f80ed;
            background: rgba(#2f80ed, 0.1);
            border-radius: 5px;
            cursor: pointer;
        }
        &-date {
            margin-top: 4px;
            font-weight: 600;
            font-size: 10px;
            line-height: 140%;
            text-transform: uppercase;
            color: #767676;
        }
        &__checked {
            .users {
                margin-top: 8px;
            }
        }
        &__actions {
            cursor: pointer;
        }
    }
    .assigned-user {
        display: flex;
        align-items: center;
        margin-top: 8px;

        &__image {
            width: 18px;
            height: 18px;
            border-radius: 5px;
            margin-right: 5px;
        }
        &__name {
            font-weight: 500;
            font-size: 12px;
            line-height: 15px;
            color: #222222;
        }
    }
    .el-tag {
        margin-top: 6px;
    }
    .title {
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
        text-transform: uppercase;
        color: #767676;
    }
}
</style>