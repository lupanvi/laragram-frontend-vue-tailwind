<template>
	<div class="new-post bg-white z-50">	            	      
		<div class="w-full sm:w-8/12 md:w-6/12 mx-auto">
	        <div class="header flex justify-between items-center">
	            <div>
	                <a class="text-blue-500" href="#" @click.prevent="close">Cancel</a>
	            </div>
	            <div>
	                <h1 class="text-3xl">Laragram</h1>
	            </div>
	            <div>                            
	                <a class="next text-blue-500" href="#" v-if="step === 1" @click.prevent="step = 2 ">Next</a>
	                <a  
	                	href="#" 
	                	class="share" 
	                	:class="inProgress ? 'text-blue-200' : 'text-blue-500'"
	                	:disabled="inProgress" 
	                	v-if="step === 2" 
	                	@click.prevent="share" 
	                >
	                	Share
	                </a>
	            </div>
	        </div> 
	        <div class="main-image"
	             :class="selectedFilter"
	             :style="{ backgroundImage: 'url(' + imageSrc + ')' }"></div>   
	        <div class="filters flex" v-if="step === 1">
	            <div class="filter" v-for="filter in filters" :key="filter.name">
	                <h3>{{ filter.name }}</h3>                            
	                <div class="image" 
	                     :class="filter.name"                                
	                    @click="selectFilter(filter.name)"
	                    :style="{ backgroundImage: 'url(' + imageSrc + ')' }"
	                ></div>                            
	            </div>
	        </div>
	        <div class="description-container flex justify-center items-center" v-if="step === 2">
	            <textarea 
	            	v-model="description" 
	            	class="form-input p-2" 
	            	placeholder="Write a description">	
	            </textarea>	                        
	        </div>
	        <div class="mt-2" v-if="feedback">
	        	<div class="text-danger text-center" v-text="feedback"></div>
	    	</div>
		               
		</div>	
	</div>
</template>
<script>

import filters from "@/utils/filters";
import { 		
	POST_PUBLISH		
} from "@/store/actions.type";		

export default{	
	name: 'PostsAddNew',
	props:{
		image: {
			type: String,
			required: true
		},
		imageFile: {
			type: File,
			required: true
		}
	},
	data(){
		return {
			step: 1,			
			selectedFilter: 'normal',				
			description:'',
			imageSrc: this.image,
			imageData: this.imageFile,
			feedback:'',
			inProgress: false				
		}
	},	
	computed:{
		filters(){
			return filters
		}
	},
	created(){		
		this.reset();		
	},
	methods:{	
				
		selectFilter(filter_name){
			this.selectedFilter = filter_name;					
		},		
		reset(){
			this.step = 1;
			this.selectedFilter = 'normal';				
			this.description = '';
		},
		close(){
			this.imageSrc = '';
			this.imageData = '';				
			this.$router.push('/');
		},
		share(){
			
			this.inProgress = true;

			let data = new FormData();

            data.append('image_path', this.imageData);                
            data.append('filter', this.selectedFilter);                
            data.append('description', this.description);

            this.$store
            	.dispatch(POST_PUBLISH, data)
            	.then(()=>{
            		this.inProgress = false;
            		this.reset();
            		this.close();  
            	}).catch(error=>{
            		this.inProgress = false;
            		this.feedback = error.response.data.message;
            	});               			
		}
	}
}	
</script>