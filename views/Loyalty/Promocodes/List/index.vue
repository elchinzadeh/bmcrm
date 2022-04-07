<template>
    <div>
        <Filters />
        <List />
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "PromocodesList",
    components: {
        Filters: () => import("./Filters"),
        List: () => import("./List"),
    },
    mounted() {
        this.getList();
    },
    methods: {
        ...mapActions("Promocodes", ["getList"]),
    },
};
</script>
