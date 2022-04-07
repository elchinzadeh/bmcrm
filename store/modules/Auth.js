import ApiAuth from '@/api/auth'
import i18n from '@/i18n'
import { Notification } from 'element-ui';
import Cookie from 'js-cookie';

export default {
    namespaced: true,

    state: {
        user: [],
    },

    getters: {
        user: state => state.user,
    },

    mutations: {
        GET_USER_INFO( state, user) {
            state.user = user
        },
    },

    actions: {
        // Request to check verify code
        resetPassword( store, params ) {
            return ApiAuth.resetPassword(params).then( (response) => {
                return response.data
            }).catch( (error) => {
                if (error.response) {
                    Notification.error({
                        title: i18n.t('notification.error_title'),
                        message: error.response.data.message
                    });
                }
            })
        },
        // Request to check verify code
        checkVerificationKey( store, params ) {
            return ApiAuth.checkVerificationKey(params).then( (response) => {
                return response.data
            }).catch( (error) => {
                if (error.response) {
                    Notification.error({
                        title: i18n.t('notification.error_title'),
                        message: error.response.data.message
                    });
                }
            })
        },
        // Request to check if user exist
        checkExistUserByEmail( store, params ) {
            return ApiAuth.checkExistUserByEmail(params).then( (response) => {
                return response.data
            }).catch( (error) => {
                if (error.response) {
                    Notification.error({
                        title: i18n.t('notification.error_title'),
                        message: error.response.data.message
                    });
                }
            })
        },
        getVerificationCode( store, params ) {
            return ApiAuth.getVerificationCode(params).then( (response) => {
                return response.data
            }).catch( (error) => {
                if (error.response) {
                    Notification.error({
                        title: i18n.t('notification.error_title'),
                        message: error.response.data.message
                    });
                }
            })
        },
        loginByEmail( store, params ) {
            return ApiAuth.loginByEmail({
                password: params.password,
                value: params.login
            }).then( (response) => {
                if ( response.status == 200 ) {
                    Cookie.set('token', response.data.data)
                }
                Notification.success({
                    title: i18n.t('notification.login.success.title'),
                    message: i18n.t('notification.login.success.message'),
                    type: 'success'
                });
                return response.data
            }).catch( (error) => {
                if (error.response) {
                    Notification.error({
                        title: i18n.t('notification.error_title'),
                        message: error.response.data.message
                    });
                    return error.response
                }
            })
        },
    }
}
