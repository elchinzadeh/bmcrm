<template>
    <i :class="`icon icon-${name}`" :style="styles" />
</template>

<script>
export default {
    name: "Icon",
    props: {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: false,
        },
        size: {
            type: Number,
            required: false,
        },
    },
    computed: {
        styles() {
            return {
                color: this.color,
                fontSize: this.iconSize,
            };
        },
        iconSize() {
            if (this.size) {
                return this.size + "px";
            } else {
                return "";
            }
        },
    },
};
</script>

<style>
.icon {
    color: inherit;
}
</style>