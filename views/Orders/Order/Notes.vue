<template>
    <el-card class="notes" v-if="order.notes.length" shadow="none">
        <div class="notes__header">
            <Icon name="note" :size="18" />
            {{ $t('order.notes') }}
        </div>
        <div class="notes__content">
            <el-card
                class="note-card"
                v-for="note in order.notes"
                :key="note.id"
                shadow="none"
            >
                <div class="note-card__header">
                    <div class="note-card__avatar">
                        <Avatar :size="18" />
                    </div>
                    <div class="note-card__title">
                        Delivery
                        <div class="note-card__date">
                            <Icon name="bell-2" :size="9" />
                            18:00, Tommorow
                        </div>
                    </div>
                </div>
                <div class="note-card__content">
                    <div class="note-card__desc">
                        This order date need to be changed. Client call me at
                        09:00 and told that he recall and tell in which time
                        this flowers need to be delivered
                    </div>
                    <div class="note-card__actions">
                        <Icon name="three-dots-vertical" />
                    </div>
                </div>
                <div class="note-card__author">
                    <div class="note-card__author__avatar">
                        <Avatar :size="24" />
                    </div>
                    <div class="note-card__author__title">
                        <div class="note-card__author__name">Kim Li</div>
                        <div class="note-card__author__position">Manager</div>
                    </div>
                    <div class="note-card__author__date">
                        18:04:32, <br />
                        15/09/2021
                    </div>
                </div>
            </el-card>
        </div>
    </el-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Notes",
    computed: {
        ...mapGetters("Orders", ["order"]),
    },
};
</script>

<style lang="scss" scoped>
.notes {
    /deep/ .el-card__body {
        padding: 0;
    }

    &__header {
        display: flex;
        align-items: center;
        padding: 14px 10px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        text-transform: uppercase;
        color: #222222;

        .icon {
            margin-right: 6px;
        }
    }

    &__content {
        background-color: #ffffff;
        padding: 6px;

        .note-card {
            padding: 10px;

            &__header {
                display: flex;
            }
            &__avatar {
                margin-right: 7px;
            }
            &__title {
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                color: #222222;
            }
            &__date {
                font-size: 10px;
                line-height: 14px;
                color: #6a9a5e;

                .icon {
                    margin-right: 3px;
                }
            }

            &__content {
                margin-top: 10px;
                display: flex;
            }
            &__desc {
                font-size: 13px;
                line-height: 16px;
                color: #767676;
            }

            &__author {
                margin-top: 30px;
                display: flex;
                align-items: center;

                &__avatar {
                    margin-right: 8px;
                }
                &__title {
                    margin-right: auto;
                    color: #222222;
                }
                &__name {
                    font-weight: bold;
                    font-size: 12px;
                    line-height: 14px;
                }
                &__position {
                    font-weight: 500;
                    font-size: 10px;
                    line-height: 12px;
                }
                &__date {
                    text-align: right;
                    font-weight: 500;
                    font-size: 10px;
                    line-height: 10px;
                    color: #767676;
                }
            }
        }
    }
}
</style>