import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import {actions, mutations} from './'

import {SET_AUTH, PURGE_AUTH} from '@/store/mutations.type'

describe('Mutations',()=>{

    it('sets an authenticated user', () => {        
        
        const initialState = { 
            user: null, 
            isAuthenticated: false 
        }

        const newState = {
            user:{
                id:1,
                name:'Luis'
            }, 
            isAuthenticated: true
        }        

        
        mutations[SET_AUTH](initialState, newState)
        
        expect(initialState.user).toEqual(newState.user)
        expect(initialState.isAuthenticated).toBe(true)
    })

    it('logs out an user', () => { 

        const initialState = {
            user:{
                id:1,
                name:'Luis'
            }, 
            isAuthenticated: true
        }       
        
        const newState = {
            user: null, 
            isAuthenticated: false 
        }                
        
        mutations[PURGE_AUTH](initialState, newState)
        
        expect(initialState.user).toEqual(newState.user)
        expect(initialState.isAuthenticated).toBe(false)
    })

})