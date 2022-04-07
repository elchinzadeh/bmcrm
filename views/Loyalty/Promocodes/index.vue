<template>
    <section>
        <GoBack />
        <header>
            <h2>Promocodes</h2>
            <el-button
                type="success"
                icon="el-icon-plus"
                @click="$router.push({ name: 'PromocodesCreate' })"
            >
                Add promocode
            </el-button>
        </header>
        <Statistics />
        <List />
        <Delete />
    </section>
</template>

<script>
export default {
    name: "Promocodes",
    components: {
        Statistics: () => import("./Statistics"),
        List: () => import("./List"),
        Delete: () => import("./Delete"),
    },
};
</script>

<style lang="scss" scoped>
header {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 30px;

    h2 {
        margin: 0;
        text-transform: uppercase;
    }
}
</style>
