import Vue from 'vue'
import $http from '@/plugins/axios'
import { FETCH_POSTS, POST_DELETE } from "@/store/actions.type"
import {   
  SET_POSTS,
  UPDATE_POST_IN_LIST, 
  REMOVE_POST_IN_LIST 
} from "@/store/mutations.type"

const state = {
	posts: []  
}

export const actions = {
	
	[FETCH_POSTS]({commit}){
		return $http.get('/api/posts').then(({data})=>{
			commit(SET_POSTS, data)                
    }).catch(error => {
      throw Error('API Error occurred.')
    })    
	},
	
	[POST_DELETE]({commit}, postId){
		$http.delete('/api/posts/'+ postId).then(()=>{
			commit(REMOVE_POST_IN_LIST, postId )
    })
	}	

};


export const mutations = {  

  [SET_POSTS](state, posts) {
    state.posts = posts;    
  },
	[REMOVE_POST_IN_LIST](state, postId){
        state.posts = state.posts.filter((post)=>{
            return post.id !== postId
        });
  },
  [UPDATE_POST_IN_LIST](state, data){
    state.posts = state.posts.map(post => {
      if (post.id !== data.id) {
        return post;
      }
     
      post.liked = data.liked;
      post.likesCount = data.likesCount;
      return post;
    });
  }

};

const getters = {
  postsList(state){
    return state.posts
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};