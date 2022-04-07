<template>
    <div class="promocode-card">
        <div class="promocode-card__header">
            <div class="promocode-card__discount">
                -{{ item.discount }}{{ item.isPercents ? "%" : "$" }}
            </div>
            <div class="promocode-card__content">
                <div class="promocode-card__title">{{ item.codeString }}</div>
                <div class="promocode-card__subtitle">
                    Product:
                    {{
                        item.products
                            ? item.products.map((p) => p.title).join(", ")
                            : "All"
                    }}
                </div>
            </div>
            <div class="promocode-card__actions">
                <el-button v-if="canEdit" circle @click="editPromocode(item)">
                    <Icon name="pen" :size="18" />
                </el-button>
                <el-button
                    v-if="canDelete"
                    circle
                    @click="deletePromocode(item)"
                >
                    <Icon name="trash" :size="18" />
                </el-button>
            </div>
        </div>
        <div class="promocode-card__description">
            <div class="valid">
                <Icon name="date" />
                Valid until:
                {{ $gbUtilities.getDate(item.expirationDate).fullDate }}
            </div>
            <div class="label">
                <img
                    :src="getLabelImage(item.tenantId)"
                    :alt="item.codeString"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "PromocodeCard",
    props: {
        item: {
            type: Object,
            required: true,
        },
        canEdit: {
            type: Boolean,
            required: false,
            default: true,
        },
        canDelete: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    methods: {
        ...mapActions("Promocodes", [
            "setPromocodeToEdit",
            "setPromocodeToDelete",
        ]),
        getLabelImage(label) {
            return this.$gbUtilities.getLabelImage(
                this.labels.find((l) => l.id === label).type
            );
        },
        editPromocode(item) {
            this.setPromocodeToEdit(item);
        },
        deletePromocode(item) {
            this.setPromocodeToDelete(item);
        },
    },
    computed: {
        ...mapGetters("General", ["labels"]),
    },
};
</script>

<style lang="scss" scoped>
.promocode-card {
    border-radius: 5px;
    border: 1px solid #eeeeee;

    &__header {
        height: 100px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background: #f9f9f9;
        border-bottom: 1px solid #eeeeee;
    }
    &__discount {
        width: 65px;
        height: 65px;
        background: #8ecb7f;
        font-weight: 700;
        font-size: 18px;
        line-height: 24px;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%);
        transform: translateY(-1px);
    }
    &__content {
        margin-top: 18px;
        width: 50%;
    }
    &__title {
        font-weight: 700;
        font-size: 18px;
        line-height: 32px;
        text-transform: uppercase;
    }
    &__subtitle {
        font-size: 14px;
        line-height: 24px;
        color: #767676;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 100%;
    }
    &__actions {
        margin-top: 18px;
        .el-button {
            padding: 8px;
        }
    }
    &__description {
        padding: 8px 20px 8px 10px;
        color: #767676;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            margin-right: 10px;
            font-size: 18px;
        }

        .label {
            width: 36px;
            height: 36px;
        }
    }
}
</style>
