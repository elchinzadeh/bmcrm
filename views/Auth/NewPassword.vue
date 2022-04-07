<template>
    <div class="w-100">
        <p class="auth__title">{{ $t("auth.new_password.title") }}</p>
        <el-form :model="form" :rules="rules" ref="ruleForm" class="w-100">
            <el-form-item
                :label="$t('auth.new_password.password')"
                class="no-star material"
                prop="password"
            >
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>

            <el-form-item
                :label="$t('auth.new_password.password_confirm')"
                class="no-star material"
                prop="passwordConfirm"
            >
                <el-input
                    v-model="form.passwordConfirm"
                    show-password
                ></el-input>
            </el-form-item>

            <el-button
                v-ripple
                type="success"
                class="block"
                :loading="isLoad"
                @click="submitForm('ruleForm')"
                >{{ $t("auth.forgot_password.btn") }}
            </el-button>

            <el-button
                v-ripple
                class="block"
                :disabled="isLoad"
                @click.prevent="$router.push({ name: 'Login' })"
                >{{ $t("auth.common.backToLogin") }}
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import Cookie from "js-cookie";

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("validation.required")));
            } else {
                if (this.form.passwordConfirm !== "") {
                    this.$refs.ruleForm.validateField("passwordConfirm");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("validation.required")));
            } else if (value !== this.form.password) {
                callback(new Error(this.$t("validation.password_mistmach")));
            } else {
                callback();
            }
        };
        return {
            form: {
                password: "",
                passwordConfirm: "",
            },
            isLoad: false,
            rules: {
                password: [{ validator: validatePass, trigger: "blur" }],
                passwordConfirm: [
                    { validator: validatePass2, trigger: "blur" },
                ],
            },
        };
    },
    methods: {
        ...mapActions("Auth", ["getVerificationCode"]),
        submitForm(formName) {
            this.isLoad = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isLoad = false;
                    this.getVerificationCode(
                        Object.assign(this.form, {
                            email: Cookie.get("forgotenEmail"),
                        })
                    ).then((response) => {
                        this.isLoad = false;
                        if (response) {
                            Cookie.set("password", this.form.password);
                            this.$router.push({
                                name: "SecurityVerification",
                                query: { type: "password" },
                            });
                        }
                    });
                } else {
                    this.isLoad = false;
                    return false;
                }
            });
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.$gbUtilities.setMaterialInput();
        });
    },
};
</script>
