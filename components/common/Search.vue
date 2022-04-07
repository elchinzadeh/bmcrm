<template>
    <div>
        <el-autocomplete
            v-if="autocomplete"
            class="search"
            v-model="model"
            :fetch-suggestions="fetchSuggestions"
            :placeholder="placeholder"
            :trigger-on-focus="true"
            @input="$emit('change')"
            @select="$emit('select')"
        >
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
        <el-input
            v-else
            class="search"
            v-model="model"
            :fetch-suggestions="fetchSuggestions"
            :placeholder="placeholder"
            :trigger-on-focus="true"
            @input="$emit('change')"
            @keypress.native.enter="$emit('submit')"
        >
            <i
                slot="suffix"
                class="el-input__icon el-icon-search"
                @click="$emit('submit')"
            />
        </el-input>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: true,
        },
        suggestions: {
            type: Array,
            required: false,
        },
        fetchSuggestions: {
            type: Function,
            required: false,
        },
        placeholder: {
            type: String,
            required: true,
        },
        autocomplete: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    computed: {
        model: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit("input", val);
            },
        },
    },
};
</script>

<style lang="scss">
.search {
    width: 350px;
    .el-input__inner {
        border: none;
        border-bottom: 1px solid #dcdfe6;
        border-radius: 0;
    }

    &.el-input {
        .el-input__icon {
            cursor: pointer;
        }
    }
}
</style>
