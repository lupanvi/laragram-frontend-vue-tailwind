import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from "flush-promises";
import {actions, mutations} from './'

import {SET_AUTH, PURGE_AUTH} from '@/store/mutations.type'
import {LOGIN, CHECK_AUTH, LOGOUT, REGISTER} from '@/store/actions.type'

const mockData = {
    data: {
        user:{
            id:1,
            name:'test'
        }
    }
}

jest.mock("@/plugins/axios", () => ({
  post: () => {
    return new Promise((resolve) => {         
      resolve(mockData)
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

    it('logs in a user', async ()=>{                
         
        const commit = jest.fn()         

        await actions[LOGIN]({commit})

        await flushPromises()

        expect(commit).toHaveBeenCalledWith(SET_AUTH, mockData.data)          

    })

    it('checks if a user is authenticated', async ()=>{                
         
        const commit = jest.fn()         

        await actions[CHECK_AUTH]({commit})

        await flushPromises()

        expect(commit).toHaveBeenCalledWith(SET_AUTH, mockData.data)          

    })

    it('logs out a user', async ()=>{                
         
        const commit = jest.fn()         

        await actions[LOGOUT]({commit})

        await flushPromises()

        expect(commit).toHaveBeenCalledWith(PURGE_AUTH)          

    })     
    
})

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