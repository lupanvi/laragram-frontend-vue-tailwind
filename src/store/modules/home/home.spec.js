import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'

import {actions, mutations} from './'

import {
    SET_POSTS,
    REMOVE_POST_IN_LIST, 
    UPDATE_POST_IN_LIST
} from '@/store/mutations.type'
import {
    FETCH_POSTS    
} from '@/store/actions.type'

describe('Actions',()=>{

    it('fetch posts', ()=>{

        jest.mock("axios", () => ({
          get: () => { 
            return new Promise((resolve) => {         
              resolve(true)
            })
          }
        }))
         
        const commit = jest.fn()     
        
        actions[FETCH_POSTS]({commit}).then(()=>{
            expect(commit).toHaveBeenCalledWith(SET_POSTS, true)    
        })

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