import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import CommentNew from './'

const localVue = createLocalVue()
localVue.use(Vuex)

const defaultProps = {
    id : 0,
    path: ''
}

const setup = (initialProps={}, initialStore={})=>{     
    const store = new Vuex.Store(initialStore);
    const propsData = {...defaultProps, ...initialProps}

    return shallowMount(CommentNew, {
        store, 
        localVue,
        propsData        
    })        
}

describe('render', () => {

    it('renders CommentNew component without errors', () => {

    	const wrapper = setup()         
    	expect(wrapper.find('.new-comment').exists()).toBe(true)

    })      
    
})

describe('CommentNew actions', ()=>{

     it('´publish´ button is disabled if there is no content in textarea', async() => {
       
        const wrapper = setup()

        await wrapper.find('textarea').setValue('')

        expect(wrapper.find('button').attributes('disabled')).toBe('disabled')        

    })

    it('´publish´ button is enabled if there is content in textarea', async() => {
       
        const wrapper = setup()

        await wrapper.find('textarea').setValue('comment test')

        expect(wrapper.find('button').attributes('disabled')).toBe(undefined)         

    })
    
    it('calls ´createComment´ action when click ´publish´ button', async () => { 

        const props = {
            id : 1,
            path: 'image_path'
        }

        const actions = {
            createComment : jest.fn()
        }

        const wrapper = setup(props, {actions} )                 

        await wrapper.find('textarea').setValue('comment test')

        await wrapper.find('button').trigger('click')

        expect(actions.createComment).toHaveBeenCalled()        
    
    })

    it("doesn't call ´createComment´ action when textarea is empty", async () => { 

        const props = {
            id : 1,
            path: 'image_path'
        }

        const actions = {
            createComment : jest.fn()
        }

        const wrapper = setup(props, {actions} )                 

        await wrapper.find('textarea').setValue('')
        
        await wrapper.find('button').trigger('click')

        expect(actions.createComment).not.toHaveBeenCalled()        
    
    })

})