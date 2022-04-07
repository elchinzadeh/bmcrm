<template>
    <div class="w-100">
        <p class="auth__title">{{ page.title }}</p>
        <p class="auth__text">{{ page.text }}</p>
        <el-form class="w-100">
            <p class="auth__title sub">{{ page.title }}</p>
            <v-otp-input
                class="otp-input"
                :numInputs="6"
                separator=""
                :is-input-num="true"
                @on-complete="handleOnComplete"
                @on-change="handleOnChange"
            />
            <el-button
                v-ripple
                type="success"
                class="block"
                :loading="isLoad"
                @click="submitForm('ruleForm')"
                :disabled="isDisabled || isSendLoad"
            >{{ $t('auth.common.submit') }}</el-button>

            <el-divider></el-divider>

            <p class="auth-verification-text">{{ $t('auth.verification.text') }}</p>

            <el-button
                v-ripple
                class="block"
                :loading="isSendLoad"
                :disabled="isLoad || !isDisabled"
                @click.prevent="resendCode"
            >{{ $t('auth.verification.btn') }}</el-button>
        </el-form>

        <PasswordChanged :dialogVisible="showModal" />

    </div>
</template>

<script>
import Cookie from 'js-cookie';
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            page: {
                title: '',
                text: ''
            },
            code: '',
            isDisabled: true,
            isLoad: false,
            isSendLoad: false,
            showModal: false
        }
    },
    components: {
        PasswordChanged: () => import('@/views/Auth/Modal/PasswordChanged')
    },
    methods: {
        ...mapActions('Auth', [
			'checkVerificationKey',
            'resetPassword',
            'getVerificationCode'
		]),
        handleOnComplete(value) {
            this.isDisabled = false
            this.code = value
        },
        handleOnChange(value) {
            if (value.length != 6) {
                this.isDisabled = true
            }
        },
        resendCode() {
            this.isSendLoad = true
            this.getVerificationCode({
                email: Cookie.get('forgotenEmail'),
                password: Cookie.get('password')
            }).then( (response) => {
                this.isLoad = false
                if ( response ) {
                    this.isSendLoad = false

                    this.$notify.success({
                        title: this.$t('notification.login.success.title'),
                        message: this.$t('notification.login.resend_code.message'),
                    });
                }
            })
        },
        submitForm() {
            this.isLoad = true
            this.checkVerificationKey({
                email: Cookie.get('forgotenEmail'),
                key: this.code,
            }).then( (response) => {
                    this.isLoad = false
                    if ( response.data != "" ) {
                        this.resetPassword({
                            newPassword: Cookie.get('password'),
                            token: response.data
                        }).then( (answer) => {
                            if ( answer ) {
                                this.showModal = true
                            }
                        })
                    } else {
                        this.$notify.error({
                            title: this.$t('notification.error_title'),
                            message: this.$t('notification.login.forgot.wrong_code'),
                        });
                    }
                })
        },
    },
    mounted() {
        if ( this.$route.query.type == 'password' ) {
            // If we come from "Forgot password" page
            this.page.title = this.$t('auth.code_verification.title')
            this.page.text = this.$t('auth.code_verification.text', {
                'email': Cookie.get('forgotenEmail') ? Cookie.get('forgotenEmail') : 123
            })

        } else if (this.$route.query.type == 'security') {
            // If we come from "Login" page
            this.page.title = this.$t('auth.security_verification.title')
            this.page.text = this.$t('auth.security_verification.text')

        } else {
            this.$router.push({ name: "Login" })
        }
    }
}
</script>

<style lang="scss" >

.otp-input {
    justify-content: space-between;
    margin-bottom: 40px;
    div {
        width: 60px;
        height: 80px;
        border-radius: 5px;
        background: #F8F8F8;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
            width: 40px;
            height: 60px;
            background: transparent;
            font-size: 18px;
            color: #262626;
            border-radius: 0;
            border: none;
            border-bottom: 1px solid #262626;
            text-align: center;
            &:focus {
                outline: none;
            }
        }
    }
}
</style>
