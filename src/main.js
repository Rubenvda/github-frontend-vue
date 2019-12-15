import Vue from 'vue'
import App from './App.vue'

import 'materialize-css'                            // imports materialize javascript
import 'materialize-css/dist/css/materialize.css'   // imports materialize css

import '@mdi/font/css/materialdesignicons.min.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
