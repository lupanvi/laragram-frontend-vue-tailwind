<template>
    <div class="home w-full px-6 sm:px-0 sm:w-8/12 md:w-6/12 mx-auto">    
        <div class="posts">        
            <post v-for="post in postsList" :post="post" :key="post.id"></post>
            <div v-if="postsList.length == 0">There are no images</div> 
        </div>           
    </div>
</template>
<script>

import Post from './Components/Post';
import {mapGetters} from 'vuex';
import { FETCH_POSTS } from "@/store/actions.type";

export default {
    name: 'Home',
    components:{ Post },   
    async created(){
        await this.$store.dispatch(FETCH_POSTS);
    },    
    computed:{
        ...mapGetters(['postsList'])                
    }
}
</script>