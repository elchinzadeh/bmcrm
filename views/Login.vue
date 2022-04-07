<template>
    <div class="w-100">
        <p class="auth__title">{{ $t("auth.login.title") }}</p>
        <el-form :model="form" :rules="rules" ref="ruleForm" class="w-100">
            <el-form-item
                :label="$t('auth.login.form.login_field')"
                class="no-star material"
                prop="login"
            >
                <el-input v-model="form.login" required></el-input>
            </el-form-item>

            <el-form-item
                :label="$t('auth.login.form.password_field')"
                class="no-star material"
                prop="password"
            >
                <el-input
                    v-model="form.password"
                    show-password
                    required
                ></el-input>
            </el-form-item>

            <el-link
                :underline="true"
                @click.prevent="$router.push({ name: 'ForgotPassword' })"
                class="mb-20"
            >
                {{ $t("auth.login.forgot_link") }}
            </el-link>

            <el-button
                v-ripple
                type="success"
                class="block"
                :loading="isLoad"
                @click="submitForm('ruleForm')"
            >
                {{ $t("auth.login.btn") }}
            </el-button>
        </el-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Login",
    data() {
        let validateLogin = (rule, value, callback) => {
            if (value === "") {
                callback(new Error(this.$t("validation.required")));
            } else {
                if (!this.$gbUtilities.validateEmail(value)) {
                    callback(new Error(this.$t("validation.invalid_email")));
                }
                callback();
            }
        };
        return {
            form: {
                login: "",
                password: "",
            },
            isLoad: false,
            rules: {
                login: [{ validator: validateLogin, trigger: "blur" }],
                password: [{ required: true, trigger: "blur" }],
            },
        };
    },
    methods: {
        ...mapActions("Auth", ["loginByEmail"]),
        submitForm(formName) {
            this.isLoad = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loginByEmail(this.form).then((response) => {
                        this.isLoad = false;
                        if (!response.data.error) {
                            this.$router.push({ name: "Dashboard" });
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
            this.$gbUtilities.updateMaterialInputLabels();
        });
    },
};
</script>
