<template>
	<div class="post shadow">                                                            
      <div class="header_post flex items-center justify-between">
            <div class="flex items-center">
                <div class="avatar m-2">     
                    <img 
                        :src="post.user.avatar_path"
                        class="rounded-full" 
                    />                                                
                </div>                        
                <div class="username">
                    {{ post.user.name }}
                </div>
            </div>                                                    
            <button type="button" class="more_options mr-2" @click.prevent="modalOpen = true">...</button>
            <teleport to="body">                                
                <MoreOptionsModal v-if="modalOpen" @close="modalOpen = false" :post="post" />
            </teleport>
        </div>
        <div class="image" :class="post.filter">
            <div class="h-64 md:h-80 bg-cover bg-center" :style="{backgroundImage: `url('${post.image_path}')`}">
            </div>                        
        </div>
        <div class="details px-3 pt-3">
            <div class="info">                    
                <div class="social"> 
                    <a 
                        href="#" 
                        class="heart cursor-pointer mr-1" 
                        :class="{liked : post.liked}"  
                        @click.prevent="toggle">                        
                            <Fa icon="heart" size="lg" />
                    </a>
                    <a 
                        class="comment cursor-pointer" 
                        @click.prevent="showAllcomments">
                            <Fa :icon="['far', 'comment']" size="lg" />
                    </a>                    
                </div>
                <div class="likes">
                    <span v-text="post.likesCount"></span> likes
                </div>                                                
                <div class="description">
                    <p class="text-sm">
                        <span class="username pr-1">{{ post.user.name }}</span>
                        <span class="summary" v-if="readMoreButton">
                            {{ descriptionSummary }}...
                            <a class="more" href="#" @click.prevent="readMore">more</a>
                        </span>
                        <span class="summary" v-else>
                            {{ post.description }}
                        </span>                                
                    </p>
                </div>                            
            </div>
            <div>
                <a class="all_comments_link text-sm" 
                    v-if="post.commentsCount" 
                    @click.prevent="showAllcomments" 
                    href="#"
                >
                    See {{ post.commentsCount }} comments
                </a>
            </div>                    
            <div class="time_ago mb-2 text-sm">
                {{ ago }}
            </div>
        </div>
    </div>	
</template>

<script>
import moment from 'moment'
import { LIKE_ADD, LIKE_REMOVE } from "@/store/actions.type"
import MoreOptionsModal from '@/components/MoreOptionsModal'
import { mapActions } from 'vuex';
export default{
    name: 'Post',    
    components:{
        MoreOptionsModal
    }, 
	props: {
        post: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            readMoreButton : false,
            descriptionSummary: '',
            modalOpen: false
        };
    },
    computed: {
        ago(){
            return moment(this.post.created_at).fromNow();
        }            
    },     
    created(){  

        if(this.post.description === null) {                           
            return false;
        }

        if (this.post.description.length > 120){
            this.descriptionSummary = this.post.description.substring(0,120);
            this.readMoreButton = true;
        }

    },                                 
    methods:{
        ...mapActions('post',[LIKE_ADD,LIKE_REMOVE]),
        toggle(){
            this.post.liked ? this.dislike() : this.like();                
        },
        like(){
            this[LIKE_ADD](this.post.path);                
        },
        dislike(){
            this[LIKE_REMOVE](this.post.path);                                
        },        
        readMore(){
            this.readMoreButton = false;                
        },
        showAllcomments(){
            this.$router.push({
                name:'comments.index', 
                params: { id: this.post.id }
            });
        }
    }
};
</script>
<style scoped>

.post{
    background-color: #fff;
    margin-bottom:2rem;          
}

.username, .likes{
    font-weight: bold;
}

.social a{
    display: inline;                       
    
}

.liked{
    color: red;
}

.more_options{
    background: transparent;
    font-size: 1.5rem;
    border: none;    
}

.time_ago{
    color: #8e8e8e;
    font-size: 0.8rem;
} 

.all_comments_link{
    color: #8e8e8e;
}

    
</style>