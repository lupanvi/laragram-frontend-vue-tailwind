import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import merge from 'merge-deep'

import Home from './'
import Post from './Components/Post'

const localVue = createLocalVue()
localVue.use(Vuex)

const defaultStore = {
	getters: {
        postsList: ()=> []
	}
}

const setup = (initialStore={})=>{		
	const store = new Vuex.Store({...defaultStore,...initialStore})			
	return shallowMount(Home, {		
		store, 
		localVue,
        stubs:['Fa']		
	})		
}

describe('render', () => {

    it('renders Home component without errors', () => {     

    	const wrapper = setup()
    	expect(wrapper.find('.home').exists()).toBe(true)

    })

    it('displays Post Component', () => { 

    	const getters=  {
            postsList: ()=> [{id:1,description:'test'}]
        }
        const wrapper = setup({getters})        
        expect(wrapper.findAllComponents(Post)).toHaveLength(1)	
    	
    })

    it("doesn't display Post comments if there are no posts", () => { 

        const getters=  {
            postsList: ()=> []
        }
        const wrapper = setup({getters})        
        expect(wrapper.findAllComponents(Post)).toHaveLength(0)         
        
    })

      
})


describe('Home actions', ()=>{

	it("calls fetchPosts action when component is loaded", async () => { 

		const actions = {
			fetchPosts: jest.fn()
		}
    	
    	const wrapper = setup({ actions })    

    	expect(actions.fetchPosts).toHaveBeenCalled()    	    	
    	
    })

   
})