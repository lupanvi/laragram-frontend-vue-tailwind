<template>
	<div class="comments bg-white z-50">
		<div class="w-full sm:w-8/12 md:w-6/12 mx-auto">		              
			<div class="header flex items-center">
				<a class="mr-4 return" href="#" @click.prevent="$router.push('/')">
					<Fa icon="arrow-left" size="lg" />
				</a>
				<h1 class="text-3xl">Comments</h1>						
			</div>
			<comment-new :path="post.path" :id="post.id"></comment-new>	
			<div class="flex flex-col overflow-auto h-screen w-full pt-2 mb-3 text-sm">
				<div class="post flex mb-2 p-2 border-b">
		            <div class="mb-2 ml-2 mr-3 mt-1 avatar">     
		                <img
		                	   :src="post.user.avatar_path"
		                	   class="rounded-full" 
		                    />
		            </div>            
		            <div class="post_details">
		            	<div>
		            		<a href="#" class="font-bold mr-1">
		                    {{ post.user.name }}
		                	</a>
		                	<span>
		                		{{ post.description }}
		                	</span>
		            	</div>
		            	<div>
		            		{{ ago }}
		            	</div>
		        	</div>
		        </div>
				<comment v-for="comment in comments" :comment ="comment" :key="comment.id">									
				</comment>															
	        </div>
        </div>											
	</div>
</template>

<script>

import { mapState, mapActions } from "vuex"
import store from "@/store"
import CommentNew from './Components/CommentNew'
import Comment from './Components/Comment'
import moment from 'moment'
import {FETCH_POST, FETCH_COMMENTS} from '@/store/actions.type'

const module = 'post'

export default {	
	name: 'CommentsList',
	components: { CommentNew, Comment },
	beforeRouteEnter(to, from, next) {
		Promise.all([
		      store.dispatch(`${module}/`+FETCH_POST, to.params.id),
		      store.dispatch(`${module}/`+FETCH_COMMENTS, to.params.id)
		    ]).then(() => {
		      next();			      
		    });
	},
	computed: {			
		ago(){
            return moment(this.post.created_at).fromNow();
    	},
    	...mapState(module, {
			post: state => state.post,
			comments: state => state.comments
		})
	}	
};
	
</script>
<style scoped>	
	.box {	   
	    min-height: min-content;	    
	}	
</style>