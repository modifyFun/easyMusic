import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import "@/assets/css/global.css"
import "normalize.css/normalize.css"

Vue.config.productionTip = false

// Vue.use(normalize);
// console.log(normalize)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
