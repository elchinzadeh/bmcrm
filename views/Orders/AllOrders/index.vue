<template>
    <div>
        <Statistics />
        <Orders />
    </div>
</template>

<script>
export default {
    name: "AllOrders",
    components: {
        Statistics: () => import("./Statistics"),
        Orders: () => import("./Orders"),
    },
};
</script>