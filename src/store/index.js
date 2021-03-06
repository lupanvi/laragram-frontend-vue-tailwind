import Vue from "vue";
import Vuex from "vuex";
import home from "./modules/home";
import post from "./modules/post";
import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    home,
    post,
    auth    
  }
});

