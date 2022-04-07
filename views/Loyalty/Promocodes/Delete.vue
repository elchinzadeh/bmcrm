<template>
    <Dialog
        v-model="active"
        title="Do you really want to delete this promocode?"
        type="danger"
        :icon="require('../../../assets/images/loyalty/bin.svg')"
    >
        <template slot="content">
            <PromocodeCard
                :item="promocodeToDelete"
                :canEdit="false"
                :canDelete="false"
            />
        </template>
        <template slot="footer">
            <el-button @click="active = false" type="text" class="cancel">
                Cancel
            </el-button>
            <el-button type="danger" @click="submit"> Submit </el-button>
        </template>
    </Dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "Block",
    components: {
        Dialog: () => import("@/components/popup/PopupWithIcon"),
        PromocodeCard: () => import("./List/PromocodeCard.vue"),
    },
    methods: {
        ...mapActions("Promocodes", [
            "setPromocodeToDelete",
            "deletePromocode",
        ]),
        handleClose() {
            this.active = false;
        },
        submit() {
            this.deletePromocode(this.promocodeToDelete.id);
            this.handleClose();
        },
    },
    computed: {
        ...mapGetters("Promocodes", ["promocodeToDelete"]),
        active: {
            get() {
                return Boolean(this.promocodeToDelete);
            },
            set(val) {
                this.setPromocodeToDelete(val);
            },
        },
    },
};
</script>

<style lang="scss" scoped>
.cancel {
    font-weight: 500;
    font-size: 15px;
    line-height: 24px;
    color: #222222;
}

/deep/ .dialog-content {
    margin: 30px 0;
}
</style>
