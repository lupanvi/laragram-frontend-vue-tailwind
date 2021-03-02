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
    	<MoreOptionsModal />
	</div>
</div>

</template>
<script>
import {mapGetters} from 'vuex'
import MoreOptionsModal from './components/MoreOptionsModal'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default{
	name:"Dashboard",
	components:{
		MoreOptionsModal,		
		Navbar,
		Footer
	},
	computed: {
    	...mapGetters(["isAuthenticated"])    
  	},
  	

}
</script>