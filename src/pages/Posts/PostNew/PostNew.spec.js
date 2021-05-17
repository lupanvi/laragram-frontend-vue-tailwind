import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import merge from 'merge-deep'

import PostNew from './'

const localVue = createLocalVue()
localVue.use(Vuex)

const defaultProps = {
    image:'image_path',
    imageFile: {}
}

const setup = (initialProps= {}, initialStore={})=>{        
    const store = new Vuex.Store(initialStore) 
    const propsData = merge(defaultProps, initialProps)

    return shallowMount(PostNew, { 
        propsData,       
        store, 
        localVue        
    })        
}

describe('render', () => {

    it('renders PostNew component without errors', () => {

    	const wrapper = setup()         
    	expect(wrapper.find('.new-post').exists()).toBe(true)

    })
    
    it('renders main image', async () => { 

    	const props = {
            image:'image_path'            
        }

    	const wrapper = setup(props)                 

        expect(wrapper.find('.main-image').html()).toContain(props.image)        
    
    });

    it('renders image with filters to select', async () => { 

        const props = {
            image:'image_path/image.jpg'            
        }

        const filters = [
            {name:'normal'},
            {name: "clarendon"},
            {name: "gingham"}
        ]

        const wrapper = setup(props) 

        filters.map(filter=>{
            expect(wrapper.find('.filters').html()).toContain(filter.name)        
            expect(wrapper.find('.filters').html()).toContain(props.image)        
        })                       
    
    });

    it('renders next button', async () => {               

        const wrapper = setup()        
        expect(wrapper.find('a.next').exists()).toBe(true)        
    
    })
    
})

describe('PostNew actions', ()=>{

    let wrapper

    beforeEach(()=>{

        wrapper = setup() 
    })

	it("displays textarea to write a description when click `next` button", async () => {     	    	

    	await wrapper.find('a.next').trigger('click')

    	expect(wrapper.find('textarea').exists()).toBe(true)    	    	
    	
    })

    it("hides textarea to write a description in the first load", async () => {              

        expect(wrapper.find('textarea').exists()).toBe(false)                
        
    })
   

    it("displays `share` button when click `next` button", async ()=>{        

        await wrapper.find('a.next').trigger('click')         

        expect(wrapper.find('a.share').exists()).toBe(true)                

    })

    it("calls `publishPost` action when click `share` button", async ()=>{

        const actions = {
            publishPost : jest.fn()
        }

        const wrapper = setup({}, {actions} )

        await wrapper.find('a.next').trigger('click')         

        await wrapper.find('a.share').trigger('click')         

        expect(actions.publishPost).toHaveBeenCalled()                

    })    
  
})