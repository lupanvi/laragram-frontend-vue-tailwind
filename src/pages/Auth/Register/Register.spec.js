import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import axios from 'axios'

import Register from './'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(Vuelidate)

const setup = (initialStore = {})=>{		
	const store = new Vuex.Store(initialStore)	
	return shallowMount(Register, {store, localVue, router} );	
}

describe('render', () => {

    it('renders Register component without errors', () => {

    	const wrapper = setup()       
    	expect(wrapper.find('.register').exists()).toBe(true)

    });

    it('initializes with correct elements', () => { 

    	const wrapper = setup()          	
    	expect(wrapper.find('.name').exists()).toBe(true)  
    	expect(wrapper.find('.email').exists()).toBe(true)  
    	expect(wrapper.find('.password').exists()).toBe(true)    	
    	expect(wrapper.find('.password_confirmation').exists()).toBe(true)    	
    	expect(wrapper.find('button[type="submit"]').exists()).toBe(true)    	
    	
    })

})

describe('Register actions', ()=>{

	let actions
	let wrapper

	beforeEach(()=>{

		actions = {
			register: jest.fn()
		}

    	wrapper = setup({
    		actions
    	})

	})	

	it('calls ´register´ action when form is complete and click register button', async () => { 		 

    	await wrapper.find('.name').setValue('Luis')
    	await wrapper.find('.email').setValue('test@gmail.com')
    	await wrapper.find('.password').setValue('password')
    	await wrapper.find('.password_confirmation').setValue('password')

    	await wrapper.find('form').trigger("submit.prevent")

    	expect(actions.register).toHaveBeenCalled()
    	
	})

	it("doesn't call ´register´ action when form is incomplete and click register button", async () => { 			  

	    await wrapper.find('.name').setValue('Luis')
    	await wrapper.find('.email').setValue('test@gmail.com')
    	await wrapper.find('.password').setValue('password')
    	await wrapper.find('.password_confirmation').setValue('')

	    await wrapper.find('form').trigger("submit.prevent")

	    expect(actions.register).not.toHaveBeenCalled()
	    	
	})	   

})  