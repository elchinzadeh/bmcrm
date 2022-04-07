<template>
    <div class="w-100">
        <p class="auth__title">{{ $t('auth.forgot_password.title') }}</p>
        <p class="auth__text">{{ $t('auth.forgot_password.text') }}</p>
        <el-form :model="form" :rules="rules" ref="ruleForm" class="w-100">

            <el-form-item :label="$t('auth.login.form.login_field')" class="no-star material" prop="email">
                <el-input v-model="form.email" ></el-input>
            </el-form-item>

            <el-button
                v-ripple
                type="success"
                class="block"
                :loading="isLoad"
                @click="submitForm('ruleForm')"
            >{{ $t('auth.forgot_password.btn') }}</el-button>

            <el-button
                v-ripple
                class="block"
                @click.prevent="$router.push({ name: 'Login' })"
            >{{ $t('auth.common.backToLogin') }}</el-button>
        </el-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Cookie from 'js-cookie';

export default {
    name: "ForgotPassword",
    data() {
        var validateLogin = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('validation.required')));
            } else {
                if (!this.$gbUtilities.validateEmail(value)) {
                    callback(new Error(this.$t('validation.invalid_email')));
                }
                callback();
            }
        };
        return {
            form: {
                email: ''
            },
            isLoad: false,
            rules: {
                email: [
                    { validator: validateLogin, trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        ...mapActions('Auth', [
			'checkExistUserByEmail'
		]),
        submitForm(formName) {
            this.isLoad = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.isLoad = false
                    // this.$router.push({ name: "NewPassword"})
                    this.checkExistUserByEmail({
                        value: this.form.email
                    }).then( (response) => {
                        this.isLoad = false
                        if ( response.data ) {
                            Cookie.set('forgotenEmail', this.form.email)
                            this.$router.push({ name: "NewPassword"})
                        } else {
                            this.$notify({
                                title: this.$t('notification.error_title'),
                                message: this.$t('notification.login.forgot.user_not_exitst'),
                                type: 'error'
                            });
                        }
                    })
                } else {
                    this.isLoad = false
                    return false;
                }
            });
        },
    },
    mounted() {
        this.$nextTick( () => {
            this.$gbUtilities.setMaterialInput()
        })
    }
}
</script>