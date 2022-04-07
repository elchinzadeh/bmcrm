<template>
    <div class="legend">
        <div
            class="legend__dot"
            :style="{
                width: size + 'px',
                height: size + 'px',
                borderRadius: size / 2 + 'px',
                backgroundColor: color,
            }"
        />
        <div class="legend__label">{{ label }}</div>
    </div>
</template>

<script>
export default {
    name: "Legend",
    props: {
        label: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: false,
            default: "black",
        },
        size: {
            type: Number,
            required: false,
            default: 8,
        },
    },
};
</script>

<style lang="scss" scoped>
.legend {
    display: flex;
    align-items: baseline;

    &__dot {
        margin-bottom: 6px;
    }
    &__label {
        margin-left: 5px;
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #565656;
    }
}
</style>