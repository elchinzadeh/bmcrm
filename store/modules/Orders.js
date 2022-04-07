import ApiOrder from '@/api/order';
import _ from "lodash"

let filterOrdersTimeout = null;

export default {
    namespaced: true,

    state: {
        dataLoading: false,
        allOrders: [],
        dashboardOrders: [],
        order: null,
        searchResult: [],
        filterData: {
            query: {
                page: 1,
                size: 10,
                // sort: 'order.date,DESC'
            },
            body: {
                incoming: false,
                upcoming: false,
                keyWord: "",
                orderStatuses: [],
                // labels: [],
                period: {
                    max: 0,
                    min: 0
                },
            },
            headers: {
                label: [],
            }
        },
        paginationData: {
            totalPages: 0,
            totalElements: 0,
        },
        activeOrderHistoryId: null,
        activeOrderDeliveryId: null,

    },

    getters: {
        dataLoading: state => state.dataLoading,
        allOrders: state => state.allOrders,
        dashboardOrders: state => state.dashboardOrders,
        order: state => state.order,
        searchResult: state => state.searchResult,
        filterData: state => state.filterData,
        paginationData: state => state.paginationData,
        activeOrderHistoryId: state => state.activeOrderHistoryId,
        activeOrderDeliveryId: state => state.activeOrderDeliveryId,
    },

    // DISCUSS Setter mutation names should not start with 'GET'
    mutations: {
        GET_DASHBOARD_ORDERS(state, dashboardOrders) {
            state.dashboardOrders = dashboardOrders
        },
        GET_SEARCH_RESULT(state, searchResult) {
            state.searchResult = searchResult
        },
        SET_ALL_ORDERS(state, payload) {
            state.allOrders = payload
        },
        SET_ORDER_INFO(state, payload) {
            state.order = payload
        },
        RESET_ORDER(state) {
            state.order = null
        },
        SET_FILTER_DATA(state, payload) {
            state.filterData.body = {
                ...state.filterData.body,
                ...payload.body
            }
            state.filterData.query = _.merge(state.filterData.query, payload.query)
            state.filterData.headers = {
                ...state.filterData.headers,
                ...payload.headers
            }
        },
        SET_PAGINATION_DATA(state, payload) {
            state.paginationData = _.merge(state.paginationData, payload)
        },
        SET_ACTIVE_ORDER_HISTORY_ID(state, payload) {
            state.activeOrderHistoryId = payload
        },
        SET_ACTIVE_ORDER_DELIVERY_ID(state, payload) {
            state.activeOrderDeliveryId = payload
        },
        SET_DATA_LOADING(state, payload) {
            state.dataLoading = payload
        },
    },

    actions: {
        getAllOrders({ state, commit, dispatch }) {
            dispatch('setDataLoading', true)

            return ApiOrder.getAllOrders({}, {
                headers: {
                    tenantId: state.filterData.headers.label[0],
                    'Page-Size': 10
                }
            }).then(response => {
                commit('SET_ALL_ORDERS', response.data)
            }).catch(() => {
                commit('SET_ALL_ORDERS', [])
            }).finally(() => {
                dispatch('setDataLoading', false)
            })
        },
        filterOrders({ state, commit, dispatch }) {
            clearTimeout(filterOrdersTimeout)

            filterOrdersTimeout = setTimeout(() => {
                dispatch('setDataLoading', true)

                const body = _.cloneDeep(state.filterData.body);
                if (body.period.min === 0 && body.period.max === 0) {
                    delete body.period
                }
                const query = _.cloneDeep(state.filterData.query);

                return ApiOrder.filterOrders(body, {
                    params: query,
                    headers: {
                        tenantId: state.filterData.headers.label[0],
                    }
                }).then(response => {
                    commit('SET_ALL_ORDERS', response.data)
                    commit('SET_PAGINATION_DATA', {
                        totalElements: Number(response.headers['total-elements']),
                        totalPages: Number(response.headers['total-pages']) - 1,
                    })
                }).catch(() => {
                    commit('SET_ALL_ORDERS', [])
                }).finally(() => {
                    dispatch('setDataLoading', false)
                })
            }, 1000)
        },
        getDashboardOrders({ commit }, params = {}) {
            return ApiOrder.getDashboardOrders(params).then(response => {
                commit('GET_DASHBOARD_ORDERS', response.data)
            })
        },
        getOrder({ commit }, id) {
            commit('RESET_ORDER')
            id = Number(id)
            return Promise.all([
                ApiOrder.getOrderDetails(id).then(response => {
                    return response.data
                }),
                ApiOrder.getOrderPayment(id).then(response => {
                    return { payment: response.data }
                }),
                ApiOrder.getOrderNotes(id).then(response => {
                    return { notes: response.data }
                })
            ]).then(res => {
                commit('SET_ORDER_INFO', _.assign.apply(_, [{}].concat(res)))
            })
        },
        searchById({ commit }, params = {}) {
            return ApiOrder.searchById(params).then(response => {
                commit('GET_SEARCH_RESULT', response.data)
                return response.data
            })
        },
        setFilterData({ commit }, data = {}) {
            commit('SET_FILTER_DATA', data)
        },
        setActiveOrderHistoryId({ commit }, id) {
            commit('SET_ACTIVE_ORDER_HISTORY_ID', id)
            commit('SET_ACTIVE_ORDER_DELIVERY_ID', null)
        },
        setActiveOrderDeliveryId({ commit }, id) {
            commit('SET_ACTIVE_ORDER_HISTORY_ID', null)
            commit('SET_ACTIVE_ORDER_DELIVERY_ID', id)
        },
        setDataLoading({ commit }, payload) {
            commit('SET_DATA_LOADING', payload)
        }
    }
}