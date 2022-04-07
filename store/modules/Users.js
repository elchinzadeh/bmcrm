import API from '@/api/user';

export default {
    namespaced: true,

    state: {
        loading: false,
        users: [],
        user: {},
        userOrders: [],
        filters: {
            query: {
                page: 1,
                size: 10,
            },
            body: {
                platform: [],
                type: [],
                keyWord: '',
                employeePositions: []
            }
        },
        paginationData: {
            totalElements: 0,
            totalPages: 0,
        },

        userOrdersFilters: {
            query: {
                page: 1,
                size: 10,
            },
            body: {
                platform: []
            }
        },
        userOrdersPaginationData: {
            totalElements: 0,
            totalPages: 0,
        },
        favorites: []
    },

    getters: {
        loading: state => state.loading,
        users: state => state.users,
        user: state => state.user,
        userOrders: state => state.userOrders,
        filters: state => state.filters,
        paginationData: state => state.paginationData,
        userOrdersFilters: state => state.userOrdersFilters,
        userOrdersPaginationData: state => state.userOrdersPaginationData,
        favorites: state => state.favorites,
    },

    mutations: {
        SET_LOADING(state, payload) {
            state.loading = payload
        },
        SET_USERS(state, payload) {
            state.users = payload
        },
        SET_USER(state, payload) {
            state.user = payload
        },
        SET_FILTER(state, payload) {
            payload = {
                query: {},
                body: {},
                ...payload,
            }

            if (payload.body.platform !== state.filters.body.platform) {
                payload.query.page = 1
            }

            state.filters.query = {
                ...state.filters.query,
                ...payload.query
            }
            state.filters.body = {
                ...state.filters.body,
                ...payload.body
            }
        },
        SET_PAGINATION_DATA(state, payload) {
            state.paginationData = payload
        },

        
        SET_USER_ORDERS(state, payload) {
            state.userOrders = payload
        },
        SET_USER_ORDERS_FILTER(state, payload) {
            payload = {
                query: {},
                body: {},
                ...payload,
            }

            if (payload.body.platform !== state.filters.body.platform) {
                payload.query.page = 1
            }

            state.filters.query = {
                ...state.filters.query,
                ...payload.query
            }
            state.filters.body = {
                ...state.filters.body,
                ...payload.body
            }
        },
        SET_USER_ORDERS_PAGINATION_DATA(state, payload) {
            state.paginationData = payload
        },
        SET_FAVORITES(state, payload) {
            state.favorites = payload
        },
    },

    actions: {
        getAllUsers({ state, commit }) {
            commit('SET_LOADING', true)

            const body = {}
            Object.keys(state.filters.body).forEach(key => {
                const value = state.filters.body[key]
                
                if (value.length) {
                    body[key] = value
                }
            })

            API.getUsers({
                params: {
                    ...state.filters.query,
                    page: state.filters.query.page - 1,
                },
            }, body)
                .then(response => {
                    commit('SET_USERS', response.data)
                    commit('SET_PAGINATION_DATA', {
                        totalElements: Number(response.headers['total-elements']),
                        totalPages: Number(response.headers['total-pages']),
                    })
                    
                    if (Number(response.headers['total-pages']) && (Number(response.headers['total-pages']) < state.filters.page)) {
                        commit('SET_FILTER', {
                            query: {
                                page: Number(response.headers['total-pages']) || 1
                            }
                        })
                    }
                }).finally(() => {
                    commit('SET_LOADING', false)
                })
        },
        getUser({ commit }, id) {
            commit('SET_LOADING', true)

            API.getUser(id).then(response => {
                commit('SET_USER', response.data)
            }).finally(() => {
                commit('SET_LOADING', false)
            })
        },
        getUserOrders({ commit }, id) {
            commit('SET_LOADING', true)

            API.getUserOrders(id).then(response => {
                commit('SET_USER_ORDERS', response.data)
            }).finally(() => {
                commit('SET_LOADING', false)
            })
        },
        setFilter({ commit }, payload) {
            commit('SET_FILTER', payload)
        },
        getFavorites({ commit }, id) {
            API.getFavorites(id).then(response => {

                commit('SET_FAVORITES', response.data)
            })
        },
    }
}