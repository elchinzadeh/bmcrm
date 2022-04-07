<template>
    <div>
        <GoBack />
        <el-form
            :model="form"
            :rules="rules"
            ref="form"
            class="form"
            v-loading="loading"
        >
            <section class="form__header">
                <div class="form__header__nameless-block"></div>
                <div class="form__header__icon">
                    <img
                        src="@/assets/images/loyalty/create_promocode.svg"
                        alt="Add new member"
                    />
                </div>
                <h1>Add Promocode</h1>
            </section>

            <section class="form__information">
                <header>
                    <h3>Promocode information</h3>
                </header>

                <div class="content">
                    <div class="form-field">
                        <el-form-item prop="name">
                            <label>Promocode name</label>
                            <el-input placeholder="" v-model="form.name" />
                        </el-form-item>
                    </div>
                    <div class="form-field">
                        <el-form-item prop="sale">
                            <label>Sale</label>
                            <el-input placeholder="" v-model="form.sale" />
                        </el-form-item>
                    </div>
                </div>
            </section>

            <section class="form__date">
                <header>
                    <h3>Date</h3>
                </header>

                <div class="content">
                    <RadioButton
                        label="All time"
                        v-model="form.dateType"
                        radioValue="allDate"
                    />
                    <RadioButton
                        label="Choose date"
                        v-model="form.dateType"
                        radioValue="chooseDate"
                    />
                    <div class="pickers" v-if="form.dateType === 'chooseDate'">
                        <div class="subheader">
                            <Icon name="date" :size="24" />
                            <h4>Date</h4>
                        </div>
                        <div class="dates">
                            <div class="form-field">
                                <label>Start</label>
                                <el-date-picker
                                    v-model="form.dateStart"
                                    type="date"
                                    placeholder="Date"
                                />
                            </div>
                            <div class="form-field">
                                <label>Finish</label>
                                <el-date-picker
                                    v-model="form.dateFinish"
                                    type="date"
                                    placeholder="Date"
                                />
                            </div>
                        </div>

                        <div
                            class="add-time"
                            @click="addTimeActive = true"
                            v-if="!addTimeActive"
                        >
                            + Add time
                        </div>

                        <div class="subheader" v-if="addTimeActive">
                            <Icon name="date" :size="24" />
                            <h4>Time</h4>
                        </div>
                        <div class="times" v-if="addTimeActive">
                            <div class="form-field">
                                <label>Start</label>
                                <el-time-select
                                    v-model="form.timeStart"
                                    placeholder="Time"
                                />
                            </div>
                            <div class="form-field">
                                <label>Finish</label>
                                <el-time-select
                                    v-model="form.timeFinish"
                                    placeholder="Time"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="form__label">
                <header>
                    <Icon name="label" :size="24" />
                    <h3>Label</h3>
                </header>

                <div class="content">
                    <div
                        class="label"
                        :class="form.label === label.id && 'label--active'"
                        v-for="label in labels"
                        :key="label.id"
                        @click="form.label = label.id"
                    >
                        <img :src="getLabelImage(label.id)" :alt="label.name" />
                    </div>
                </div>
            </section>

            <section class="form__product">
                <header>
                    <h3>Product</h3>
                </header>

                <div class="content">
                    <RadioButton
                        label="All product"
                        v-model="form.productType"
                        radioValue="allProducts"
                    />
                    <RadioButton
                        label="Choose product"
                        v-model="form.productType"
                        radioValue="chooseProducts"
                    />
                    <div
                        class="form-field"
                        v-if="form.productType === 'chooseProducts'"
                    >
                        <label>Choose product</label>
                        <el-select
                            v-model="productModel"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="Product"
                            :remote-method="getProducts"
                            :loading="productsLoading"
                        >
                            <el-option
                                v-for="item in products"
                                :key="item.id"
                                :label="item.title"
                                :value="item"
                            >
                            </el-option>
                        </el-select>
                    </div>

                    <div class="selected-products">
                        <div
                            class="product"
                            v-for="product in form.products"
                            :key="product.id"
                        >
                            {{ product.title }}
                            <Icon
                                name="cross"
                                :size="10"
                                @click.native="removeProduct(product)"
                            />
                        </div>
                        <div
                            class="clear-all"
                            @click="removeAllProducts"
                            v-if="form.products.length"
                        >
                            <Icon name="cross" :size="16" />
                            Clear All
                        </div>
                    </div>
                </div>
            </section>

            <section class="form__footer">
                <el-button type="primary" @click="submit">
                    Create promocode
                </el-button>
            </section>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import APIPromocode from "@/api/promocode";
import APIProduct from "@/api/product";
import moment from "moment";
import { Notification } from "element-ui";

export default {
    name: "CreatePromocode",
    data() {
        return {
            addTimeActive: false,
            form: {
                name: null,
                sale: null,
                isPercent: true,
                dateType: "allDate",
                dateStart: null,
                dateFinish: null,
                timeStart: null,
                timeFinish: null,
                label: null,
                productType: "allProducts",
                products: [],
            },
            rules: {},
            loading: false,
            productsLoading: false,
            products: [],
        };
    },
    mounted() {
        this.form.label = this.labels[0]?.id;
    },
    methods: {
        getLabelImage(label) {
            return this.$gbUtilities.getLabelImage(
                this.labels.find((l) => l.id === label).type
            );
        },
        getProducts(value) {
            this.productsLoading = true;
            const body = {
                keyword: value,
            };
            const params = {
                params: {
                    size: 5,
                },
            };
            APIProduct.search(body, params)
                .then((res) => {
                    this.products = res.data;
                })
                .finally(() => {
                    this.productsLoading = false;
                });
        },
        removeProduct(item) {
            this.form.products = this.form.products.filter(
                (p) => p.id !== item.id
            );
        },
        removeAllProducts() {
            this.form.products = [];
        },
        submit() {
            const startTime = moment(this.form.timeStart, "HH:mm");
            const startDate = moment(this.form.dateStart).set({
                hour: startTime.get("hour"),
                minute: startTime.get("minute"),
            });
            const finishTime = moment(this.form.timeFinish, "HH:mm");
            const finishDate = moment(this.form.dateFinish).set({
                hour: finishTime.get("hour"),
                minute: finishTime.get("minute"),
            });

            APIPromocode.createPromocode(
                {},
                {
                    params: {
                        codeString: this.form.name,
                        discount: this.form.sale,
                        isPercent: this.form.isPercent,
                        productIdList: this.form.products.map((p) => p.id),
                        startDate: startDate.unix() * 1000,
                        expirationDate: finishDate.unix() * 1000,
                        categoryId: this.form.label.id,
                    },
                }
            ).then(() => {
                Notification.success({
                    title: "Success",
                    message: "Promocode created successfully",
                });
                this.$router.push({ name: "Promocodes" });
            });
        },
    },
    computed: {
        ...mapGetters("General", ["labels"]),
        productModel: {
            get() {
                return null;
            },
            set(val) {
                this.form.products.push(val);
            },
        },
    },
    watch: {
        labels() {
            this.form.label = this.labels[0]?.id;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.form {
    width: 500px;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    margin: 18px auto 0;
    position: relative;

    section {
        header {
            padding: 13px 55px;
            background: #f9f9f9;
            color: #222222;
            display: flex;

            .icon {
                font-size: 24px;
                margin-right: 12px;
            }
            h3 {
                margin: 0;
                font-weight: bold;
                font-size: 14px;
                line-height: 24px;
                text-transform: uppercase;
            }
        }
        & > h3 {
            margin: 0;
            font-weight: bold;
            font-size: 14px;
            line-height: 17px;
            text-transform: uppercase;
            padding: 0 55px;
            display: flex;
            align-items: center;

            .icon {
                font-size: 24px;
                margin-right: 10px;
                color: #aaaaaa;
            }
        }
        .content {
            padding: 20px 55px;
        }
    }

    &__header {
        padding: 28px 55px 36px;

        &__nameless-block {
            position: absolute;
            top: 0;
            left: 0;
            height: 75px;
            width: 100%;
            background: #8ecb7f;
            border-radius: 5px 5px 0px 0px;
            z-index: -1;
        }
        &__icon {
            padding: 20px;
            background: #f9f9f9;
            border-radius: 15px;
            display: inline-block;
        }
        h1 {
            margin-top: 22px;
            font-weight: bold;
            font-size: 18px;
            line-height: 22px;
            text-transform: uppercase;
            color: #222222;
        }
    }

    &__information {
        .content {
            display: flex;
            gap: 15px;

            .form-field {
                &:first-of-type {
                    flex: 3;
                }
                &:last-of-type {
                    flex: 1;
                }
            }
        }
    }

    &__date {
        .pickers {
            display: flex;
            flex-direction: column;
            .dates,
            .times {
                flex: 1;
                display: flex;
                gap: 15px;
                width: 100%;

                .form-field {
                    flex: 1;
                }
            }

            .subheader {
                color: #222222;
                display: flex;
                margin-bottom: 12px;
                margin-top: 20px;
                .icon {
                    font-size: 24px;
                    margin-right: 12px;
                    color: #aaaaaa;
                }
                h4 {
                    margin: 0;
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 24px;
                    text-transform: uppercase;
                }
            }

            .add-time {
                margin-top: 26px;
                font-weight: 500;
                font-size: 14px;
                line-height: 24px;
                text-decoration-line: underline;
                color: #6a9a5e;
                cursor: pointer;
            }
        }
    }

    &__label {
        .content {
            display: flex;
            gap: 10px;
        }
        .label {
            border: 1px solid #eeeeee;
            box-sizing: border-box;
            border-radius: 5px;
            width: 60px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            &--active {
                border-color: $primary;
            }

            img {
                width: 80%;
                height: 80%;
                object-fit: contain;
            }

            // &:not(:last-of-type) {
            //     margin-right: 10px;
            // }
        }
    }

    &__product {
        .selected-products {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            .product {
                background: #262626;
                border-radius: 4px;
                padding: 2px 8px;
                font-weight: 600;
                font-size: 12px;
                line-height: 24px;
                color: #ffffff;
                .icon {
                    margin-left: 4px;
                    cursor: pointer;
                }
            }
        }
        .clear-all {
            font-weight: 600;
            font-size: 15px;
            line-height: 24px;
            color: #222222;
            display: flex;
            align-items: center;
            cursor: pointer;

            .icon {
                font-size: 16px;
                margin-right: 14px;
            }
        }
    }

    &__footer {
        padding: 20px 55px;
        background-color: $gray-10;
        display: flex;

        /deep/ {
            .el-button {
                width: 100%;
                padding: 10px 40px;
            }
        }
    }

    .form-field {
        position: relative;

        &:not(:last-of-type) {
            margin-bottom: 14px;
        }

        label {
            font-weight: 500;
            font-size: 13px;
            line-height: 20px;
            color: rgba($gray-12, 0.5);
            position: absolute;
            left: 15px;
            top: 6px;
            z-index: 1;
        }

        .select-remove {
            background: transparent;
            border: none;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(-12px, -50%);
            padding: 0;
            font-size: 0;
            cursor: pointer;
            .icon {
                font-size: 24px;
                color: rgba($color: #111111, $alpha: 0.48);
            }
        }

        /deep/ {
            .el-input__inner,
            .el-textarea__inner,
            .el-date-editor .el-input__inner {
                height: 60px;
                padding: 13px 15px 0;
                line-height: 24px;
                font-weight: 500;
                font-size: 16px;
                border: 1px solid #aaaaaa;
                color: #111111;
                border-radius: 4px;

                &::placeholder {
                    color: #aaaaaa;
                }
            }
            .el-date-editor.el-input,
            .el-date-editor.el-input__inner {
                width: auto !important;
            }
            .el-textarea__inner {
                padding-top: 26px;
                height: 120px;
            }
            .el-select {
                width: 100%;
            }
            .el-input__icon {
                display: none;
            }
        }
    }
}
</style>
