import { createApp } from 'vue'
import './assets/app.scss'
import App from './components/App'
import router from './router'
import store from './store'
import { CHECK_AUTH } from "./store/actions.type"
import {FontAwesomeIcon} from './plugins/fontawesome'

const VueInstance = ()=>{
    createApp(App)
    .component("Fa", FontAwesomeIcon)
    .use(store)
    .use(router)
    .mount('#app')
}

store.dispatch('auth/'+CHECK_AUTH).then(()=>{
    VueInstance()
}).catch(()=>{
    VueInstance()
});

