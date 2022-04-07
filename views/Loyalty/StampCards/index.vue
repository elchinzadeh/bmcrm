<template>
    <div>
        <GoBack />
        <h1>Stamp Cards</h1>

        <Section
            v-for="label in Object.values(labels)"
            :key="label.id"
            :label="label"
        />
    </div>
</template>

<script>
import Section from "./Section";
import { mapGetters } from "vuex";

export default {
    name: "StampCards",
    components: {
        Section,
    },
    computed: {
        ...mapGetters("General", ["labels"]),
    },
};
</script>

<style scoped lang="scss">
h1 {
    font-weight: bold;
    font-size: 24px;
    line-height: 29px;
    text-transform: uppercase;
    color: #222222;
    margin: 0;
}
</style>
