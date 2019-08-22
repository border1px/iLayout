import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuedraggable from 'vuedraggable'
import Vuex from 'vuex'
import store from './store'
import './assets/style.css'
import './assets/compstyle.css'
import './assets/iconfont/iconfont.css'

// 引入弹框
import './assets/lib/x0popup/x0popup.min.css'
import x0popup from './assets/lib/x0popup/x0popup.min.js'

// 使用Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.use(Vuex)
Vue.prototype.$alert = x0popup
Vue.config.productionTip = false
Vue.component(vuedraggable.name, vuedraggable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
