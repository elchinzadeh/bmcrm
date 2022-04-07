<template>
    <el-tag
        v-if="show"
        :class="classes"
        :style="{
            color: color.main,
            backgroundColor: color.secondary,
        }"
    >
        {{ capitalizedLabel }}
    </el-tag>
</template>

<script>
import _ from "lodash";

export default {
    name: "Tag",
    props: {
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: false,
            default: "default",
        },
        color: {
            type: Object,
            required: true,
        },
        show: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    computed: {
        classes() {
            const type = this.type.toLowerCase().replace("_", "-");
            return ["bm-table-tag", "bm-table-tag--" + type];
        },
        capitalizedLabel() {
            return _.capitalize(this.label.replace("_", " "));
        },
    },
};
</script>

<style lang="scss" scoped>
.bm-table-tag {
    border: none;
}
</style>
