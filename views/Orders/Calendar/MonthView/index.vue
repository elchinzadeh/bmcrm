<template>
    <Calendar />
</template>

<script>
export default {
    name: "MonthView",
    components: {
        Calendar: () => import("./Calendar.vue"),
    },
};
</script>