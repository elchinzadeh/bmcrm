<template>
    <el-row :gutter="24" class="cards-list" v-loading="loading">
        <el-col :span="8" v-for="item in list" :key="item.id">
            <PromocodeCard :item="item" />
        </el-col>
    </el-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "List",
    components: {
        PromocodeCard: () => import("./PromocodeCard"),
    },
    mounted() {
        document.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.onScroll);
    },
    methods: {
        ...mapActions("Promocodes", ["getNextPage"]),
        onScroll() {
            const body = document.querySelector("body");
            if (
                body.scrollHeight * 0.9 <
                    window.innerHeight + window.pageYOffset &&
                !this.loading
            ) {
                this.getNextPage();
            }
        },
    },
    computed: {
        ...mapGetters("Promocodes", ["list", "filter", "loading"]),
    },
};
</script>

<style lang="scss" scoped>
.cards-list {
    margin-top: 30px;

    .el-col {
        margin-bottom: 24px;
    }
}
</style>
