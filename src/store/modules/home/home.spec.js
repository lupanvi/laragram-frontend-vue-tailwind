import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from "flush-promises";
import {actions, mutations} from './'

import {
    SET_POSTS,
    REMOVE_POST_IN_LIST, 
    UPDATE_POST_IN_LIST
} from '@/store/mutations.type'
import {
    FETCH_POSTS, 
    POST_DELETE    
} from '@/store/actions.type'

const mockData = {
    data: [
        {id:1, description:'test'},
        {id:2, description:'test'}
    ]
}

jest.mock("@/plugins/axios", () => ({
  delete: () => {
    return new Promise((resolve) => {         
      resolve(true)
    })
  },
  get: () => {
    return new Promise((resolve) => {              
        resolve(mockData)
    })
  }
}))        

describe('Actions',()=>{
    
    beforeEach(() => {
      jest.clearAllMocks();
      jest.resetModules();
    })  

    it('fetches posts', async ()=>{                
         
        const commit = jest.fn()         

        await actions[FETCH_POSTS]({commit})

        await flushPromises()

        expect(commit).toHaveBeenCalledWith(SET_POSTS, mockData.data)          

    })

    it('deletes a post', async ()=>{       
         
        const commit = jest.fn()   

        const postId = 1       
        
        await actions[POST_DELETE]({commit}, postId);

        await flushPromises()

        expect(commit).toHaveBeenCalledWith(REMOVE_POST_IN_LIST, postId)   

    })
  
    
})

describe('Mutations',()=>{

    let posts = []

    posts = [
        {
            id:1,
            user:{
                avatar_path:'image_path.jpg',
                name:'test 1'
            },
            filter:'normal',
            image_path:'image_path.jpg',
            liked:false,
            likesCount:0,
            description:'',
            commentsCount:0,
            created_at:'2020-12-12'
        },
        {
            id:2,    
            user:{
                avatar_path:'image_path.jpg',
                name:'test 2'
            },
            filter:'normal',
            image_path:'image_path.jpg',
            liked:false,
            likesCount:0,
            description:'',
            commentsCount:0,
            created_at:'2020-12-12'
        }
    ]

    it('sets posts', () => {        
        
        const initialState = { 
            posts: []           
        }

        const newState = {
            posts           
        }        
        
        mutations[SET_POSTS](initialState, newState.posts)        
        
        expect(initialState.posts).toEqual(newState.posts)
        expect(initialState.posts).toHaveLength(2)
    })

    it('removes post in list', () => {         

        const initialState = {
            posts            
        } 

        //post id to remove
        const postId = 1

        //posts[1] is the post with id = 2
        const newState = { 
            posts: [
               posts[1]
            ]            
        }       
        
        mutations[REMOVE_POST_IN_LIST](initialState, postId)
        
        expect(initialState.posts).toHaveLength(1)
        expect(initialState.posts).toEqual(newState.posts)

    })


    it('updates a post in list to show that it was liked', () => { 

        const initialState = {
            posts    
        } 

        //post with id 2 is liked
        const postUpdated = {
            id: 2,    
            user: {
                avatar_path: 'image_path.jpg',
                name: 'test 2'
            },
            filter: 'normal',
            image_path: 'image_path.jpg',
            liked: true,
            likesCount: 1,
            description: '',
            commentsCount: 0,
            created_at: '2020-12-12'                           
        }       
        
        mutations[UPDATE_POST_IN_LIST](initialState, postUpdated)                

        expect(initialState.posts[1]).toEqual(postUpdated)

    })

})