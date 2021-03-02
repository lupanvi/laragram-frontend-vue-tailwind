import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Navbar from './';

const localVue = createLocalVue()
localVue.use(Vuex)

const defaultStore = {	
	getters: {  
		isAuthenticated: () => false,
		currentUser:()=> { return {} } 
    }
}

const setup = (initialStore = {})=>{	
	
	const store = new Vuex.Store({...defaultStore,...initialStore})
	
	return shallowMount(Navbar, {store, localVue, stubs: ['router-view', 'Fa']} );
	
}

describe('App', () => {

    it('renders App component without error', () => { 
    	const wrapper = setup()       
    	expect(wrapper.find('nav').exists()).toBe(true)      	
    })
   
    it("displays user name", () => {
        const wrapper = setup({ 
        	getters:{		    
		      isAuthenticated: () => true,
		      currentUser:()=> { return {name:'Luis'} }	    
			}
		})   		

    	expect(wrapper.find(".user_name").html()).toContain("Luis")
    })

    it('dispatches logout action when click logout link', async ()=>{

    	const actions = {
			logout: jest.fn()
		}

    	const wrapper = setup({ 
    		getters:{		    
		      isAuthenticated: () => true,
		      currentUser:()=> { return {name:'Luis'} }	    
			},
			actions
		});

		await wrapper.find(".logout").trigger("click")
		  
		expect(actions.logout).toHaveBeenCalled()

    })
     
});