import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'

import routes from '@/router/routes'
import MoreOptionsModal from './'
import PostEdit from '@/pages/Posts/PostEdit'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(VModal)

const setup = (initialData={}, initialStore={})=>{		
	const store = new Vuex.Store(initialStore)	
    const router = new VueRouter({ routes })		
	return shallowMount(MoreOptionsModal, {       
		store, 
		localVue,
        router,               
        data() {
            return initialData
        }
	})		
}

describe('render', () => {

    it('renders MoreOptionsModal component without errors', () => {     

    	const wrapper = setup()

    	expect(wrapper.find('.more-options-modal').exists()).toBe(true)

    })

    it('renders cancel button', () => {     	

        const wrapper = setup()

        expect(wrapper.find('button.cancel').exists()).toBe(true)                          
    	
    });    
      
})

describe('MoreOptionsModal actions', ()=>{

    describe('buttons behaviour', ()=>{      

        it('displays edit button if user is allowed', ()=>{    

            const wrapper = setup({
              post: {
                can_update: true
              }
            })        

            expect(wrapper.find('button.edit').exists()).toBe(true)         

        })

        it('hiddes edit button if user is not allowed', async ()=>{    

            const wrapper = setup({
              post: {
                can_update: false
              }
            })        

            expect(wrapper.find('button.edit').exists()).toBe(false)          

        })

        it('displays delete button if user is allowed', ()=>{    

            const wrapper = setup({
              post: {
                can_update: true
              }
            })         

            expect(wrapper.find('button.delete').exists()).toBe(true)         

        })

        it('hiddes edit button if user is not allowed', ()=>{    

            const wrapper = setup({
              post: {
                can_update: false
              }
            })         

            expect(wrapper.find('button.delete').exists()).toBe(false)         

        })

    })


	it("calls ´removePost´ action when click on delete button", async () => { 

        const actions = {
            removePost: jest.fn()
        }

		const wrapper = setup({
            post: {
                can_update: true
            }
        },
            {actions}
        )        

        await wrapper.find('button.delete').trigger('click')

    	expect(actions.removePost).toHaveBeenCalled()    	    	
    	
    })


    it("Redirects to the edition page", async () => { 

        const post = {
            id:1,
            can_update: true 
        }                                                  

        const wrapper = setup({
            post                        
        })          

        await wrapper.find('button.edit').trigger('click')                
           
        expect(wrapper.vm.$route.path).toBe("/posts/edit/"+post.id)        
        
    })
   
})