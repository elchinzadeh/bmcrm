<template>
    <label class="checkbox">
        {{ label }}
        <slot />
        <input
            type="checkbox"
            :checked="value"
            :name="name"
            @change="handleChange"
        />
        <span class="checkbox__mark">
            <SvgIcon name="check" />
        </span>
    </label>
</template>

<script>
export default {
    name: "Checkbox",
    props: {
        label: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        value: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleChange(event) {
            this.$emit("input", event.target.checked);
            this.$emit("change", event);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.checkbox {
    display: block;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    user-select: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: $black-2;

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    &__mark {
        position: absolute;
        top: 0;
        left: 0;
        height: 18px;
        width: 18px;
        background-color: transparent;
        border: 1px solid $gray-5;
        border-radius: 2px;
        transition: all 0.25s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 12px;
            display: none;
        }
    }

    &:hover input ~ &__mark {
        background-color: $primary;
        border-color: $primary;
    }

    input:checked ~ &__mark {
        background-color: $primary;
        border-color: $primary;

        svg {
            display: block;
        }
    }
}
</style>