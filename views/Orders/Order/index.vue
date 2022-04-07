<template>
    <div class="order-details-page">
        <el-row>
            <Header />
        </el-row>
        <el-row :gutter="30" v-if="order">
            <el-col :span="6">
                <el-row>
                    <el-col :span="24">
                        <Buyer />
                    </el-col>
                    <el-col :span="24">
                        <Notes />
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="18">
                <el-row>
                    <el-col :span="24">
                        <OrderInfo />
                    </el-col>
                    <el-col :span="24">
                        <DeliveryInfo />
                    </el-col>
                </el-row>
                <el-row :gutter="18">
                    <el-col :span="10">
                        <el-row>
                            <el-col :span="24">
                                <Products />
                            </el-col>
                            <el-col :span="24">
                                <Card />
                            </el-col>
                            <el-col :span="24">
                                <VideoMessage />
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col :span="14">
                        <Payment />
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "Order",
    components: {
        Buyer: () => import("./Buyer.vue"),
        Card: () => import("./Card.vue"),
        DeliveryInfo: () => import("./DeliveryInfo.vue"),
        Header: () => import("./Header.vue"),
        Notes: () => import("./Notes.vue"),
        OrderInfo: () => import("./OrderInfo.vue"),
        Payment: () => import("./Payment.vue"),
        Products: () => import("./Products.vue"),
        VideoMessage: () => import("./VideoMessage.vue"),
    },
    mounted() {
        this.$store.dispatch("Orders/getOrder", this.$route.params.id);
    },
    computed: {
        ...mapGetters("Orders", ["order"]),
    },
};
</script>

<style lang="scss">
.order-details-page {
    .el-col {
        margin-bottom: 10px;
    }
    // Replace with .crm-card
    .el-card {
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        border-radius: 5px;
        background: #f9f9f9;
        box-shadow: none;
    }
}
</style>
