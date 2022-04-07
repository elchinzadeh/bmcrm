<template>
    <div class="header">
        <GoBack :title="$t('order.all_orders')"/>
        <div class="brands">
            <img src="@/assets/images/logo/dfm.png" alt="" />
            <img src="@/assets/images/logo/bm.png" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: "Header",
};
</script>

<style lang="scss" scoped>
.header {
    padding: 0 0 24px;
    display: flex;
    justify-content: space-between;

    .brands {
        img {
            margin-left: 14px;
        }
    }
}
</style>