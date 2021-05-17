<template>
<div class="app h-full">
	<div v-if="isAuthenticated">	
		<Navbar />
	</div>
	<main>        
        <router-view />                				    
	</main>	
	<div v-if="isAuthenticated">
		<Footer />		       	
	</div>
</div>

</template>
<script>
import {mapGetters} from 'vuex'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default{
	name:"Dashboard",	
	components:{		
		Navbar,
		Footer
	},
	computed: {
    	...mapGetters('auth',["isAuthenticated"])    
  	}  	
}
</script>