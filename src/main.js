import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ru-RU'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-chalk/index.css'




Vue.use(ElementUI, { locale })
Vue.use(VueResource)


Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})