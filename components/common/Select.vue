<template>
    <el-select
        ref="select"
        v-model="model"
        :placeholder="placeholder"
        popper-class="custom-select-popper"
        :multiple="multiple"
        collapse-tags
        :multiple-limit="0"
        @change="selectOnChange"
    >
        <el-option
            v-for="item in options"
            :key="item[valueKey]"
            :label="item[labelKey]"
            :value="item[valueKey]"
            @click.native="optionOnClick(item[valueKey])"
        >
            <div class="checkbox checkbox--active">
                <SvgIcon name="check" :size="12" />
            </div>
            <span style="float: left">{{ item[labelKey] }}</span>
        </el-option>
    </el-select>
</template>

<script>
export default {
    name: "Select",
    props: {
        value: {
            type: Array,
            required: true,
        },
        options: {
            type: Array,
            required: false,
            default: () => [],
        },
        placeholder: {
            type: String,
            required: false,
            default: "Select",
        },
        labelKey: {
            type: String,
            required: false,
            default: "label",
        },
        valueKey: {
            type: String,
            required: false,
            default: "value",
        },
        multiple: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    methods: {
        selectOnChange(options) {
            this.$emit("change", options);
        },
        optionOnClick(value) {
            this.$emit("optionChange", value);
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
    watch: {
        value(options) {
            setTimeout(() => {
                this.$refs["select"].$el
                    .querySelector(".el-input .el-input__inner")
                    .setAttribute(
                        "placeholder",
                        options.length
                            ? `Selected (${options.length})`
                            : this.placeholder
                    );
            }, 0); // it works but I don't know why
        },
    },
};
</script>

<style lang="scss" scoped>
.el-select {
    /deep/ {
        .el-input__inner {
            padding: 0 12px;
            border-radius: 10px;
            height: 36px;
            line-height: 36px;
            border-color: #aaaaaa;
            font-size: 14px;

            &::placeholder {
                color: #aaaaaa;
            }
        }
        .el-input {
            .el-select__caret {
                color: #aaaaaa;
                transform: rotateZ(180deg) translateY(-2px);

                &.is-reverse {
                    transform: rotateZ(0deg) translateY(-2px);
                }
            }
            &.is-focus .el-input__inner {
                border-color: #aaaaaa;
                &::placeholder {
                    color: #222222;
                }
            }
        }

        .el-select__tags {
            display: none;
        }
    }
}
</style>
<style lang="scss">
.custom-select-popper {
    border-radius: 10px;
    border-width: 0;
    box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06),
        0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
    margin-top: 2px !important;

    .popper__arrow {
        display: none;
    }
    .el-select {
        &-dropdown__list {
            padding: 0;
        }
        &-dropdown__item {
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            color: #222222;
            display: flex;
            align-items: center;

            &:not(:last-child) {
                border-bottom: 1px solid #efefef;
            }

            &:first-child {
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
            }
            &:last-child {
                border-bottom-left-radius: 10px;
                border-bottom-right-radius: 10px;
            }

            .checkbox {
                width: 16px;
                height: 16px;
                border: 1px solid #c1c1c1;
                border-radius: 2px;
                background: #ffffff;
                margin-right: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &.selected {
                &:after {
                    display: none;
                }
                .checkbox {
                    background: #8ecb7f;
                    border-color: #8ecb7f;
                }
            }
        }
    }
}
</style>
