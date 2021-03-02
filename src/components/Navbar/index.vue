<template>
	<nav class="w-full px-6 sm:px-0 sm:w-8/12 md:w-6/12 mx-auto py-4">	    
		<div class="flex justify-between">
	        <a class="navbar-brand" href="/">
	            Laragram
	        </a>
	        <button class="py-2 px-4 border rounded-md focus:outline-none" @click.prevent="menuToggle">	        	
	            <Fa size="lg" icon="bars" />
	        </button>
        </div>
        <div class="text-right" :class="{hidden: !menuVisible}">        	
            <ul class="flex flex-col">                
                <li class="">
                    <a class="user_name" href="#" v-text="currentUser.name">
                        <span class="caret"></span>
                    </a>	                                                              
                </li>	              
                <li class="">
                	<a class="logout text-blue-500" href="#"
                       @click.prevent="logout">
                        Logout
                    </a>
                </li>
            </ul>
        </div> 
	</nav>	
</template>
<script>
import {mapGetters} from 'vuex'
import { LOGOUT } from "@/store/actions.type"
export default {
	data(){
		return {
			menuVisible: false
		}
	},
	name:'Navbar',
	computed: {
    	...mapGetters(["currentUser"])    
  	},
	methods:{
		menuToggle(){
			this.menuVisible = !this.menuVisible
		},
  		logout(){
  			this.$store.dispatch(LOGOUT).then(()=>{
  				this.$router.push('/login'); 
  			});  			
  		}
	}
};
</script>