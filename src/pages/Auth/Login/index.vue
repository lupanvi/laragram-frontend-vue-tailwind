<template>     
    <div class="login">       
        <div class="bg-white w-full border-2 px-10 py-14 sm:mx-auto sm:w-8/12 md:w-6/12 lg:w-4/12">        
            <h1 class="text-center text-4xl">Laragram</h1>
            <form @submit.prevent="onSubmit">               
                <div class="mt-4 form-group" :class="{ 'form-group--error': errors.email }">                
                    <div class="special-label-holder">
                        <input 
                            placeholder=" " 
                            id="email" 
                            type="email" 
                            class="email form-input" 
                            name="email" 
                            autocomplete="email"
                            v-model="form.email"
                        />
                        <label for="email">Email</label>
                    </div>                  
                    <div class="error text-xs text-red-400" v-if="errors.email">
                        {{ errors.email[0] }}
                    </div> 
                </div>                                               
                <div class="form-group mt-4" :class="{ 'form-group--error': errors.password }">                
                    <div class="special-label-holder">
                        <input 
                            placeholder=" " 
                            id="password" 
                            type="password" 
                            class="password form-input" 
                            name="password" 
                            autocomplete="current-password"
                            v-model="form.password"
                        />
                        <label for="email">Password</label>    
                    </div>                  
                     <div class="error text-xs text-red-400" v-if="errors.password">
                        {{ errors.password[0] }}
                    </div>                    
                </div>                                                             
                <div class="mt-4 text-center flex align-middle justify-center items-center">
                    <input class="remember h-3 mr-3 outline-none focus:outline-none" type="checkbox" name="remember" id="remember" v-model="form.remember">
                    <label class="font-medium" for="remember">
                        Remember me
                    </label>
                </div>            
                <div class="mt-4 text-center">
                    <button 
                        type="submit" 
                        class="bg-blue-500 text-white active:bg-blue-500 text-md px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none hover:bg-blue-600" 
                        :disabled="loading">
                        Log In
                    </button>                  
                </div>                                
                <div class="mt-6 text-center" v-if="feedback">
                    <div class="text-red-500" v-text="feedback"></div>
                </div>
            </form>        
        </div>         
        <div class="mt-5 bg-white w-full border-2 px-10 py-3 sm:mx-auto sm:w-8/12 md:w-6/12 lg:w-4/12">
            <p class="m-3 text-base text-gray-600 text-center">
                Don't have an account? <router-link class="text-blue-500" :to="{ name: 'register'}">Sign Up</router-link>
            </p>
        </div>
    </div> 
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
import { LOGIN } from '@/store/actions.type'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    name: 'Login',
    setup () {

        const store = useStore()
        const router = useRouter()
        const loading = ref(false)
        const feedback = ref("")
        const form = reactive({            
            email: "", 
            password: "", 
            remember: false                                        
        })

        onMounted(()=>{
            store.commit('setErrors',[])
        })
        
        const errors = computed(() => store.state.errors)

        const onSubmit = async () => {
            loading.value = true
            try{
                await store.dispatch('auth/' + LOGIN, form)
                router.push({name:'home'}) 
            }catch(error){
                loading.value = false
                feedback.value = 'There was an error'
            }            
        }

        return {form, loading, feedback, errors, onSubmit}
    }
};
</script>
