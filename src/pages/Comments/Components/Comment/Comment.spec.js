import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Comment from './'

const defaultProps = {
    comment : {
        owner: {
            name:'',
            avatar_path:''
        },
        body:''
    }
}

const setup = (initialProps={}, initialStore={})=>{         
    const propsData = {...defaultProps, ...initialProps}

    return shallowMount(Comment, {        
        propsData        
    })        
}

describe('render', () => {

    it('renders Comment component without errors', () => {

    	const wrapper = setup()         
    	expect(wrapper.find('.comment').exists()).toBe(true)

    })

    it('displays comment information properly', () => {

        const comment = {
            owner: {
                name:'test',
                avatar_path:'image_path'
            },
            body:'comment test'
        }

        const props = {
            comment 
        }
    
        const wrapper = setup(props)        
        expect(wrapper.find('.avatar').html()).toContain(comment.owner.avatar_path)
        expect(wrapper.find('.post_details').html()).toContain(comment.owner.name)
        expect(wrapper.find('.post_details').html()).toContain(comment.body)

    })
    
})
