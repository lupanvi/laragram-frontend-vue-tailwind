<template>    
    <div class="register">        
        <div class="bg-white w-full border-2 px-10 py-10 sm:mx-auto sm:w-8/12 md:w-6/12 lg:w-4/12">                                      
            <h1 class="text-center text-4xl">Laragram</h1>
            <h3 class="text-center text-2xl">Sign up to see photos and videos from your friends.
            </h3>                                      
            <form method="POST" @submit.prevent="onRegister">                
                <div class="mt-4 form-group" :class="{ 'form-group--error': errors.name }">                        
                    <div class="special-label-holder">     
                        <input  
                            placeholder=" "
                            autocomplete="name" 
                            id="name" 
                            type="text" 
                            class="name form-input"
                            name="name"
                            v-model="form.name"                             
                        />
                         <label for="name">Name</label>
                     </div>                                        
                    <div class="error text-xs text-red-400" v-if="errors.name">
                        {{ errors.name[0] }}
                    </div> 
                </div>                                    
                <div class="mt-4 form-group" :class="{ 'form-group--error': errors.email }">    
                    <div class="special-label-holder">
                        <input  
                            placeholder=" "
                            autocomplete="off"
                            id="email" 
                            type="email" 
                            class="email form-input" 
                            name="email"
                            v-model="form.email" 
                            @keydown="errors.email = false"
                        />
                        <label for="email" >Email</label>
                    </div> 
                    <div class="error text-xs text-red-400" v-if="errors.email">
                        {{ errors.email[0] }}
                    </div>

                </div>                               
                <div class="mt-4 form-group" :class="{ 'form-group--error': errors.password }">    
                    <div class="special-label-holder"> 
                        <input
                            placeholder=" "
                            id="password" 
                            type="password" 
                            class="password form-input" 
                            name="password" 
                            autocomplete="new-password" 
                            v-model="form.password"                             
                        />
                        <label for="password" >Password</label>
                    </div> 
                    <div class="error text-xs text-red-400" v-if="errors.password">
                        {{ errors.password[0] }}
                    </div>
                    
                </div>                
                <div class="mt-4 form-group" :class="{ 'form-group--error': errors.password_confirmation }">
                    <div class="special-label-holder">
                        <input                                     
                            placeholder=" "
                            id="password-confirm" 
                            type="password" 
                            class="password_confirmation w-full transition duration-300 ease-in-out h-9 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:border-blue-300 text-gray-600 text-sm" 
                            name="password_confirmation"
                            autocomplete="new-password"
                            v-model="form.password_confirmation"                             
                        />
                        <label for="password-confirm" >Confirm password</label>
                    </div>
                    <div class="error text-xs text-red-400" v-if="errors.password_confirmation">
                        {{ errors.password_confirmation[0] }}
                    </div>
                    
                </div>
                <div class="mt-4 text-center">
                        <button type="submit" class="bg-blue-500 text-white active:bg-blue-500 text-md px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none hover:bg-blue-600" :disabled="loading">
                            Register
                        </button>
                        <div class="mt-6 text-center" v-if="feedback">
                            <div class="text-red-400" v-text="feedback"></div>
                        </div> 
                        <div class="mt-5 text-center text-sm">
                            <p>
                                By signing up, you agree to our Terms , Data Policy and Cookies Policy.
                            </p>
                        </div>                   
                </div>                
            </form>
        </div>

        <div class="mt-5 bg-white w-full border-2 px-10 py-3 sm:mx-auto sm:w-8/12 md:w-6/12 lg:w-4/12">
                <p class="m-3 text-base text-gray-600 text-center">
                    Tienes una cuenta? <router-link class="text-blue-500" :to="{ name:'login' }">entrar</router-link>
                </p>
        </div>          
    </div>                         
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import {REGISTER} from '@/store/actions.type.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    name:'Register',
    setup(){
        const store = useStore()
        const router = useRouter()
        const loading = ref(false)
        const feedback = ref("")
        const form = reactive({            
            name: "", 
            email: "", 
            password: "", 
            password_confirmation: ""                                        
        })

        onMounted(()=>{
            store.commit('setErrors',[])
        })

        const errors = computed(() => store.state.errors)

        const onRegister = async () => {
            loading.value = true
            try{
                await store.dispatch('auth/' + REGISTER, form)
                router.push({name:'login'}) 
            }catch(error){
                loading.value = false
                feedback.value = 'There was an error'
            }            
        }

        return {form, loading, feedback, errors, onRegister} 
    }
};
</script>