<template>
	<div class="new-comment border-t border-b p-3">
		<div class="bg-white flex justify-between items-center p-2 rounded-l rounded-r border">
			<textarea autocomplete="off" class="pl-2 body text-sm flex-grow rounded-left rounded-right" type="text" v-model="body" placeholder="Add a comment..." />
			<button class="pr-2 publish font-bold text-sm" :disabled="disabled" type="button" @click="addComment">Publish</button>
		</div>
	</div>
</template>
<script>

	import {COMMENT_CREATE} from '@/store/actions.type';
	import { mapActions } from 'vuex';

	export default{
		name: 'CommentsAddNew',
		props: {
			path:{
				type: String,
				required: true
			},
			id:{
				type: Number,
				required: true
			}
		},
		
		data(){
			return {				
				body:''
			}
		},
		computed: {
			disabled(){
				return this.body !=='' ? false: true;
			}

		},
		methods:{
			...mapActions('post',[COMMENT_CREATE]),
			addComment(){
				this[COMMENT_CREATE]({
					path: this.path,
					postId: this.id, 
					body: this.body 
				})
				.then(()=>{
					this.body = '';
				});					
			}
		}
	}
</script>
<style scoped>
.new-comment{	
	background-color: #efefef !important;
}
.new-comment div{	
	border-radius: 1rem;
}
.body{
	height: 18px;	
	border: none;
	outline: 0;
	padding: 0;
	resize: none;
	line-height: 18px;
	overflow: hidden;
}
.publish{
	border: none;
    color: #0095f6;	            
    background-color: transparent;
    outline:none;    
}
.publish[disabled]{
	opacity:.3;
	pointer-events: none;
}
</style>