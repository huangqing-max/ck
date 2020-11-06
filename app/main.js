import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import http from 'util/request'
Vue.use(uView)
Vue.prototype.$http = http
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
