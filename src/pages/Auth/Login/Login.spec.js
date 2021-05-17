import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'
import axios from 'axios'

import Login from './'
import routes from '@/router/routes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(Vuelidate)

const setup = (initialStore = {})=>{		
	const store = new Vuex.Store(initialStore)	
    const router = new VueRouter({routes})
	return shallowMount(Login, {localVue, store, router})
}

describe('render', () => {

    it('renders Login component without errors', () => {

    	const wrapper = setup()       
    	expect(wrapper.find('.login').exists()).toBe(true)

    })

    it('initializes with correct elements', () => { 

    	const wrapper = setup()          	
    	expect(wrapper.find('input[type="email"]').exists()).toBe(true)  
    	expect(wrapper.find('input[type="password"]').exists()).toBe(true)  
    	expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)    	
    	
    })

}) 

describe('Login actions', ()=>{

	let actions
	let wrapper

	beforeEach(()=>{

		actions = {
			login: jest.fn()
		}

    	wrapper = setup({
    		actions
    	})

	})	

	it('calls ´login´ action when form is complete and click submit button', async () => { 		 

    	await wrapper.find('input[type="email"]').setValue('test@gmail.com')
    	await wrapper.find('input[type="password"]').setValue('password')

    	await wrapper.find('form').trigger("submit.prevent")

    	expect(actions.login).toHaveBeenCalled()
    	
	})


    it("doesn't call ´login´ action when form is incomplete and click submit button", async () => {               

            await wrapper.find('input[type="email"]').setValue('')
            await wrapper.find('input[type="password"]').setValue('')

            await wrapper.find('form').trigger("submit")

            expect(actions.login).not.toHaveBeenCalled()
            
    });

})   