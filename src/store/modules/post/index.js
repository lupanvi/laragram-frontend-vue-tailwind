//import Vue from "vue"
import $http from '@/plugins/axios'

import { 
	POST_EDIT, 
	POST_PUBLISH, 
	FETCH_POST,
	POST_RESET_STATE,
	FETCH_COMMENTS,
	COMMENT_CREATE,
	LIKE_ADD,
	LIKE_REMOVE

} from "@/store/actions.type";

import { 
  SET_POST, 
  RESET_STATE,
  SET_COMMENTS, 
  UPDATE_POST_IN_LIST,   
  ADD_COMMENT_TO_LIST
} from "@/store/mutations.type";

const initialState = {
	post: {},
	comments:[]
};

const state = { ...initialState };

export const actions = {
	
	[POST_EDIT]({state}){		
		return $http.patch('/api/posts/'+state.post.id, {'description': state.post.description})         
	},

	[POST_PUBLISH](context, post){
		return $http.post('/api/posts', post);
	},

	[FETCH_POST]({commit}, postId){		
		return $http.get('/api/posts/'+postId)
			 .then(({data})=>{
				commit(SET_POST, data);
			 });				
	},

	[POST_RESET_STATE]({commit}){
		commit(RESET_STATE);
	},

	[FETCH_COMMENTS]({commit}, postId){
		return $http.get('/api/posts/' + postId + '/comments/all')
					.then(({data}) => {					 
					 	commit(SET_COMMENTS, data);					 						 						 	
					});
	},

	[COMMENT_CREATE]({commit}, payload){
		return $http.post(`${payload.path}/comments`, {body: payload.body})				     
					 .then(({data})=>{					 	
					 	commit(ADD_COMMENT_TO_LIST, data);
					 });
	},

	[LIKE_ADD]({commit},postPath){
		return $http.post(`${postPath}/likes`)
					.then(({data})=>{
						commit('home/'+UPDATE_POST_IN_LIST, data, { root: true });
						commit(SET_POST, data);
					});            
	},

	[LIKE_REMOVE]({commit}, postPath){
		return $http.post(`${postPath}/dislike`)
					.then(({data})=>{
						commit('home/'+UPDATE_POST_IN_LIST, data, { root: true });
						commit(SET_POST, data);
					});
	}
	
};


export const mutations = {

	[SET_POST](state, post) {
    	state.post = post
  	},

  	[RESET_STATE](state){
  		for (let f in state) {
	      //Vue.set(state, f, initialState[f]);
	    }
  	},

  	[SET_COMMENTS](state, comments){
  		state.comments = comments;
  	},

  	[ADD_COMMENT_TO_LIST](state, comment){
  		state.comments.unshift(comment);
  	}


};

const getters = {
	post(state) {
    	return state.post;
  	},
  	comments(state){
  		return state.comments;
  	}
};

export default {	
	namespaced: true,
	state,	
	actions,
	mutations,
	getters
}