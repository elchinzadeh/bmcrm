<template>
    <div class="order-card">
        <div class="order-card__header">
            <el-row>
                <el-col :span="12" class="order-card__header__id">
                    #{{ data.orderId }}
                </el-col>
                <el-col :span="12" class="order-card__header__more">
                    <button>
                        <Icon name="three-dots" />
                    </button>
                </el-col>
            </el-row>
            <el-row class="order-card__header__images">
                <img
                    v-if="data.assignedTo"
                    src="https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    class="user-img"
                />
                <img
                    v-if="data.checkedBy"
                    src="https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    class="user-img"
                />
            </el-row>
        </div>
        <div class="order-card__content">
            <div class="content__order-details">
                <img :src="data.photo" alt="" />
                <div class="content__order-title">
                    <b>{{ data.product }}</b>
                    <span>
                        {{ data.customizations[0].name }}:
                        <span
                            v-for="item in data.customizations[0]
                                .productCustomizationValues"
                            :key="item.id"
                        >
                            {{ item.value }} &nbsp;
                        </span>
                    </span>
                </div>
                <div class="content__order-price">{{ data.price }}</div>
            </div>
            <div class="content__delivery-details">
                <div class="address">
                    {{ data.address }}
                </div>
                <div class="date" v-html="data.date" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OrderCard",
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.order-card {
    margin-top: 10px;
    padding: 18px 16px 20px;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    background: #f9f9f9;

    &__header {
        padding-bottom: 8px;
        border-bottom: 1px solid #eeeeee;

        .el-row {
            display: flex;
            align-items: center;
        }
        &__id {
            font-weight: 700;
            font-size: 18px;
            color: #222222;
        }
        &__more {
            display: flex;
            justify-content: flex-end;

            button {
                transform: translate(6px, -25%);
                border: none;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 26px;
                height: 26px;
                cursor: pointer;
            }
        }
        &__images {
            display: flex;
            justify-content: flex-end;

            img {
                margin-left: 10px;
                border-radius: 5px;
            }
            .user-img {
                width: 24px;
                height: 24px;
            }
        }
    }

    &__content {
        padding-top: 16px;

        .content {
            &__order-details {
                display: flex;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 5px;
                    margin-right: 10px;
                }
            }
            &__order-title {
                display: flex;
                flex-direction: column;
                font-size: 12px;
                line-height: 18px;

                b {
                    font-weight: 600;
                    color: #222222;
                }
                span {
                    color: #767676;
                }
            }
            &__order-price {
                margin-left: auto;
                font-weight: 600;
                font-size: 12px;
                line-height: 18px;
                color: #767676;
            }
            &__delivery-details {
                display: flex;
                justify-content: space-between;
                font-weight: 500;
                font-size: 10px;
                color: #767676;
                margin-top: 5px;
                line-height: 14px;

                :last-child {
                    text-align: right;
                }
            }
        }
    }
}
</style>