import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import {actions, mutations} from './'

import {
    SET_POST,
    RESET_STATE, 
    SET_COMMENTS,
    ADD_COMMENT_TO_LIST
} from '@/store/mutations.type'

describe('Mutations',()=>{   

    it('sets post', () => {

        const initialState = {
            post: {
                id:'',
                description: '',
                filter: '',
                image_path: '',
                created_at:'',
                path:'',        
                user:{}
            }
        }                
        
        const newState = {
            post: {
                id:'1',
                description: 'test',
                filter: 'normal',
                image_path: 'image.jpg',
                created_at:'2020-12-14',
                path:'post/1',        
                user:{}
            }           
        }        
        
        mutations[SET_POST](initialState, newState.post)        
        
        expect(initialState.post).toEqual(newState.post)        
    })

    it('resets post state', () => {         

        const initialState = {
            post: {
                id:'1',
                description: 'test',
                filter: 'normal',
                image_path: 'image.jpg',
                created_at:'2020-12-14',
                path:'post/1',        
                user:{}
            }             
        }                
        
        const newState = {
            post: {
                id:'',
                description: '',
                filter: '',
                image_path: '',
                created_at:'',
                path:'',        
                user:{}
            }       
        }          
        
        mutations[RESET_STATE](initialState)
        
        expect(initialState.post).toEqual(newState.post)

    })

    it('sets comments', () => {

        const initialState = {
            comments: []
        }                
        
        const newState = {
            comments: [{id:1,body:'test'}]
        }        
        
        mutations[SET_COMMENTS](initialState, newState.comments)        
        
        expect(initialState.comments).toEqual(newState.comments)        
    })   

})