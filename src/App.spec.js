import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import App from './App';
const localVue = createLocalVue()
localVue.use(Vuex)

const defaultStore = {
    getters:{
        isAuthenticated: ()=> true        
    }
}

const setup = (initialStore={})=>{    
    const store = new Vuex.Store({...defaultStore, ...initialStore});
    return shallowMount(App, {
        store, 
        localVue,
        stubs: ['router-view']        
    })        
}

describe('App', () => {

    it('renders App component without error', () => { 
    	const wrapper = setup()       
    	expect(wrapper.find('.app').exists()).toBe(true)  
    }) 
     
})