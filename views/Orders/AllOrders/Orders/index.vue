<template>
    <div>
        <Header />
        <Filters />
        <Table />
    </div>
</template>

<script>
export default {
    name: "Orders",
    components: {
        Filters: () => import("./Filters"),
        Header: () => import("./Header"),
        Table: () => import("./Table"),
    },
};
</script>