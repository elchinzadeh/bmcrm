import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import i18n from '@/i18n'
import OtpInput from "@bachdgvn/vue-otp-input";
Vue.component("v-otp-input", OtpInput);

// ElementUI
import ElementUI from 'element-ui';
import '@/assets/scss/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en'

// Styles
import '@/assets/scss/main.scss'
import '@/assets/icons/style.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSignOutAlt, faBell, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSignOutAlt);
library.add(faBell)
library.add(faCaretLeft)
library.add(faCaretRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)


// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { locale });

// VueMask
import VueMask from 'v-mask'
Vue.use(VueMask);

// VueApexCharts
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)


import VCalendar from 'v-calendar';
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc',
});

import Ripple from 'vue-ripple-directive'
Vue.directive('ripple', Ripple);

Vue.config.productionTip = false

import GF from "./globalFunction"
let globalFunction = GF
globalFunction.install = function () {
  Object.defineProperty(Vue.prototype, '$gbUtilities', {
    get() { return globalFunction }
  })
}
Vue.use(globalFunction)
// Dynamic loading of the 'common' components
const elements = require.context('./', true, /components\/common\/.*\.vue$/i);
elements.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], elements(key).default));

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
