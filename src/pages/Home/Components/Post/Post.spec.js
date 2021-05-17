import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import merge from 'merge-deep'

import routes from '@/router/routes'
import Post from './'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const defaultProps = {
	post: {
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
}

const setup = (initialProps= {}, initialStore={})=>{		
	const store = new Vuex.Store(initialStore)	
    const router = new VueRouter({routes});
	const propsData = merge(defaultProps, initialProps)    

	return shallowMount(Post, {
		propsData,
		store, 
		localVue,
		router,
        stubs: ['Fa']
	})	
		
}

describe('render', () => {

    it('renders Post Item component without errors', () => {

    	const wrapper = setup()
    	expect(wrapper.find('.post').exists()).toBe(true)

    })

    it('displays props data', () => { 

    	const post = {
	        	user:{
	        		avatar_path:'image_path',
	        		name:'Luis'
	        	},
	        	filter: 'shadow',
	        	image_path: 'image_path',
	        	liked: true,
	        	likesCount: 10,
	        	description: 'test',
	        	commentsCount: 10,
	        	created_at: '2019-12-12'
	     }

    	const wrapper = setup({post})          	

    	expect(wrapper.find('.avatar').html()).toContain(post.user.avatar_path)
    	expect(wrapper.find('.username').text()).toContain(post.user.name)
    	expect(wrapper.find('.image').html()).toContain(post.filter)
    	expect(wrapper.find('.image').html()).toContain(post.image_path)
    	expect(wrapper.find('.details .likes').html()).toContain(post.likesCount)
    	expect(wrapper.find('.details .username').html()).toContain(post.user.name) 
    	expect(wrapper.find('.all_comments_link').html()).toContain(post.commentsCount)     	
    	
    });

    it('displays heart icon with ´liked´ class if prop ´liked´ is set to true', () => { 

    	const post = {	        	
	        	liked: true	        	
	     }

    	const wrapper = setup({ post })          	

    	expect(wrapper.find('.details .heart').html()).toContain('liked')    	
    	
    });

    it("doesn't display heart icon with ´liked´ class if prop ´liked´ is set to false", () => { 

    	const post = {	        
	        	liked: false	        
	     }

    	const wrapper = setup({ post })          	

    	expect(wrapper.find('.details .heart').html()).not.toContain('liked')    	
    	
    })
    
})

describe('Post actions', ()=>{

	it("calls `addLike` action when heart icon is clicked and post is not liked", async () => { 

		const actions = {
			addLike: jest.fn()
		}

    	const post = {	        		        	
	        	liked: false	        	
	     }

    	const wrapper = setup({ post }, {actions} ) 

    	await wrapper.find('.details .heart').trigger('click')

    	expect(actions.addLike).toHaveBeenCalled()    	    	
    	
    })

    it("calls `removeLike` action when heart icon is clicked and Post is liked", async () => { 

		const actions = {
			removeLike: jest.fn()
		}

    	const post = {	        		        	
	        	liked: true	        	
	     }

    	const wrapper = setup({ post }, {actions} ) 

    	await wrapper.find('.details .heart').trigger('click')

    	expect(actions.removeLike).toHaveBeenCalled()    	    	
    	
    })
   
})