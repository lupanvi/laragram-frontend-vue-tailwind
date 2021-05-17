import { createStore, createLogger } from 'vuex'
import home from "./modules/home"
import post from "./modules/post";
import auth from "./modules/auth"
import {SET_ERRORS} from '@/store/mutations.type'

export default createStore({
  state: {
    errors: []
  },
  getters: {
    errors: state => state.errors
  },
  mutations: {
    setErrors(state, errors) {
      state.errors = errors;
    }
  },
  modules: {
    home,
    post,
    auth    
  },
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
});

