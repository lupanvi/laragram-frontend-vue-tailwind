import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Comments from './'
import CommentNew from './Components/CommentNew'
import Comment from './Components/Comment'
import { beforeEach } from "@/router"

const localVue = createLocalVue()
localVue.use(Vuex)

const defaultPost = {
    id:0,
    path:'',
    user: {
        name:'',
        avatar_path:''
    },    
    description:''
}

const defaultStore = {
    getters:{
        post: ()=> {return defaultPost },
        comments: ()=> [{id:'1'}]
    }
}

const setup = (initialStore={})=>{    
    const store = new Vuex.Store({...defaultStore, ...initialStore});
    return shallowMount(Comments, {
        store, 
        localVue,
        stubs:['Fa']        
    })        
}

describe('render', () => {

    it('renders Comments component without errors', () => {

    	const wrapper = setup()         
    	expect(wrapper.find('.comments').exists()).toBe(true)

    })

    it('initializes with correct information', () => {

        const post = {
            id:1,
            path:'image_path',
            user: {
                name:'luis',
                avatar_path:'image_path'
            },            
            description:'test'    
        }

        const store = {
            getters:{
                post: ()=> {return post },
                comments: ()=> []
            }
        }

        const wrapper = setup(store)

        expect(wrapper.find('.avatar').html()).toContain(post.user.avatar_path)
        expect(wrapper.find('.post_details').html()).toContain(post.user.name)
        expect(wrapper.find('.post_details').html()).toContain(post.description)

    })
    
    it('renders commentsNew component', async () => { 

    	const wrapper = setup()                 

        expect(wrapper.findComponent(CommentNew).exists()).toBe(true)        
    
    })

    it('renders Comment component', async () => { 

        const wrapper = setup()                 

        expect(wrapper.findAllComponents(Comment)).toHaveLength(1)        
    
    })  
    
})