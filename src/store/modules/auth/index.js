import Vue from 'vue'
import $http from '@/plugins/axios'

import {LOGIN, CHECK_AUTH, LOGOUT, REGISTER} from '@/store/actions.type'
import {SET_AUTH, PURGE_AUTH} from '@/store/mutations.type'

const state = {  
  user: null,  
  isAuthenticated: false  
}

const getters = {  
  isAuthenticated(state){
      return state.isAuthenticated
  },
  currentUser(state){
      return state.user
  }   
}

export const actions = {

  async [LOGIN]({commit}, credentials) {      
    await $http.get('/sanctum/csrf-cookie')            
    const {data} = await $http.post("/login", credentials)                  
    commit(SET_AUTH, data)        
  },

  async [CHECK_AUTH]({commit}) {                
    try{
      const {data} = await $http.get('/api/user')
      commit(SET_AUTH, data)            
    }catch(error){
      commit(SET_AUTH, null)
    }      
  },

  async [LOGOUT]({commit}) {    
    await $http.post('/logout')
    commit(PURGE_AUTH)                  
  },

  [REGISTER](context, credentials) {    
    return $http.post("/register", credentials)                        
  }

}

export const mutations = {    

  [SET_AUTH](state, payload) {    
    state.user = payload.user
    state.isAuthenticated = Boolean(payload.user)                
  },

  [PURGE_AUTH](state) {    
    state.isAuthenticated = false    
    state.user = null    
  }

}

export default {
  state,
  actions,
  mutations,
  getters
};