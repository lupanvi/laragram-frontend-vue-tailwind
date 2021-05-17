<template>	
    <div class="edit-post bg-white z-50">       
        <div class="w-full sm:w-8/12 md:w-6/12 mx-auto">
            <div class="header flex justify-between items-center">
                <div>
                    <a href="#" class="text-blue-500" @click.prevent="close">X</a>
                </div>
                <div>
                    <h1 class="text-3xl">Edit information</h1>
                </div>
                <div>                            
                    <a  
                        href="#"
                        class="save" 
                        :class="inProgress ? 'text-blue-200' : 'text-blue-500'"
                        :disabled="inProgress"
                        @click.prevent="edit">
                        Save
                    </a>                            
                </div>
            </div> 
            <div class="main-image"
                 :class="post.filter"
                 :style="{ backgroundImage: 'url(' + post.image_path + ')' }">
            </div>                                               
            <div class="description-container">
                <textarea 
                    v-model="post.description" 
                    class="form-input p-2" 
                    placeholder="Write a description">                    
                </textarea>                
            </div>
            <div 
                v-if="feedback" 
                class="text-red p-1 m-1" 
                v-text="feedback">                        
            </div>             
        </div>          
    </div>	
</template>
<script>	

import {mapActions, mapGetters} from 'vuex';
import store from "@/store";
import {         
    FETCH_POST,
    POST_RESET_STATE,
    POST_EDIT       
} from "@/store/actions.type";

export default{	

    name: 'PostsEdit',

    beforeRouteEnter(to, from, next) { 
        store.dispatch('post/'+FETCH_POST, to.params.id);                        
        return next();
    },
    beforeRouteLeave(to, from, next) {
        store.dispatch('post/'+POST_RESET_STATE);
        return next();
    },
    computed:{
        ...mapGetters('post',['post'])                
    },     
	data(){
		return {                
            feedback:'',
            inProgress: false
		}
	},
	methods:{   
        
        ...mapActions('post',[POST_EDIT]),

		 edit(){ 

            this.inProgress = true            
            
            this[POST_EDIT]().then(()=>{
                this.$router.push('/')                
            }).catch((error)=>{
                this.feedback = error.response.data.message
            })                
               
            this.inProgress = false			
		},
        close(){
            this.$router.push('/')
        }

	}


}
	
</script>