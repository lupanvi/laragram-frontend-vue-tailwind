import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

import PostEdit from './'

const localVue = createLocalVue()
localVue.use(Vuex)

const defaultPost = {
    user:{
        avatar_path:'',
        name:''
    },
    filter:'',
    image_path:'',
    liked:false,
    likesCount:0,
    description:'',
    commentsCount:0,
    created_at:'2019-12-12'
}

const defaultStore = {  
    getters: {  
        post: () => { return defaultPost  }        
    }
}

const setup = (initialStore={})=>{            
    const store = new Vuex.Store({...defaultStore,...initialStore}) 
    return shallowMount(PostEdit, {        
        store, 
        localVue        
    })  
        
}

describe('render', () => {

    it('renders PostEdit component without errors', () => {

    	const wrapper = setup()
    	expect(wrapper.find('.edit-post').exists()).toBe(true)

    })

    
    it('displays post information', async () => { 

    	const post = {	        	
	        	filter: 'shadow',
	        	image_path: 'image_path',	        	
	        	description: 'test'	        	
	     }

    	const wrapper = setup({
            getters: {
                post: ()=> {  return post }
            }
        })                 

        expect(wrapper.find('.main-image').classes()).toContain(post.filter)
        expect(wrapper.find('.main-image').html()).toContain(post.image_path)        
        expect(wrapper.find('.description-container textarea').element.value).toBe(post.description)
    	
    })
    
})

describe('PostEdit actions', ()=>{

	it("calls `editPost` action when click `save` button", async () => { 

		const actions = {
			editPost: jest.fn()
		}    	

    	const wrapper = setup({actions})            

    	await wrapper.find('a.save').trigger('click')

    	expect(actions.editPost).toHaveBeenCalled()    	    	        
    	
    })

   
   
})