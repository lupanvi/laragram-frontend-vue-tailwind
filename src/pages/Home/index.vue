<template>
    <div class="home w-full px-6 sm:px-0 sm:w-8/12 md:w-6/12 mx-auto">    
        <div class="posts">        
            <post v-for="post in posts" :post="post" :key="post.id"></post>
            <div v-if="posts.length == 0">There are no images</div>
        </div>           
    </div>
</template>
<script>

import Post from './Components/Post'
import { FETCH_POSTS } from "@/store/actions.type"
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'Home',
    components:{ Post },  
    setup(){
        const store = useStore()
        const posts = computed(() => store.state.home.posts)

        store.dispatch('home/'+FETCH_POSTS)

        return {posts}
    }   
}
</script>