<template>
    <div class="switcher" v-if="value">
        <div
            v-for="option in options"
            :key="option.value"
            class="switcher__item"
            :class="{
                'switcher__item--active': option.value === value.value,
            }"
            @click="selectOption(option)"
        >
            {{ option.label }}
        </div>
    </div>
</template>

<script>
export default {
    name: "Switcher",
    props: {
        value: {
            type: Object,
            required: false,
        },
        options: {
            type: Array,
            required: false,
        },
    },
    methods: {
        selectOption(opt) {
            this.$emit("input", opt);
        },
    },
};
</script>

<style lang="scss" scoped>
.switcher {
    padding: 3px;
    background: #eeeeee;
    border-radius: 5px;
    display: flex;

    &__item {
        background: #aaaaaa;
        border-radius: 4px;
        min-width: 60px;
        padding: 0 14px;
        text-align: center;
        font-weight: 500;
        font-size: 15px;
        line-height: 24px;
        color: #eeeeee;
        cursor: pointer;
        transition: all 0.25s ease-in-out;

        &:not(:last-child) {
            margin-right: 3px;
        }

        &--active {
            background: #222222;
        }
    }
}
</style>