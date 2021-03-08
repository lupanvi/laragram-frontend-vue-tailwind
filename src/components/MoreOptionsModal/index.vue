<template>	
    <modal class="more-options-modal" height="auto" name="more-options-modal" @before-open="beforeOpen">        
        <div class="flex flex-col items-stretch text-sm text-gray-900">
        	<button v-if="post.can_update" class="edit text-center py-3 font-bold" @click.prevent="edit">Edit</button>                       
            <button v-if="post.can_update" class="delete text-center py-3 text-red-500 border-b border-t font-bold" @click.prevent="destroy">Delete</button>
            <button class="cancel text-center py-3 font-bold" @click.prevent="$modal.hide('more-options-modal');">Cancel</button>
        </div>        
    </modal>	
</template>

<script>		
import {mapActions} from 'vuex';
export default{        
	data(){
		return {
			post: {}
		}
	},
	methods:{
		...mapActions(['removePost']),
		beforeOpen(event){					
			this.post = event.params.post				
		},           				
		edit(){	                          
			 this.$modal.hide('more-options-modal')
			 this.$router.push({ name: 'posts.edit', params: {id: this.post.id}  })   	
		},
        async destroy(){                                           
			await this.removePost(this.post.id)
			this.$modal.hide('more-options-modal')           
        }
	}
}
</script>