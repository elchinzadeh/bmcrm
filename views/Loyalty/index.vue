<template>
    <el-row :gutter="30" class="flex">
        <el-col :span="6">
            <router-link :to="{ name: 'Promocodes' }">
                <Card
                    alt="Promocodes"
                    :icon="
                        require('../../assets/images/loyalty/promocodes.svg')
                    "
                >
                    <div class="card-content">
                        <h2>Promocodes</h2>
                        <div class="count">8</div>
                        <div class="updated">
                            <div class="title">Updated</div>
                            18:04:32, 15 / 05 / 2021
                        </div>
                    </div>
                </Card>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link :to="{ name: 'Coupons' }">
                <Card
                    alt="Coupons"
                    :icon="require('../../assets/images/loyalty/coupons.svg')"
                >
                    <div class="card-content">
                        <h2>Coupons</h2>
                        <div class="count">5</div>
                        <div class="updated">
                            <div class="title">Updated</div>
                            18:04:32, 15 / 05 / 2021
                        </div>
                    </div>
                </Card>
            </router-link>
        </el-col>
        <el-col :span="6">
            <router-link :to="{ name: 'StampCards' }">
                <Card
                    alt="Promocodes"
                    :icon="require('../../assets/images/loyalty/stampcard.svg')"
                >
                    <div class="card-content">
                        <h2>Stamp card</h2>
                    </div>
                </Card>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "Loyalty",
    components: {
        Card: () => import("@/components/card/CardWithIcon"),
    },
};
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
.card-content {
    padding: 14px 0 18px;
    text-align: center;
    color: #222222;

    h2 {
        font-weight: 700;
        font-size: 18px;
        text-transform: uppercase;
    }
    .count {
        font-weight: 600;
        font-size: 36px;
        margin-top: 10px;
    }
    .updated {
        margin-top: 14px;
        font-weight: 500;
        font-size: 10px;
        line-height: 15px;
        text-transform: uppercase;
        color: #767676;

        .title {
            font-size: 12px;
        }
    }
}
</style>
