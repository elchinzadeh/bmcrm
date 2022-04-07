<template>
    <img class="svg-icon" :src="path" :style="styles" />
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        size: {
            type: [Number, String],
            required: false,
            default: "auto",
        },
    },
    computed: {
        path() {
            return require(`@/assets/images/icon/${this.name}.svg`);
        },
        styles() {
            let size = this.size;
            if (typeof this.size === "number") size += "px";

            return {
                width: size,
                height: size,
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.svg-icon {
    object-fit: contain;
    object-position: center;
}
</style>