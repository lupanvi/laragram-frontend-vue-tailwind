import Vue from 'vue'
import './assets/sass/app.scss'
import store from './store'
import router from './router'
import { CHECK_AUTH } from "./store/actions.type"
import App from './App'
import './plugins'

Vue.config.productionTip = false

const VueInstance = ()=>{
	new Vue({
		render: h => h(App),
		store,
		router
	}).$mount('#app')
}

store.dispatch(CHECK_AUTH).then(()=>{
    VueInstance()
}).catch(()=>{
    VueInstance()
});