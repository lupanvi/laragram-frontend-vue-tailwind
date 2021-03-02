<template>     
    <div class="login">       
        <div class="bg-white w-full border-2 px-10 py-14 sm:mx-auto sm:w-8/12 md:w-6/12 lg:w-4/12">        
            <h1 class="text-center text-4xl">Laragram</h1>
            <form @submit.prevent="onSubmit">               
                <div class="mt-4 form-group" :class="{ 'form-group--error': $v.form.email.$error }">
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
                    <div 
                        class="error text-xs text-red-400" 
                        v-if="!$v.form.email.required">Email is required
                    </div>                     
                </div>                                               
                <div class="form-group mt-4" :class="{ 'form-group--error': $v.form.email.$error }">
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
                    <div 
                      class="error text-xs text-red-400" 
                      v-if="!$v.form.password.required">Password is required
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
                    <div class="text-red" v-text="feedback"></div>
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
import { LOGIN } from '@/store/actions.type.js'
import { required } from 'vuelidate/lib/validators'

export default {
    name: 'Login',    
    data() {
        return {
            form: { email: "", password: "", remember: false },
            loading: false,
            feedback: ""
        };
    },
    validations: {
        form:{
            email: {
                required                         
            },
            password: {
                required
            }
        }
    },    
    methods: {
        async onSubmit() {                        

            this.$v.$touch()

            if (this.$v.$invalid) {
                return false
            }

            this.loading = true           
            
            try{                
                await this.$store.dispatch(LOGIN, this.form)
                this.$router.push({name:'home'})                
            }catch(error){
                this.loading = false
                this.feedback = error.response.data.message
            }                                
        }
    }
};
</script>
