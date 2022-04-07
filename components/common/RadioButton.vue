<template>
    <label
        :for="radioValue"
        class="radio__wrapper"
        :class="{ 'radio--bordered': bordered }"
    >
        <div class="radio">
            {{ label }}
            <input
                type="radio"
                :id="radioValue"
                :checked="value === radioValue"
                :name="name"
                :value="radioValue"
                @change="handleChange"
            />
            <span class="radio__check"></span>
        </div>
    </label>
</template>

<script>
export default {
    name: "RadioButton",
    props: {
        label: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: false,
        },
        radioValue: {
            type: String,
            required: false,
        },
        value: {
            type: String,
            required: true,
        },
        bordered: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    methods: {
        handleChange(event) {
            this.$emit("input", event.target.value);
            this.$emit("change", event);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.radio {
    position: relative;
    padding-left: 34px;
    user-select: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: #222222;

    &__wrapper {
        display: block;
        margin-bottom: 12px;
        cursor: pointer;
    }

    &--bordered {
        background: #ffffff;
        border: 1px solid #eeeeee;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 12px;
    }

    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
    }

    &__check {
        position: absolute;
        top: 0;
        left: 0;
        height: 22px;
        width: 22px;
        background-color: $gray-10;
        border: 1px solid $gray-8;
        border-radius: 50%;

        &:after {
            top: 6px;
            left: 6px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: $white;
        }
        &:after {
            content: "";
            position: absolute;
            display: none;
        }
    }

    &:hover input ~ &__check,
    input:checked ~ &__check {
        background-color: $primary;
        border-color: $primary;
    }

    input:checked ~ &__check:after {
        display: block;
    }
}
</style>
