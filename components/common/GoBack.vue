<template>
    <div @click="goBack" class="go-back">
        <Icon name="caret-left" />
        <span>{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: "GoBack",
    props: {
        title: {
            type: String,
            required: false,
            default: "Back",
        },
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        },
    },
};
</script>

<style lang="scss">
.go-back {
    width: min-content;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-transform: uppercase;
    cursor: pointer;
    color: #222222;
    white-space: nowrap;

    .icon {
        margin-bottom: 2px;
    }

    span {
        margin-left: 6px;
        padding-bottom: 1px;
        border-bottom: 1px solid #222222;
    }
}
</style>
