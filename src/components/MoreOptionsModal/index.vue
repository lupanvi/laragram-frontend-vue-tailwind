<template>	
    <div class="modal z-50 h-screen w-full fixed left-0 top-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">    		
		<div class="bg-white rounded-lg w-10/12 md:w-1/3"> 		
			<div class="flex flex-col items-stretch text-sm text-gray-900">				
				<button v-if="post.can_update" class="edit text-center py-3 font-bold" @click.prevent="edit">Edit</button>                       
				<button v-if="post.can_update" class="delete text-center py-3 text-red-500 border-b border-t font-bold" @click.prevent="destroy">Delete</button>
				<button class="cancel text-center py-3 font-bold" @click="$emit('close')">Cancel</button>
			</div>        
		</div>		
	</div>
</template>

<script>		
import {mapActions} from 'vuex'
import {POST_DELETE} from '@/store/actions.type'
export default{  
	name:'MoreOptionsModal',
	emits: ["close"],		
	props: {
        post: {
            type: Object,
            required: true
        }
    },
	methods:{
		...mapActions('home', [POST_DELETE]),	
		edit(){	                          			 
			 this.$router.push({ name: 'posts.edit', params: {id: this.post.id}  })   	
		},
        async destroy(){                                           
			await this[POST_DELETE](this.post.id)			
        }
	}
}
</script>
<style scoped>
.more-options-modal{
	position: absolute;
  	top: 0; right: 0; bottom: 0; left: 0;
  	background-color: rgba(0,0,0,.5);
}
</style>