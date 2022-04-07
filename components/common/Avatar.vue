<template>
    <div class="avatar" :style="style">
        <img v-if="image" :src="image" :alt="alt" />
        <img
            v-else
            src="@/assets/images/icon/avatar.svg"
            :alt="alt"
            class="avatar__placeholder"
        />
    </div>
</template>

<script>
export default {
    name: "Avatar",
    props: {
        image: {
            type: String,
            required: false,
            default: "",
        },
        alt: {
            type: String,
            required: false,
            default: "",
        },
        size: {
            type: [Number, String],
            default: 50,
        },
    },
    computed: {
        style() {
            let size = this.size;
            if (typeof size === "number") {
                size += "px";
            }
            return {
                width: size,
                height: size,
            };
        },
    },
};
</script>

<style lang="scss">
.avatar {
    display: inline-block;
    background-color: #cccccc;
    border-radius: 5px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 5px;

        &:not(.avatar__placeholder) {
            background: #ffffff;
        }
    }

    &__placeholder {
        transform: scale(0.7);
    }
}
</style>
