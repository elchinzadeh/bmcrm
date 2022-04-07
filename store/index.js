import Vue from "vue";
import Vuex from "vuex";

import Account from "./modules/Account";
import Auth from "./modules/Auth";
import General from "./modules/General";
import Orders from "./modules/Orders";
import OrdersCalendar from "./modules/OrdersCalendar";
import Promocodes from "./modules/Promocodes";
import Users from "./modules/Users";
import Staff from "./modules/Staff";

Vue.use(Vuex);

const store = new Vuex.Store({
    namespaced: true,
    modules: {
        Account,
        Auth,
        General,
        Orders,
        OrdersCalendar,
        Promocodes,
        Users,
        Staff,
    },
});

export default store;
