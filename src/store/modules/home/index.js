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

const getters = {
  postsList(state){
    return state.posts
  }
}

export const actions = {
	
	async [FETCH_POSTS]({commit}){   
    try{
      const {data} = await $http.get('/api/posts')
      commit(SET_POSTS, data)                
    }catch(e){
      throw Error('API Error occurred.')
    }		    
	},
	
	async [POST_DELETE]({commit}, postId){
    try{		    
      await $http.delete('/api/posts/'+ postId)
      commit(REMOVE_POST_IN_LIST, postId )       
    }catch(e){
      throw Error('API Error occurred.')
    }    
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

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
};